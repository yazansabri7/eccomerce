import React, { useContext, useState } from 'react'
import USeFetch from '../../Hooks/USeFetch'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loading from '../../components/loading/Loading';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './productdetails.css';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import { CartContext } from '../../components/user/context/CartContext';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export default function ProductDetails() {
  const {cartCount , setCartCount} = useContext(CartContext);
  const navigate = useNavigate();
  const {productId} = useParams();
  const [show, setShow] = useState(false);
  const [addReviewLoading , setAddReviewLoading] = useState(false);
  const token = localStorage.getItem("userToken");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {register , handleSubmit , formState:{errors}} = useForm()
  const {data , isLoading} = USeFetch(`https://ecommerce-node4.onrender.com/products/${productId}`);
  const[loading,setLoading]= useState(false);
  if(isLoading){
    return <Loading/>
  }
  const addReview = async(value) => {
    try{
      setAddReviewLoading(true);
      const response = await axios.post(`https://ecommerce-node4.onrender.com/products/${productId}/review`,value,{
        headers:{
          Authorization:`Tariq__${token}`
        }
      })
      console.log(response);
      if(response.status == 201){
        toast.success('Review Added Succseesfully ', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
      }
      
    }catch(error){
      toast.error('You Must Buy Product To Add Review ', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }finally{
      setAddReviewLoading(false);
      window.scroll(0,0)
    }
  }
  const addToCart = async () => {
    setLoading(true);
    try{

      const response = await axios.post(`https://ecommerce-node4.onrender.com/cart`,
        {
          productId:productId
        },
        {
          
          headers:{
            Authorization:`Tariq__${token}`
          }
        }
      )
      if(response.status == 201){
        toast.success('The operation was completed successfully', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
          window.scroll(0,0);
          setCartCount(cartCount + 1)
          navigate('/cart');
        }
        
    }catch(error){
      toast.error('The Product Has Already Exists', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }
    finally{
      setLoading(false);
    }
  }
  return (
    <>
    <section className='product-info container d-flex align-items-strech px-2 py-3 border rounded gap-5 justify-content-evenly'>
      <div className="image  d-flex flex-column jsutify-content-between">
        <img src={data.product.mainImage.secure_url} alt=""/>
       

      </div>
      <div className="detail d-flex flex-column justify-content-between">
        <div className="det d-flex flex-column gap-3">
        <span className='name fw-bold'>{data.product.name}</span>
        <span className='fw-bold'>Sold : {data.product.number_sellers}/{data.product.stock}</span>
        <span className='fw-bold'>Price : {data.product.price}$</span>
        <span className='fw-bold'>Discount : {data.product.discount} %</span>
        <span className='fw-bold'>Final Price : {data.product.finalPrice}$</span>
        <span className='badge text-bg-success fit'>{data.product.status}</span>
        </div>
        <div className="cart2">
          <button className='cartBtn' onClick={()=>addToCart()}  disabled={loading}>
          {loading ? 'Loading ...':'Add To Cart'}
          </button>
        </div>
      </div>
    
    </section>


    <section className='tabs container mt-5'>
    <Tabs
      defaultActiveKey="Descreption"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="Descreption" title="Descreption">
      <div className="desc">
        <p>{data.product.description}</p>
        <h3 className='fw-bold'>Product Images :</h3>
        <div className="subimages d-flex gap-3 w-75">

        {data.product.subImages.map(subimage =>
      

              <img src={subimage.secure_url} className='w-25'key={subimage.public_id}/>
       
            )}
        </div>
    </div>
      </Tab >
      <Tab eventKey="Review" title="Review">
      <section className='reviews  d-flex flex-column gap-4  '>
          {data.product.reviews.map(review =>
        <div className="review-item w-100 px-3 py-4 border rounded d-flex flex-column gap-4" key={review.createdBy._id}>
          <span className='fw-bold'>Review Date : <span className='fw-normal'>{new Date(review.createdAt).toLocaleString()}</span></span>
          <span className='fw-bold'>Review Name : <span className='fw-normal'>{review.createdBy.userName}</span></span>
          <span className='fw-bold'>Review Comment : <span className='fw-normal'>{review.comment}</span></span>

        </div>
          )}
          <button className='reviewBtn' onClick={handleShow}>
        Add Review
      </button>

      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
        </Modal.Header>
        <Form className='p-3' onSubmit={handleSubmit(addReview)}>
        <Form.Floating className="mb-3">
        <Form.Control
          id="floatingInputCustom"
          type="text"
          placeholder=""
          {...register("comment",{required:"Comment Is Required"})}
          />
        <label htmlFor="floatingInputCustom">Comment</label>
          {errors.comment ? <div className='text-danger'>{errors.comment.message}</div> :null }
      </Form.Floating>
      <Form.Floating>
        <Form.Control
          id="floatingPasswordCustom"
          type="Number"
          placeholder=""
          {...register("rating" , {required:"Rating Is Required"})}
        />
        {errors.rating ? <div className='text-danger'>{errors.rating.message}</div>:null}
        <label htmlFor="floatingPasswordCustom">Rating 1-5</label>
      </Form.Floating>
      <Button className='reviewBtn mt-3' type='submit' disabled={addReviewLoading} >
        {addReviewLoading ? "Add Review ...": "Add Review"}
      </Button>
        </Form>
        
        
      </Modal>
      </section>
      </Tab>
     
    </Tabs>
    </section>
    </>
  )
}
