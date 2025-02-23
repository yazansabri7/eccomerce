import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = ({children}) => {
    const [cartCount , setCartCount] = useState(0);
    const [cart , setCart] =useState(null);
    const [loading, setLoading] = useState(true);
    const [total , setTotal] = useState(0);
    const [taxProduct,setTaxProduct]= useState(0);
    const getCart = async () => {
        try{

            const token = localStorage.getItem("userToken");
            const response =await axios.get(`https://ecommerce-node4.onrender.com/cart`,
                {
                    headers:{
                        Authorization:`Tariq__${token}`
                    }
                }
            )
            setCartCount(response.data.count);
            setCart(response.data);
            const finalPrice = response.data.products.reduce((counter , product)=> counter + product.details.finalPrice * product.quantity,0);
            const tax = response.data.products.reduce((counter ,product)=> counter + 4 *product.quantity,0);
            const totalPrice = finalPrice + tax;
            setTotal(totalPrice);
            setTaxProduct(tax);

        }catch(error){
            console.log(error);
        }finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        getCart();
    } , [])
    return <CartContext.Provider value={{cartCount , setCartCount , cart , loading , taxProduct ,total}}>
            {children}
    </CartContext.Provider>
}

export default CartContextProvider;
