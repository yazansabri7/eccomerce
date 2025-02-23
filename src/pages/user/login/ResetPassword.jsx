import React, { useState } from 'react'
import loginImage from "../../../assets/login.png";
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';


export default function ResetPassword() {
  const { register, handleSubmit, formState:{errors} } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const getCodeToReset = async (data) => {
    try{
      setLoading(true);
      const response = await axios.patch(`https://ecommerce-node4.onrender.com/auth/forgotPassword`,data);
      if(response.status == 200){
        localStorage.removeItem("email");
        toast.success('The Password Changed Succssefly', {
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
          navigate('/auth/login');
          
      }
      

    }catch{
      toast.error('Server Error ', {
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

    }finally{
      setLoading(false);
    }
  }
  return (
 <div className="login container d-flex align-items-center gap-1 flex-wrap w-100 py-5 rounded shadow-sm">
        <div className="login-left">
          <img src={loginImage} alt="" />
        </div>
        <div className="login-right d-flex flex-column gap-4">
          <div className="welcome d-flex flex-column gap-2">
            <span className="fs-2 fw-bold">Reset Password</span>
            <span>Put The Code to CONTINUE</span>
          </div>
          <div className="form">
            <Form onSubmit={handleSubmit(getCodeToReset)}>
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control type="email" placeholder="name@example.com" value={localStorage.getItem("email")} {...register("email" , {required:"Email Is Required"})} />
              {errors.email?<div className="text-danger">{errors.email.message}</div>:null}
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholder="Password" {...register("password" , {required:"Password Is Required"})} />
                
              </FloatingLabel>
              {errors.password?<div className="text-danger">{errors.password.message}</div> : null}
              <FloatingLabel controlId="floatingPassword" label="Code">
                <Form.Control type="text" placeholder="Password" className='mt-3'  {...register("code" , {required:"Code Is Required"})} />
              {errors.code?<div className="text-danger">{errors.code.message}</div> : null}
                
              </FloatingLabel>
              <div className="already d-flex flex-column gap-3">
               

              <Button className="mt-3 btn2" type="submit" disabled={loading} >
               {loading ? "Loading ...":"Reset Password"}
              </Button>
              
              </div>
             
            </Form>
          </div>
        </div>
      </div>  
      )
}
