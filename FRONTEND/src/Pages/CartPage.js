import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import CartDetails from '../Components/CartDetails'
import { cartState, getCart } from '../Redux-Store/Reducers/cartSlice'

const CartPage = () => {
  const cartItems = useSelector(cartState);
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getCart())
  },[])

  return (
  <div>
    <Link to="/reserv">Buy now</Link>
    <Link to="/order">Orders</Link>
    <div className="cartPage">{cartItems.map(car => {
      return ( 
        <div key={car._id}>
          <h1>{car.name}</h1>
          <CartDetails item={car} />
        </div>
      )
    })}
    </div>
  </div>
  )
}

export default CartPage