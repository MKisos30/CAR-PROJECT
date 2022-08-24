import React from 'react'
import NavBar from '../Components/NavBar'
import { Outlet } from 'react-router'
import Footer from '../Components/Footer'

const Layout = ({setLogin, login}) => {
  return (
    <div>
      <NavBar setLogin={setLogin} login={login}/>

      <Outlet />

      <Footer />
    </div>
  )
}

export default Layout