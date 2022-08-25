import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { deleteCar, editCarDetails } from '../Redux-Store/Reducers/editCarSlice'

const CarDetailEdit = ({ item, setDisplayWindow }) => {
  const dispatch = useDispatch()


  return (
    <div className="carEdit__details">
      <p>Type: {item.type}</p>
      <p>Name: {item.name}</p>
      <p>Color: {item.color}</p>
      <p>Price: {item.price} NIS</p>
      <p>Engine Capacity: {item.engineCapacity}</p>
      <img className="carDetails__img" src={`/Car-images/${item.folder}/${item.img}.jpeg`} alt={item.name} />
      <div className="carEdit__details--buttons">
        <button onClick={() => {
          dispatch(editCarDetails({ id: item._id }))
          setDisplayWindow("flex")
        }}>Edit</button>
        <button onClick={() => { dispatch(deleteCar({ id: item._id })) }}>Delete</button>
      </div>
    </div>
  )
}

export default CarDetailEdit;