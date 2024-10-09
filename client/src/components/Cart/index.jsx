import React, {useState} from 'react'
// import {useOutletContext} from 'react-router-dom'
import { useCartContext } from '../../utils/context';
import CartItemsComponent from '../CartItemsComponent';

const Cart = () => {
    const {cart, setCart} = useCartContext();
  // console.log(cartItems)
  return (
    <div className='shopping-cart' style={{display: 'flex', justifyContent: 'center'}}>
      {/* <div> {JSON.stringify(cart)} </div> */}
      <h2 className='cart-pos'>Shopping Cart
      <hr style={{width: '200px'}}></hr>
      <CartItemsComponent />
      </h2>
      {/* {cart.length === 0 ? (<div>Cart is empty</div>) : cart.map((item, index) => (<div className='item-sep'>{item.name}</div>))} */}
    </div>
  )
}

export default Cart