import React, {useState} from 'react'
import { useCartContext } from '../../utils/context';

const CartItemsComponent = (props) => {
    const {cart, setCart} = useCartContext();
  return (
    <div className='div-box'>
        {cart.length === 0 ? (<div className='cart-text'>Empty</div>) : cart.map((item, index) => (<div className='item-sep'>{item.name}</div>))}
    </div>
  )
}

export default CartItemsComponent

      