import React, {useState} from 'react'
import { useCartContext } from '../../utils/context';

const handleClick = () => {
console.log(Hi)
}

const CartItemsComponent = (props) => {
    const {cart, setCart} = useCartContext();
  return (
    <div className='div-box'>
        {cart.length === 0 ? (<div className='cart-text'>Empty</div>) : cart.map((item, index) => (<div className='item-sep'>{item.name}</div>))}
        <button style={{color: '#4C061D', fontWeight: 'bold', marginTop: '15px', cursor: 'pointer'}} onClick={handleClick}>Clear Cart</button>
    </div>
  )
}

export default CartItemsComponent

      