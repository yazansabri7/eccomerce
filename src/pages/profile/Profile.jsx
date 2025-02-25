import React, { useContext, useState } from 'react'
import { UserContext } from '../../components/user/context/UserContext';
import imageProfile from '../../assets/profile.jpg'
import './profile.css'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/Loading';

export default function Profile() {
  const navigate = useNavigate();
    const [active , setActive] = useState('info');
    const {user , loading ,setUser} = useContext(UserContext);
  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('email')
    setUser(null);
    navigate('/auth/login');
  }
  const bar =(link)=>{
    setActive(link);

  }
  
     if(loading){
        return <Loading/>
     }
   return (
     <>
     <div className="bg-light-subtle rounded py-4 container shadow-sm  mb-5 bg-body-tertiary rounded d-flex justify-content-start">
         Home / pages /  <span className="fw-bold"> Profile</span>
       </div>
     <div className="prof container bg-light rounded py-2 d-flex align-items-start gap-5">
 
       <div className="img-profile d-flex flex-column justify-content-between rounded px-2 py-2 gap-4 " width="250px">
         <div className="personal d-flex flex-column gap-2 ">
            {user.image?.secure_url != null ? <img src={user.image.secure_url}/>: <img src={imageProfile}/>} 
         </div>
         <div className="Links d-flex flex-column gap-3">
             <Link to={'/profile/info'} className={active === 'info' ? 'active2': ''}  onClick={()=>bar('info')}>Account Info</Link>
             <Link to={'/profile/order'} className={active === 'order' ? 'active2':''} onClick={()=>bar('order')}>My Order</Link>
             <Link  onClick={logout}>Logout</Link>
         </div>
       </div>
 
      
      <Outlet />
       
     </div>
     
       
     </>
   )
}
