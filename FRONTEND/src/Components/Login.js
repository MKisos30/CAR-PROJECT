import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { authState, authStatus, authStatusChange, getUserLogIn } from '../Redux-Store/Reducers/authSlice';

const Login = ({ setLogin }) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector(authState)
  const authstatus = useSelector(authStatus)

  const userLogin = async (event) => {
    try {
      event.preventDefault();

      const mail = event.target.elements.email.value
      const password = event.target.elements.password.value

      dispatch(getUserLogIn({ mail, password }))

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (authstatus === "succses") {
      if (!auth.message) {
        dispatch(authStatusChange())
        navigate('/')
      } else {
        dispatch(authStatusChange())
        setMessage(auth.message)
      }
    }
  }, [auth, dispatch, navigate])


  return (
    <div className="login">
     <div className="errorPlace">
      <p className="errorMessage">{message}</p>
      </div>
      <form className="formLogin" onSubmit={userLogin}>
        <div className="inputLogin">
          <input name="email" type="email" placeholder="Please enter your e-mail" />
          <div className="info">
            <img className="iconInfo" src="/iconInfo.png" alt="iconInfo"/>
            <div className="detailsInfo">
              <ul>
                <li>E-mail can't be empty</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="inputLogin">
          <input name="password" type="password" placeholder="Please enter your password" />
          <div className="info">
            <img className="iconInfo" src="/iconInfo.png" alt="iconInfo"/>
            <div className="detailsInfo">
              <ul>
                <li>Password can't be empty</li>
                <li>Password must includ only letters and numbers</li>
                <li>Password need to be betaeen 6 to 10 sybmols</li>
              </ul>
            </div>
          </div>
        </div>
        <button className="loginBut" type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login