import React, { useEffect, useState } from "react";
import USeFetch from "../../Hooks/USeFetch";
import Loading from "../../components/loading/Loading";
import { Link } from "react-router-dom";
import '../products/product.css'
import love from '../../../src/assets/love.svg'
import Pagination from 'react-bootstrap/Pagination';
import axios from "axios";


export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading ,setLoading] = useState(true);
  const [data , setData] = useState([]);
  const getProducts = async () => {
    setLoading(true);
    try{
      const {data} = await axios.get(`https://ecommerce-node4.onrender.com/products?page=${currentPage}&limit=5`);
      setData(data);

    }catch(error){
      console.log(error)
    }finally{
      setLoading(false);
    }
  }
  const numberOfPages = Math.ceil(data.total / 5);

    const nextPage = () => {
        if (currentPage < numberOfPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    useEffect(()=> {
      getProducts();
    },[currentPage])
  if (loading) {
    return <Loading />;
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
        <img src={product.mainImage.secure_url} alt="" width={"200px"} />
      </div>
        <span className="discount fw-bold rounded px-1">
          {product.discount == 0 ? "" : product.discount +`%`}
          </span>
        <span className='name'>{product.name}</span>
        <div className="price d-flex gap-2 align-items-center">
          {product.discount != 0 ? 
          <>
          <span className="fw-bold fs-3 text-danger ">{product.finalPrice}$</span>
          <span className=" text-decoration-line-through">{product.price}$</span>
          </> :
          <>
          <span className="fw-bold fs-3">{product.finalPrice}$</span>
          </>
          }
        </div>


        <Link to={`/products/${product._id}`} onClick={(() => window.scroll(0,0))} className="details">Details</Link>
        
       
    </div>
  
)}
</div>
                            <Pagination className="d-flex justify-content-center" >
                                <Pagination.Prev onClick={prevPage} disabled={currentPage === 1} />
                                {[...Array(numberOfPages)].map((_, index) => (
                                    <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
                                        {index + 1}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next onClick={nextPage} disabled={currentPage === numberOfPages} />
                            </Pagination>
      </section>
    </>
  );
}
