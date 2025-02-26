import axios from "axios";
import { createContext, useEffect, useState} from "react";

export const UserContext = createContext();

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading , setLoading] = useState(true);
    const getUser = async () => {
        try{

            const token = localStorage.getItem('userToken');
            const response = await axios.get(`https://ecommerce-node4.onrender.com/user/profile`,
                
                {
                    headers:{
                        Authorization:`Tariq__${token}`
                    }
                }
            )
            setUser(response.data.user);
        }catch(error){
            console.log(error);
         
        }finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        getUser();
    } , [])
    return <UserContext.Provider value={{user ,loading , setUser}}>
        {children}
    </UserContext.Provider>
}

export default UserContextProvider;