import React from 'react'
import USeFetch from '../../Hooks/USeFetch'
import { Link, useParams } from 'react-router-dom'
import Loading from '../../components/loading/Loading';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import '../products/productdetails.css';

export default function ProductDetails() {
  const {productId} = useParams();
  const {data , isLoading} = USeFetch(`https://ecommerce-node4.onrender.com/products/${productId}`);
  console.log(data);
  if(isLoading){
    return <Loading/>
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
          <Link className='cartBtn' to={'/'} onClick={(() => window.scroll(0,0))}  >Add To Cart</Link>
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
          <span className='fw-bold'>Review Date : <span className='fw-normal'>{new Date(review.createdAt).toLocaleDateString()}</span></span>
          <span className='fw-bold'>Review Name : <span className='fw-normal'>{review.createdBy.userName}</span></span>
          <span className='fw-bold'>Review Comment : <span className='fw-normal'>{review.comment}</span></span>

        </div>
          )}

      </section>
      </Tab>
     
    </Tabs>
    </section>
    </>
  )
}
