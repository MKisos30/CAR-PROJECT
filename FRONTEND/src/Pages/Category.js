import React, { useEffect, useState } from 'react'
import { Link , useParams, Outlet, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { carState, carStatus, getByCategoryCars } from '../Redux-Store/Reducers/carSlice'

const Category = () => {
  const products = useSelector(carState)
  const {category} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
  console.log(color)

  const handleColor = (event) => {
    setColor(event.target.value)
    navigate(`/${category}`)
  }

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
          <select name="cars" className="carsColor" onChange={handleColor}>
            <option value="">All</option>
            <option value="red">Red</option>
            <option value="white">White</option>
            <option value="blue">Blue</option>
            <option value="black">Black</option>
            <option value="orange">Orange</option>
            <option value="dark grey">Dark grey</option>
          </select>
        </div>

        <div className='filterCcmDisplay'>
          <div className='filterCcmDisplay__title'>
            Filter by CCM:
          </div>
          <input type="number" name="ccm" placeholder='Enter Engine Capacity' onChange={(e) => { setCcm(e.target.value) }} />
        </div>
        </div>
        
        <div className="categories">
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
    </div>
  )
}

export default Category