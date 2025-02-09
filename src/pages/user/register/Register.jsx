import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, Slide, toast } from "react-toastify";
import registerImage from "../../../assets/login.png";
import '../register/register.css'

export default function Register() {
  const navigate = useNavigate();
  const [error , setError] = useState('');
  const [loading , setLoading] = useState(false);
    const {register , handleSubmit ,formState:{errors}}  = useForm();
    const registerUser = async (value) => {
      setLoading(true);
      try{
        const response = await axios.post(`https://ecommerce-node4.onrender.com/auth/signup` , value);
        if(response.status == 201){
          toast.info('Please Check Your Email ', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
            navigate('/login');
        }
      }catch(error){
        console.log(error);
        if(error.response.status == 409){
          toast.error('Email Already Exists', {
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
        }
        else{
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
        }
       
      }finally{
        setLoading(false);
      }

    }
  return (
    <>
      <div className="bg-light-subtle rounded py-4 container shadow-sm mb-5 bg-body-tertiary rounded d-flex justify-content-start mb-3">
        Home / pages / <span className="fw-bold"> Register</span>
      </div>
      <div className="register container py-5 d-flex align-items-center gap-1 flex-wrap w-100 ">
        <div className="register-left ">
          <img src={registerImage} alt="" />
        </div>
        <div className="register-right d-flex flex-column gap-5">
          <div className="join-to d-flex flex-column gap-2">
            <span className="fs-3 fw-bold">Register</span>
            <span>JOIN TO US</span>
          </div>
          <div className="form">
            <Form onSubmit={handleSubmit(registerUser)}>
              {<div className="text-danger">{error}</div>}
              <FloatingLabel
                controlId="floatingInput"
                label="Your Name"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="" {...register("userName" , {required:"username is required"})} />
                {errors.userName ? <div className="text-danger">{errors.userName.message}</div>:null}
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Email Address"
                className="mb-3"
              >
                <Form.Control type="email" placeholder="" {...register("email" , {required:"email is required"})} />
                {errors.email ? <div className="text-danger">{errors.email.message}</div>:null}
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholder="" {...register("password" , {required:"password is required"})} />
                {errors.password ? <div className="text-danger">{errors.password.message}</div>:null}
              </FloatingLabel>
              <div className="already d-flex flex-column gap-3">

              <Button className="mt-3 btn " type="submit" disabled={loading}>
                {loading ? "LODAING..." : "REGISTER"}
              </Button>
              <div className="log d-flex align-items-center">

              <span>ALREADY USER ? <Link to={'/login'}>LOGIN</Link></span>
              </div>
              </div>

            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
