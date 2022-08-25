import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import EditWindow from '../Components/EditWindow'
import CarDetailEdit from '../Components/CarDetailEdit'
import NewCarAdd from '../Components/NewCarAdd'
import { updateState, getUpdateProduct } from '../Redux-Store/Reducers/updateSlice'

const UpdateProduct = () => {

  const dispatch = useDispatch()
  const products = useSelector(updateState)
  const [displayWindow, setDisplayWindow] = useState("none")

  useEffect(() => {
    dispatch(getUpdateProduct())
  }, [])

  return (
    <div>
      <EditWindow displayWindow={displayWindow} setDisplayWindow={setDisplayWindow} />
      <NewCarAdd />
      <div className="carEdit">
        {products.map(item => {
          return (
            <CarDetailEdit key={item._id} item={item} setDisplayWindow={setDisplayWindow} />
          )
        })}
      </div>
    </div>
  )
}

export default UpdateProduct