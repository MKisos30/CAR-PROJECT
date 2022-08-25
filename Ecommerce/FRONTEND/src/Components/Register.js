import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authState, authStatus, authStatusChange, getUserRegister } from '../Redux-Store/Reducers/authSlice'

const Register = () => {
  const [message, setMessage] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector(authState)
  const authstatus = useSelector(authStatus)

  const register = async (event) => {
    try {
      event.preventDefault();

      const name = event.target.elements.name.value
      const mail = event.target.elements.email.value
      const password = event.target.elements.password.value
      const confirmPass = event.target.elements.confirmPassword.value

      dispatch(getUserRegister({ name, mail, password, confirmPass }))

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (authstatus === "succses") {
      if (!auth.message) {
        dispatch(authStatusChange())
        navigate('/auth')
      } else {
        dispatch(authStatusChange())
        setMessage(auth.message)
      }
    }
  }, [auth, dispatch])

  return (
    <div className="register">
      <div className="errorPlace">
      <p className="errorMessage">{message}</p>
      </div>
      <form className="formRegister" onSubmit={register}>
        <div className="inputReg">
          <input name="name" type="text" placeholder="Please enter your name" />
          <div className="info">
            <img className="iconInfo" src="/iconInfo.png" alt="iconInfo"/>
            <div className="detailsInfo">
              <ul>
                <li>Name can't be empty</li>
                <li>Name needs to be minimum 2 characters</li>
                <li>Name needs to be maximum 30 characters</li>
              </ul>
            </div> 
          </div>
        </div>

        <div className="inputReg">
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

        <div className="inputReg">
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

        <div className="inputReg">
          <input name="confirmPassword" type="password" placeholder="Please confirm your password" />
          <div className="info">
            <img className="iconInfo" src="/iconInfo.png" alt="iconInfo"/>
            <div className="detailsInfo">
              <ul>
                <li>Confirm Password can't be empty</li>
                <li>Confirm Password must be same</li>
              </ul>
            </div> 
          </div>
        </div>

        <button className="registerBut" type="submit">Create</button>  
      </form>
    </div>
  )
}

export default Register;