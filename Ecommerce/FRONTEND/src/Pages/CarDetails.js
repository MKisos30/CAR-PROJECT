import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { oneCarState, getOneCar } from '../Redux-Store/Reducers/carOneSlice'
import { carDetails } from '../Redux-Store/Reducers/cartSlice'

const CarDetails = ({ login }) => {
  const car = useSelector(oneCarState)
  const { id } = useParams()
  const dispatch = useDispatch()

  const toCurrency = price => {
    return new Intl.NumberFormat('en-EN', {
      currency: "ils",
      style: "currency"
    }).format(price)
  }

  useEffect(() => {
    dispatch(getOneCar({ id }))

    document.querySelectorAll(".price").forEach(p => {
      p.textContent = toCurrency(p.textContent)
    })

  }, [id])

  const handleAddCar = async (carId) => {
    dispatch(carDetails({ carId }))
  }

  
  return (
    <div className="carDetails" key={car._id}>
      <div className="carDetails__details" style={{
        border: `1px solid ${car.color}`
      }}>
        <h1>{car.name}</h1>
        <p>{car.color}</p>
        <p className="price">{car.price}</p>
        <p>{car.engineCapacity} CCM</p>
      </div>
      <img className="carDetails__img" src={`/Car-images/${car.folder}/${car.img}.jpeg`} alt={car.name} />
      {
        login ? <>
          <button onClick={() => { handleAddCar(car._id) }}>Add to cart</button>
        </> : null
      }
    </div>
  )
}

export default CarDetails