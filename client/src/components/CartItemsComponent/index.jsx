import React, {useState} from 'react'
import { useCartContext } from '../../utils/context';

const CartItemsComponent = () => {
    const {cart, setCart} = useCartContext();
  return (
    <div className='div-box'>
        {cart.length === 0 ? (<div className='cart-text'>Cart is empty</div>) : cart.map((item, index) => (<div className='item-sep'>{item.name}</div>))}
    </div>
  )
}

export default CartItemsComponent

      