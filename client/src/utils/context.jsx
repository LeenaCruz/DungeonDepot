import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext)

export const CartProvider = (props) => {
    const [cart, setCart] = useState([])
    return <CartContext.Provider value={{cart, setCart}} {...props} />
}

