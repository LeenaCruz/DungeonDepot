import React, {useState} from 'react'
// import {useOutletContext} from 'react-router-dom'
import { useCartContext } from '../../utils/context';

const Cart = () => {
    const {cart, setCart} = useCartContext();
  // console.log(cartItems)
  return (
    <div className='shopping-cart'>
      <div> {JSON.stringify(cart)} </div>
      {/* {cartItems.length === 0 ? (<div>Cart is empty</div>) : cartItems.map((item, index) => (<div>{item.name}</div>))} */}
    </div>
  )
}

export default Cart