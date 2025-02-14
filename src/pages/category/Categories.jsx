import React from 'react'
import USeFetch from '../../Hooks/USeFetch'
import Loading from '../../components/loading/Loading';
import { Link } from 'react-router-dom';
import '../category/category.css'

export default function Categories() {
    const {data , isLoading , error} =  USeFetch(`https://ecommerce-node4.onrender.com/categories/active`);
    console.log(data);


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
    {data.categories.map(category=>
      <div className="category-item" key={category._id}>
        <Link to={`/categories/${category._id}`}>
        <img src={category.image.secure_url} alt="" className='w-50' />
       
    </Link>
      </div>

      )}
</div>
    
    </>
  )
}
