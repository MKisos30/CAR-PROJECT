import React, { useEffect, useState } from 'react'
import { Link , useParams, Outlet} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { carState, carStatus, getByCategoryCars } from '../Redux-Store/Reducers/carSlice'

const Category = () => {
  const products = useSelector(carState)
  const {category} = useParams()
  const dispatch = useDispatch()

  const [title, setTitle]= useState('')
  const [sortChoose, setSortChoose] = useState('asc')
  const [color, setColor] = useState("")
  const [ccm, setCcm] = useState("")

  console.log(color, ccm)
  console.log(products)
  useEffect(()=>{
     dispatch(getByCategoryCars({ category, color, ccm }))

     setTitle(category.toUpperCase())
  },[color, ccm])

  const sortByPriceAsc = (a, b) => a.price - b.price
  const sortByPriceDesc = (a, b) => b.price - a.price

  return (
    <div className="carCategory">
      <div className='sortAndFilter'> 

        <div className='sortDisplay'>
          <div className='sortDisplay__title'>Sort by price:</div>
            <button
              onClick={() => { setSortChoose("asc") }}
              className={sortChoose === "asc" ? "activeColor" : null}
            >asc</button>
            <button
              onClick={() => { setSortChoose("desc") }}
              className={sortChoose === "desc" ? "activeColor" : null}
            >desc</button>
          </div>
        
        <div className='filterColorDisplay'>
          <div className='filterColorDisplay__title'>Filter by color:</div>
          <button
            onClick={() => {
              setColor("")
            }}
            className={color === "" ? "activeSort" : null}
          >All</button>
          <button
            onClick={() => {
              setColor("red")
            }}
            className={color === "red" ? "activeSort" : null}
          >Red</button>
          <button
            onClick={() => {
              setColor("white")
            }}
            className={color === "white" ? "activeSort" : null}
          >White</button>
          <button
            onClick={() => {
              setColor("blue")
            }}
            className={color === "blue" ? "activeSort" : null}
          >Blue</button>
          <button
            onClick={() => {
              setColor("black")
            }}
            className={color === "black" ? "activeSort" : null}
          >Black</button>
          <button
            onClick={() => {
              setColor("orange")
            }}
            className={color === "orange" ? "activeSort" : null}
          >Orange</button>
          <button
            onClick={() => {
              setColor("dark grey")
            }}
            className={color === "dark grey" ? "activeSort" : null}
          >Dark grey</button>
        </div>

        <div className='filterCcmDisplay'>
          <div className='filterCcmDisplay__title'>
            Filter by CCM:
          </div>
          <input type="number" name="ccm" placeholder='Enter Engine Capacity' onChange={(e) => { setCcm(e.target.value) }} />
        </div>
        </div>


      <h1>{title}</h1>
      <div className="carCategory__cars">
        {products.length > 0 ? [...products]
          .sort(sortChoose ==="asc"?sortByPriceAsc:sortByPriceDesc)
          .map(item=> 
            <Link key={item._id} to={item._id}>
              <h2>{item.name}</h2>
            </Link>
          ) : <div>Not found</div>
        }
      </div>
      <Outlet/>
    </div>
  )
}

export default Category