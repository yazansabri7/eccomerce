import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function USeFetch(url) {
    const [error, setError] = useState(null)
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const getData = async () => {
        try{
            const {data} = await axios.get(url);
            setData(data);
            setError(null);
        }catch(err){
            setError(err.message);
            
        }finally{
            setIsLoading(false);
        }
    }
    useEffect( () => {
        getData();
    } , [])


  return { data , isLoading , error}
  
}
