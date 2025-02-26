import React from 'react'
import USeFetch from '../../Hooks/USeFetch'
import Loading from '../../components/loading/Loading';
import { Link } from 'react-router-dom';
import './category.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';





export default function Categories() {
    const {data , isLoading , error} =  USeFetch(`https://ecommerce-node4.onrender.com/categories/active`);


    if(isLoading){
        return <Loading/>
    }
  return (
    <>
    
    {error ? <div className="alert alert-danger">{error}</div> : ""}
    <div className=" popular container my-5">
    <span className=' fw-bold fs-3'>Popular Categories</span>
    </div>
    <div className="category-list container d-flex text-center">
   
</div>
<Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={3.3}
      navigation
      loop={true}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {data?.categories?.map(category=> <SwiperSlide  key={category._id}>
        <div className="img-category w-100">
        <Link to={`/categories/${category._id}`}>
        <img src={category.image?.secure_url} className='w-50' /> 
        </Link>
        </div>
        </SwiperSlide>)}
     
    </Swiper>
    
    </>
  )
}
