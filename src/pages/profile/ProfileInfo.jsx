import React, { useContext, useState } from 'react'
import { UserContext } from '../../components/user/context/UserContext';
import Loading from '../../components/loading/Loading';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
export default function ProfileInfo() {
    const {register,handleSubmit,formState:{errors}} = useForm();
    const token = localStorage.getItem('userToken');
    const [updateLoading ,setUpdateLoading] = useState(false);
    
    
      const updateImage = async (data) => {
         setUpdateLoading(true);
         const formData = new FormData();
         formData.append("image",data.image[0]);
         try{
            const response = await axios.put(`https://ecommerce-node4.onrender.com/user/update-image`,formData,{
               headers:{
                  Authorization:`Tariq__${token}`
               }
            });
            console.log(response)
            if(response.status === 200){
               toast.success('Update Image Successfully', {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  transition: Bounce,
               });
            }
            
         }catch(error){
            console.log(error);
         }finally{
            setUpdateLoading(false);
         }
      }
      const {user , loading} = useContext(UserContext);
     if(loading){
        return <Loading/>
     }
     
    
  return(
   <>
  <div className='userInfo d-flex flex-column gap-4'>
   <span className='fw-bold'>User Id : <span className='fw-normal'>{user?._id}</span></span>
   <span className='fw-bold'>Email : <span className='fw-normal'>{user?.email}</span></span>
   <span className='fw-bold'> Name : <span className='fw-normal'>{user?.userName}</span></span>
   <span className='fw-bold'> Joined At : <span className='fw-normal'>{new Date(user?.createdAt).toLocaleString()}</span></span>
   <span className='fw-bold'> Last Change Password : <span className='fw-normal'>{new Date(user?.changePasswordTime).toLocaleString()}</span></span>
   <Form onSubmit={handleSubmit(updateImage)}>
      <Form.Group controlId='updateImage' encType='multipart/form-data'>
         <Form.Label className='fw-bold mt-3'>Update Profile Image</Form.Label>
          <Form.Control type="file" {...register('image',{required:"Image Is Required"})}  />  
      </Form.Group>
      <Button type='submit' onClick={()=>updateImage} className='updateBtn mt-4' disabled={updateLoading}>
         {updateLoading ? "Update Image...":"Update Image"}
      </Button>
   </Form>

  </div>
     
   
   </>
  )
}
