import React, { useState } from 'react'
import key from '../../../assets/key.svg'
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import './sendcode.css'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import arrow from '../../../assets/arrow.svg';
export default function SendCode() {
   const {register , handleSubmit ,formState:{errors}}  = useForm();
   const navigate = useNavigate();
     const [loading, setLoading] = useState(false);
   

   const sendCode = async (data) => {
    try{
        setLoading(true);
        const response = await axios.patch(`https://ecommerce-node4.onrender.com/auth/sendcode`,data);
        if(response.status == 200){
            toast.info('Please check Your Email To Get Code', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
                localStorage.setItem('email',data.email);
                navigate('/auth/resetPassword');
                
        }
    }catch(error){
        console.log(error);
        alert("Failed to send code");
    }finally{
       setLoading(false);
    }
   }
  return (
    <>
    <div className="forget d-flex w-100 justify-content-center py-5 flex-column gap-4">
        <div className="img-for text-center d-flex gap-1 flex-column ">
        <img src={key} alt="" className='m-auto' />
        <h2>Forget Password ?</h2>
        <span className='text-secondary'>No worries , well send you reset instructions.</span>
        </div>

        <div className="form d-flex flex-column  m-auto">
        <Form onSubmit={handleSubmit(sendCode)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"  {...register("email", {required:"Email Is requird"})}/>
        {errors.email ? <div className="text-danger">{errors.email.message}</div>:null}
       
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading} className='w-100'>
        {loading ? "Loading ...":"Send Code"}
      </Button>
    </Form>
    <div className="back mt-3">
      <Link to={'/auth/login'} className='d-flex text-black'><img src={arrow} className='img-back'/> back to login </Link>
    </div>
    
        </div>
    </div>
    
    </>
  )
}
