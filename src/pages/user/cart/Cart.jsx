import React, { useContext, useEffect, useState } from 'react'
import Loading from '../../../components/loading/Loading';
import axios from 'axios';
import minus from '../../../assets/minus.svg'
import plus from '../../../assets/plus.svg'
import '../cart/cart.css'
import { Button } from 'react-bootstrap';
import { Flip, toast } from 'react-toastify';
import { CartContext } from '../../../components/user/context/CartContext';
import { Link } from 'react-router-dom';
export default function Cart() {
    const [loading , setLoading] = useState(true);
    const [dataProduct , setDataProduct] = useState([{}]);
    const {cartCount , setCartCount} = useContext(CartContext);
    
    const [total , setTotal] = useState(0);
    
    const token = localStorage.getItem("userToken");
    const getCart = async () => {
       
            try{
            const {data} = await axios.get(`https://ecommerce-node4.onrender.com/cart`,
                {
                    headers:{
                        Authorization:`Tariq__${token}`
                    }
                }
            )
            
            setDataProduct(data.products)
            const finalPrice = data.products.reduce((counter , product)=> counter + product.details.finalPrice * product.quantity,0);
            const tax = data.products.reduce((counter ,product)=> counter + 4 *product.quantity,0);
            const totalPrice = finalPrice + tax;
            setTotal(totalPrice);
        }
        catch(error){
            console.log(error);
        }
    finally{
        setLoading(false);
        }
    }
  
    useEffect(() =>{
        getCart();
    } , [dataProduct])
    const [countLoading , setCountLoading] = useState(false);
    const increase = async (id) => {
        try{
            setCountLoading(true);

            const response = await axios.patch(`https://ecommerce-node4.onrender.com/cart/incraseQuantity`,
                {
                    productId:id
                },
                {
                    headers:{
                        Authorization:`Tariq__${token}`
                    }
                }
            )
            setDataProduct(cartPrev=> {
                return cartPrev.map(item =>{
                    if(item.productId == id){
                        return {...item , quantity : item.quantity +1}
                    }
                    
                    return item;
                })
            })

            
        }catch(error){
            console.log(error);
        }finally{
            setCountLoading(false);
        }
    }
    const decrease = async (id) => {
        try{
            setCountLoading(true);
            const response = await axios.patch(`https://ecommerce-node4.onrender.com/cart/decraseQuantity`,
                {
                    productId:id
                },
                {
                    headers:{
                        Authorization:`Tariq__${token}`
                    }
                }
            )
            setDataProduct(cartPrev => {
                return cartPrev.map(item => {
                    if(item.productId == id){
                        return {...item , quantity : item.quantity -1}
                    }
                    
                    
                    return item;
                })
            })

           
        }catch(error){
            console.log(error);
        }finally{
            setCountLoading(false);
        }
    }
    const [isLoading , setIsLoading] = useState(false);
    const [clearLoading , setClearLoading] = useState(false);
    const clearCart = async () => {
        setClearLoading(true);
        try{

            const response =await axios.patch(`https://ecommerce-node4.onrender.com/cart/clear`,
                null,
                {
                    headers:{
                        Authorization:`Tariq__${token}`
                    },
                }
            )
            if(response.status == 200){
                toast.success('Clear Cart Successfully', {
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
                    setDataProduct(cartPrev => {
                        return cartPrev.filter(item => item.productId == 0 );
                    })
                   
                  setCartCount(0);
                  
            }
            
        }catch(error){
            console.log(error);
        }finally{
            setClearLoading(false);
        }
    }
    const removeItem = async (id) => {
        setIsLoading(true);
       try{

      
        const response = await axios.patch(`https://ecommerce-node4.onrender.com/cart/removeItem`,
            {
                productId:id
            },
            {
                headers:{
                    Authorization:`Tariq__${token}`
                }
            }
        )
        if(response.status == 200){
            toast.success('Remove Product Successfully', {
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
                setCartCount(cartCount - 1);
        }
        setDataProduct(prevCart => {
            return prevCart.filter(item => item.productId!== id);
        })
    }catch(error){
        console.log(error);
    }finally{
        setIsLoading(false);
    
    }
    }
   

    if(loading){
        return <Loading/>
    }
    if(dataProduct.length == 0){
        return <>
        <div className='empty-cart d-flex flex-column gap-3'>
            <h2 className='fw-bold bg-primary w-25 text-center text-light py-2 rounded d-flex justify-content-center m-auto'>Your Cart is Empty</h2>
            <Link to={'/products'} className='bg-primary text-light py-2 px-4 rounded m-auto'>Shopping</Link>
            
        </div>
        </>
    }
  return (
    <>
    <section className='product-cart container py-5'>
        <div className='prod-check d-flex justify-content-between align-items-end'>

        
        <div className='product-in-cart d-flex flex-column'>
            {dataProduct.map(product =>
            <div className="d-flex  details-product px-2 py-3 rounded mt-2 gap-3 position-relative ">
                <button className='remove-item' onClick={()=>(removeItem(product.productId))} disabled={isLoading}>
                   <img src={minus} alt="" />
                </button>
                <div className="image-cart  rounded p-3">
                <img src={product.details.mainImage.secure_url} width="150px"/>
                </div>
                <div className="details-product-cart d-flex flex-column justify-content-evenly">
                    <span className='fw-bold mt-3'>{product.details.name}</span>
                    {product.details.discount != 0 ? 
          <>
          <div className="d-flex align-items-center gap-2">
          <span className="fw-bold fs-3 text-danger ">{product.details.finalPrice}$</span>
          <span className=" text-decoration-line-through">{product.details.price}$</span>
          </div>
          </> :
          <>
          <span className="fw-bold fs-3">{product.details.finalPrice}$</span>
          </>
          }                    <div className="count-product d-flex gap-4 rounded py-2 px-4 align-items-center border">
                        <Button className='counted dis' onClick={()=>decrease(product.productId)} disabled={(countLoading || product.quantity == 1)} ><img src={minus} alt="" /></Button>
                        <span>{product.quantity}</span>
                        <Button className='counted' onClick={()=>increase(product.productId)} disabled={countLoading} ><img src={plus} alt="" /></Button>
                    </div>
                </div>
            </div>
            )}
           
        </div>
        <div className="total-price d-flex flex-column py-5 px-3 gap-4">
            <span className='fw-bold'>Order Summary</span>
            <div className="sub d-flex justify-content-between pb-3 border-bottom">
                <span className='text-secondary'>Sub Total :</span>
                <span className='fw-bold'>
                    {dataProduct.reduce((counter , product)=> counter + product.details.price * product.quantity , 0)}$
                </span>
            </div>
           
            <div className="sub d-flex justify-content-between pb-3 border-bottom">
                <span className='text-secondary'>After Discount :</span>
                <span className='fw-bold'>{dataProduct.reduce((counter , product)=> counter + product.details.finalPrice * product.quantity , 0)}$</span>
            </div>
            <div className="sub d-flex justify-content-between pb-3 border-bottom">
                <span className='text-secondary'>Tax estimate :</span>
                <span className='fw-bold'> {dataProduct.reduce((counter , product)=> counter + 4 * product.quantity , 0)}$</span>
            </div>
            <div className="sub d-flex justify-content-between">
                <span className=' fw-bold'>Order Total :</span>
                <span className='fw-bold'>
                {total}$
                </span>
            </div>
            <Button className='clearBtn text-light m-auto py-3 px-4' as={Link} to={'/checkOut'} >Check Out</Button>
            
        </div>
        </div>
        <button className='clearBtn mt-4' onClick={clearCart} disabled={clearLoading}>
            {clearLoading ? "Clear Cart ...": "Clear Cart"}
        </button>
       
    </section>
    </>
  )
}
