import React, { useEffect, useState } from 'react'
import { Link , useParams, Outlet} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { carState, carStatus, getByCategoryCars } from '../Redux-Store/Reducers/carSlice'

const Category = () => {
  const products = useSelector(carState)
  const {category} = useParams()
  const dispatch = useDispatch()

  const [title, setTitle]= useState('')

  useEffect(()=>{
    dispatch(getByCategoryCars({category}))

     setTitle(category.toUpperCase())
  },[])


  return (
    <div className="carCategory">
      <h1>{title}</h1>
      <div className="carCategory__cars">
        {products.map(item=>{
          return (
            <Link key={item._id} to={item._id}>
              <h2>{item.name}</h2>
            </Link>
          )
        })}
      </div>
      <Outlet/>
    </div>
  )
}

export default Category