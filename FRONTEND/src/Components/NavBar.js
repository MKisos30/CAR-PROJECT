import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { cookieState, getUserRole } from '../Redux-Store/Reducers/cookieSlice'
import { useDispatch, useSelector } from 'react-redux'
import { authState, authStatus, authStatusChange, userLogout } from '../Redux-Store/Reducers/authSlice'
import { searchCar, searchState } from '../Redux-Store/Reducers/searchSlice'

const NavBar = () => {
  const [message, setMessage] = useState('')
  const [showWindow, setShowWindow] = useState("none")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const search = useSelector(searchState)
  const authUser = useSelector(authState)
  const authstatus = useSelector(authStatus)
  const loginUser = useSelector(cookieState)

  useEffect(() => {
    dispatch(getUserRole())
  }, [authUser])

  const handleSearch = async (event) => {
    event.preventDefault()

    const name = event.target.elements.search.value;

    if (name.length === 0) {
      setMessage('The input is empty')
    } else {
      dispatch(searchCar({ name }))
    }
  }

  const userOut = async () => {
    dispatch(userLogout())
  }

  // useEffect(() => {
  //   if (authstatus === "succses") {
  //     if (loginUser.userLogin === false) {
  //       dispatch(authStatusChange())
  //       navigate('/')
  //     }
  //   }
  // }, [authstatus, dispatch, loginUser, navigate])

  useEffect(() => {
    if (Object.keys(search).length > 0) {
      if (search.ok === true) {
        setShowWindow("flex")
        setMessage('')
      } else {
        setMessage(search.massage)
      }
    }
  }, [search])

  return (
    <div className="navbar">
      <div className="navbar-link">
        <Link to="/">Home</Link>
        {loginUser.userLogin === true ? <>
          <Link to="/cart">Cart</Link>
          {loginUser.role === "admin" ? <><></>
          <Link to="/update">Edit</Link>
          </> :
            null
          }
          <button className="logoutBut" onClick={userOut}>Logout</button>
        </> : <>
          <Link to="auth">Login</Link>
          <Link to="auth/register">Register</Link>
        </>}
      </div>

      <form className="searchForm" onSubmit={handleSearch}>
        {message}
        <input type="text" name="search" placeholder="Search by car name" required />
        <button type="submit">Search</button>
      </form>

      {
        Object.keys(search).length > 0 ?
          search.ok === true ? <>
            <div className="carInfo" style={{ display: showWindow }}>
              <div className="carInfo__closebtn" onClick={() => { setShowWindow("none") }}>X</div>
              <div className="carInfo__details">
                <p>{search.car.name}</p>
                <p>{search.car.color}</p>
                <p>{search.car.price}</p>
                <p>{search.car.engineCapacity}</p>
                <img className="carInfo__img" src={`/Car-images/${search.car.folder}/${search.car.img}.jpeg`} alt={search.car.name} />
              </div>
            </div>
          </> :
            null :
          null
      }
    </div>
  )
}

export default NavBar