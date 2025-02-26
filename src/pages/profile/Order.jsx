import React, {useEffect, useState } from 'react';
import Loading from '../../components/loading/Loading';
import './profile.css';
import axios from 'axios';
import { Flip, toast } from 'react-toastify';





export default function Order() {
  const token = localStorage.getItem('userToken');
  const [order , setOrder] = useState(null);
  const [orderLoading , setOrderLoading] = useState(true);
  const [loadingCancel , setLoadingCancel] = useState(false)
  

  const getOrders = async () => {
    try{
      const response = await axios.get(`https://ecommerce-node4.onrender.com/order`,
        {
          headers:{
            Authorization:`Tariq__${token}`
          }
        }
      )
      setOrder(response.data.orders);

    }catch(error){
      console.log( error);
    }finally{
      setOrderLoading(false);
    }
    
  }
  const cancleOrder = async (orderId) => {
    setLoadingCancel(true);
    try{
        const response = await axios.patch(`https://ecommerce-node4.onrender.com/order/cancel/${orderId}`,null,{
          headers:{
            Authorization:`Tariq__${token}`
          }
        })
        if(response.status === 200){
          toast.success('Remove Order Successfully', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Flip,
          });
          setOrder(
            order.filter(orders => orders._id !== orderId)
        )
        
      }
    }catch(error){
      console.log(error);
    }finally{
      setLoadingCancel(false);
    }
  }
  useEffect(() => {
    getOrders();
  } ,[])
  if(orderLoading){
    return <Loading/>
  }
  return (
      <>
        <div className='order-section'>
          <div className='item-order'>
                  {order.map(item  =>
                  item.status !== 'cancelled' &&
              <div className='order-det py-3 px-3 rounded mb-2 d-flex flex-column gap-4' key={item._id}>
                <div className='product-det'>
                  {item.products.map(product=>
                    <div className="det-prod border-bottom pb-2 d-flex align-items-center justify-content-between" key={product._id}>
                  <div className='image-order d-flex gap-2 align-items-center '>

                   <img src={product.productId.mainImage.secure_url} width={"60px"}/>
                   <div className="name-q d-flex flex-column gap-2">
                    <span className='fw-bold'>{product.productId.name}</span>
                    <span>{product.quantity}x</span>
                   </div>
                    </div>
                    <div className="total-price2">
                      <span className='fw-bold'>Total : {product.productId.finalPrice * product.quantity}$</span>
                    </div>
                   
                  </div>
                  )}
                  </div>
                  <div className="order-information d-flex justify-content-between">
                    <div className='address d-flex flex-column gap-2'>
                      <span className='fw-bold'>City : {item.address}</span>
                      <span className='fw-bold'>Phone Number : {item.phoneNumber}</span>
                    </div>
                      <div className="tax d-flex flex-column gap-2">
                        <span className='fw-bold d-flex justify-content-end'>Tax : {item.products.reduce((sum, product) => sum + product.quantity * 4, 0).toFixed(2)}$</span>
                        {item.couponName === 'Gaza25'?<span className='fw-bold'>Total Order : {item.finalPrice}$</span> :<span className='fw-bold'>Total Order : {(
                  item.products.reduce((sum, product) => sum + product.productId.finalPrice *product.quantity, 0) +
                  item.products.reduce((sum, product) => sum + product.quantity * 4, 0)
                ).toFixed(2)}$</span>}
                      </div>
                  
                    
                  </div>
                  <div className="status-of-order">
                    {item.status === 'deliverd' ? <span className='fw-bold'>Status Order : <span className='text-success'>Delivered</span></span> : <span className='fw-bold'>Status Order : <span className='text-warning'>Pending</span></span>}
                  </div>
                  {item.status === 'deliverd'? <div className='text-success fw-bold'>Order delivered</div> :<button className='btn btn-danger cancle' onClick={()=>cancleOrder(item._id)} disabled={loadingCancel}>{loadingCancel ? "Cancel Order...":"Cancel Order"}</button>}
              </div>
                  )}
          </div>
        </div>
         
     </>
  )
}
