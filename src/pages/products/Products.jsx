import React, { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import { Link } from "react-router-dom";
import './product.css'
import love from '../../../src/assets/love.svg'
import Pagination from 'react-bootstrap/Pagination';
import axios from "axios";
import { Container, FloatingLabel, Form } from "react-bootstrap";
import { Flip, toast } from "react-toastify";


export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading ,setLoading] = useState(true);
  const [data , setData] = useState([]);
  const [sort ,setSort] = useState(null);
  const [max , setMax]= useState(null);  
  const [min , setMin]= useState(null); 
  const [serach , setSerach] = useState(null);

  const serachWord = (e) => {
    e.preventDefault();

    getProducts();
  }
  const minMax = (e) => {
    e.preventDefault();
    if(max>min)
    {
      getProducts();
    }
    else{
      toast.warn('Max Price should Be Greater Than Min Price', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
        });
    }
  } 

  const sortProducts =  (e) => {
    e.preventDefault();
    setSort(e.target.value);
  }
  const getProducts = async () => {
    setLoading(true);
    try{
      let url =`https://ecommerce-node4.onrender.com/products?page=${currentPage}&limit=5`;
      if(sort){
        url+= `&sort=${sort}`;
      }
      if(min !== null){
        url+= `&price[gte]=${min}`;
      }
      if(max !== null){
        url+= `&price[lte]=${max}`;
      }
      if(serach){
        url+= `&search=${serach}`;
      }
      const {data} = await axios.get(url);
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
    },[currentPage , sort])
  if (loading) {
    return <Loading />;
  }

  return (
    <>
    
    <Container>
      <div className="form">
        <Form className="formProduct d-flex justify-content-between align-items-center py-2 px-2 border rounded">
            <Form.Select aria-label="Default select example" onChange={sortProducts} value={sort} className="sort">
              <option value=''>Sort By</option>
              <option value="name">Name</option>
              <option value="-name">Name desc</option>
              <option value="price">Min Price To Max Price</option>
              <option value="-price">Max Price To Min Price</option>
              <option value="discount">Min Discount To Max Discount</option>
              <option value="-discount">Max Discount To Min Discount</option>
            </Form.Select>
            <div className="max-min d-flex gap-2" >
              <Form.Group className=" d-flex gap-1 align-items-center" controlId="formBasicEmail" >
                <Form.Label className="m-0"> Min </Form.Label>
                <Form.Control type="text" placeholder="" onChange={(e)=> setMin(e.target.value)}  />
                
            </Form.Group>
              <Form.Group className=" d-flex align-items-center gap-1 " controlId="formBasicEmail">
                <Form.Label className="m-0">Max</Form.Label>
                <Form.Control type="text" placeholder="" onChange={(e)=> setMax(e.target.value)}  />
                
            </Form.Group>
            <button  className=" clearBtn2" onClick={minMax}>Go</button>
            </div>
            <div className="search d-flex align-items-center  gap-1">
                <FloatingLabel controlId="floatingPassword" label="Serach">
                 <Form.Control type="search" placeholder="" onChange={(e)=> setSerach(e.target.value)} value={serach} />
                </FloatingLabel>
                <button className=" clearBtn2" onClick={serachWord}>Search</button>
            </div>

        </Form>
      </div>
    </Container>
      <section className="product">
      <div className=' container d-flex  align-items-stretch flex-wrap py-5 gap-3'>

{data?.products?.map(product =>
 
    <div className="product-item d-flex flex-column justify-content-between gap-2  "  key={product.id}>
      <div className="love d-flex justify-content-between">
        <span className="rounded-pill py-2  px-4">0% Installment</span>
        <img src={love} alt="" />
      </div>
      <div className="img ms-auto me-auto ">
        <img src={product.mainImage?.secure_url} alt="" width={"200px"} />
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
