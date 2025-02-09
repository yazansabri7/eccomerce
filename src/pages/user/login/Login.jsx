import React, { useState } from "react";
import loginImage from "../../../assets/login.png";
import Form from "react-bootstrap/Form";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Button } from "react-bootstrap";
import { Link, useNavigate} from "react-router-dom";
import '../login/login.css';
import { useForm } from "react-hook-form";
import axios from "axios";
import { Bounce, toast } from "react-toastify";


export default function Login() {
       const {register , handleSubmit , formState:{errors}} = useForm();
       const [loading , setLoading] = useState(false);
       const navigate = useNavigate();
       const loginUser = async (value) => {
        setLoading(true);
        try{

          const response = await axios.post(`https://ecommerce-node4.onrender.com/auth/signin` ,value);
          console.log(response);
          if(response.status == 200){
            localStorage.setItem("userToken" , response.data.token);
            navigate('/');
          }
        }catch(e){
          toast.error('Invalid Data', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
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
      <div className="bg-light-subtle rounded py-4 container shadow-sm  mb-5 bg-body-tertiary rounded d-flex justify-content-start">
        Home / pages / <span className="fw-bold">Login</span>
      </div>

      <div className="login container d-flex align-items-center gap-1 flex-wrap w-100 py-5">
        <div className="login-left">
          <img src={loginImage} alt="" />
        </div>
        <div className="login-right d-flex flex-column gap-4">
          <div className="welcome d-flex flex-column gap-2">
            <span className="fs-2 fw-bold">Welcome Back</span>
            <span>LOGIN TO CONTINUE</span>
          </div>
          <div className="form">
            <Form onSubmit={handleSubmit(loginUser)}>
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control type="email" placeholder="name@example.com" {...register("email" , {required:"Email Is Required"})} />
              {errors.email?<div className="text-danger">{errors.email.message}</div>:null}
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholder="Password" {...register("password" , {required:"Password Is Required"})} />
              {errors.password?<div className="text-danger">{errors.password.message}</div> : null}
              </FloatingLabel>
              <div className="already d-flex flex-column gap-3">

              <Button className="mt-3 btn" type="submit" disabled={loading}>
               {loading ? "LOADING ..." : "LOGIN"}
              </Button>
              <div className="log d-flex align-items-center">

              <span>NEW USER ? <Link to={'/register'}>REGISTER</Link></span>
              </div>
              </div>
             
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
