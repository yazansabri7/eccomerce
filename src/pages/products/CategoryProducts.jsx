import React, { useEffect, useState } from "react";
import USeFetch from "../../Hooks/USeFetch";
import Loading from "../../components/loading/Loading";
import { Link, useParams } from "react-router-dom";
import '../products/product.css'
import axios from "axios";
import love from '../../../src/assets/love.svg'
import Products from "./Products";

export default function CategoryProducts() {
    const {categoryId} = useParams();
    const {data , isLoading} = USeFetch(`https://ecommerce-node4.onrender.com/products/category/${categoryId}`);
    console.log(data);
    
    
    if(isLoading){
      return <Loading/>
    }
    if(data.products.length == 0){
      return <div className="alert alert-warning container fw-bold border">No products in this category</div>
    }

  return (
    <>
     <section className="product">
          <div className=' container d-flex  align-items-stretch flex-wrap py-5 gap-3'>
    
    {data.products.map(product =>
     
        <div className="product-item d-flex flex-column justify-content-between gap-2  "  key={product.id}>
          <div className="love d-flex justify-content-between">
            <span className="rounded-pill py-2  px-4">0% Installment</span>
            <img src={love} alt="" />
          </div>
          <div className="img ms-auto me-auto ">
            <img src={product.mainImage.secure_url} alt="" />
          </div>
            <span className="discount fw-bold rounded px-1">
              {product.discount}%
              </span>
            <span className='name'>{product.name}</span>
            <div className="price d-flex gap-2 align-items-center">
              <span className="fw-bold">{product.finalPrice}$</span>
                <span className="fw-bold">{product.price}$</span>
            </div>
    
    
            <Link to={`/products/${product._id}`} onClick={(() => window.scroll(0,0))} className="details">Details</Link>
        </div>
      
    )}
    </div>
          </section>


     
        
    </>
  );
}
