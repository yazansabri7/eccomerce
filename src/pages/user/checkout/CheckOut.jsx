import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../components/user/context/CartContext";
import Loading from "../../../components/loading/Loading";
import "./checkout.css";
import axios from "axios";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CheckOut() {
  const [cart, setCart] = useState(null);
  const {setCartCount} = useContext(CartContext);
  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
   const {register , handleSubmit , formState:{errors}} = useForm();
   const [createLoading , setCreateLoading] = useState(false);

   const createOrder = async (data) => {
    try{
        setCreateLoading(true);

        const response = await axios.post(`https://ecommerce-node4.onrender.com/order`,data,{
            headers:{
                Authorization:`Tariq__${token}`
            }
        });
        if(response.status === 201){
            toast.success('The order has been approvedr ', {
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
                setCartCount(0);
                navigate('/profile/order');
        }
    }catch(error){
        console.log(error);
    }finally{
        setCreateLoading(false);
        
    }
   }
  const getCart = async () => {
    try {
      const response = await axios.get(
        `https://ecommerce-node4.onrender.com/cart`,
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setCart(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCart();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <section className="order-section">
        <div className="order container d-flex gap-3 align-items-stretch">
          <div className="order-details d-flex flex-column gap-4 py-3 px-3 rounded">
            <div className="sub d-flex justify-content-between border-bottom pb-2">
              <span className="text-uppercase text-secondary">Product</span>
              <span className="text-uppercase text-secondary">Sub Total</span>
            </div>
            {cart.products.map((product) => (
              <div className="price-for d-flex justify-content-between align-items-center border-bottom pb-2" key={product._id}>
                <div className="order-item d-flex align-items-center gap-3">
                  <div className="img-order">
                    <img
                      src={product.details.mainImage.secure_url}
                      alt=""
                      width={"60px"}
                    />
                  </div>
                  <div className="name d-flex flex-column gap-2">
                    <span className="fw-bold">{product.details.name}</span>
                    <span className="text-secondary">x{product.quantity}</span>
                  </div>
                </div>

                <div className="price-prod fw-bold">
                  {product.details.finalPrice * product.quantity}$
                </div>
              </div>
            ))}
            <div className="total-order d-flex justify-content-between">
              <span className="fw-bold">Order Total</span>
              <span className="fw-bold">
                {cart.products.reduce(
                  (counter, product) =>
                    counter +
                    product.details.finalPrice * product.quantity +
                    product.quantity * 4,
                  0
                )}
                $
              </span>
            </div>
          </div>
          <Form className="form2 d-flex flex-column justify-content-between " onSubmit={handleSubmit(createOrder)}>
            <FloatingLabel
              controlId="floatingInput"
              label="Address"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="" {...register("address" , {required:"Address Is Required"})} />
            {errors.address?<div className="text-danger">{errors.address.message}</div>:null}
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Phone Number" className="mb-3">
              <Form.Control type="text" placeholder="" {...register("phone" , {required:"Phone Number Is Required"})} />
            {errors.phone?<div className="text-danger">{errors.phone.message}</div>:null}
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Coupon Name" className="mb-3">
              <Form.Control type="text" placeholder="" {...register("couponName")}  />
            </FloatingLabel>

            <Button className="btn2 w-100" type="submit" disabled={createLoading}>
                {createLoading ? "Place Order ..." : "Place Order"}
            </Button>
          </Form>
        </div>
      </section>
    </>
  );
}
