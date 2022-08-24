import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteItemFromCart } from '../Redux-Store/Reducers/cartSlice'

const CartDetails = ({item}) => {

    const dispatch = useDispatch()
    
    const deleteFromCart = async (carId) => {
      dispatch(deleteItemFromCart({carId}))
    }

  return (
    <div className="cartDetails">
      <p>{item.name}</p>
      <p>{item.color}</p>
      <p>{item.price}</p>
      <p>{item.engineCapacity}</p>
      <img className="carDetails__img" src={`/Car-images/${item.folder}/${item.img}.jpeg`} alt={item.name}/>
      <button onClick={() => {deleteFromCart(item._id)}} className="cartDetails_but">Delete</button>
    </div>
  )
}

export default CartDetails