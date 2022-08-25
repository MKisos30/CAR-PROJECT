import axios from 'axios'
import { useEffect, useState, useRef, createRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cartState } from '../Redux-Store/Reducers/cartSlice'
import { getUserFromCookie, userState } from '../Redux-Store/Reducers/userSlice'
import { reserveState, sendReservDetails } from '../Redux-Store/Reducers/reservSlice'

const ReservPage = () => {
    const [message, setMessage] = useState()
    const [totalPay, setTotalPay] = useState()
    const [elRefs, setElRefs] = useState([]);
    const amountRef = useRef()
    const totalPayRef = useRef()

    const dispatch = useDispatch()
    const userCart = useSelector(cartState)
    const userDitails = useSelector(userState)
    const reserve = useSelector(reserveState)

  

    const cart = userCart.length;

    useEffect(() => {
        setElRefs((elRefs) =>
            Array(cart)
                .fill()
                .map((_, i) => elRefs[i] || createRef()),
        );
    }, [cart])

    useEffect(() => {
        dispatch(getUserFromCookie())
    }, [])

    useEffect(() => {
        if (userCart.length > 0) {
            const needToPay = userCart.map(i => i.price)
            const totalPayUser = needToPay.reduce((a, b) => a + b)
            setTotalPay(totalPayUser)
        }
    }, [userDitails])

    const reserveDetails = async (event) => {
        event.preventDefault()

        const amout = amountRef.current?.innerText
        const totalPrice = totalPayRef.current?.innerText
        const namesOfCars = elRefs.map((i) => {
            return i.current.innerText
        })

        const name = event.target.elements.name.value;
        const adress = event.target.elements.address.value
        const phoneNumber = event.target.elements.phoneNumber.value
        const creditCardNumber = event.target.elements.creditCard.value
        const creditCardValidity = event.target.elements.validity.value
        const cvv = event.target.elements.CVV.value
        const idNumber = event.target.elements.idNumber.value

        dispatch(sendReservDetails({ name, adress, phoneNumber, creditCardNumber, creditCardValidity, cvv, idNumber, amout, totalPrice, namesOfCars }))
    }

    useEffect(() => {
      if (reserve.message) {
        setMessage(reserve.message)
      }
    }, [reserve])

    return (
        <div>
       <div className="errorPlace">
      <p className="errorMessage">{message}</p>
      </div>
          <form onSubmit={reserveDetails} className="reservePage">

            <div className="reservDetails">
              <p>Reservation deatails</p>

              <div className="reserveInput">
                <input type="text" name="name" defaultValue={userDitails.name} />
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

              <div className="reserveInput">
                <input type="text" name="address" placeholder="Please enter your adress" />
                <div className="info">
                  <img className="iconInfo" src="/iconInfo.png" alt="iconInfo"/> 
                  <div className="detailsInfo">
                    <ul>
                      <li>Address can't be empty</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="reserveInput">
                <input type="text" name="phoneNumber" placeholder="Please enter your phoneNumber" />
                <div className="info">
                  <img className="iconInfo" src="/iconInfo.png" alt="iconInfo"/> 
                  <div className="detailsInfo">
                    <ul>
                      <li>Phone number can not be empty</li>
                      <li>Phone number must be 10 characters</li>
                      <li>Phone number must includ only numbers</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="creditCardDetails">
              <p>Credit card deatails</p>

              <div className="reserveInput">
                <input type="text" name="creditCard" placeholder="Enter your creditCard number" />
                <div className="info">
                  <img className="iconInfo" src="/iconInfo.png" alt="iconInfo"/> 
                  <div className="detailsInfo">
                    <ul>
                      <li>Credit card number can not be empty</li>
                      <li>Credit card number must be min 8 characters</li>
                      <li>Credit card number must be max 16 characters</li>
                      <li>Credit card number must be only numbers</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="reserveInput">
                <input type="text" name="validity" placeholder="Enter your creditCard validity" />
                <div className="info">
                  <img className="iconInfo" src="/iconInfo.png" alt="iconInfo"/> 
                  <div className="detailsInfo">
                    <ul>
                      <li>Credit card validity can not be empty</li>
                      <li>Credit card validity must be min 4 characters</li>
                      <li>Credit card validity must be only numbers</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="reserveInput">
                <input type="text" name="CVV" placeholder="Enter your creditCard CVV" />
                <div className="info">
                  <img className="iconInfo" src="/iconInfo.png" alt="iconInfo"/> 
                  <div className="detailsInfo">
                    <ul>
                      <li>Credit card CVV can not be empty</li>
                      <li>Credit card CVV must be 3 characters</li>
                      <li>Credit card CVV must be only numbers</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="reserveInput">
                <input type="text" name="idNumber" placeholder="Enter your id" />
                <div className="info">
                  <img className="iconInfo" src="/iconInfo.png" alt="iconInfo"/> 
                  <div className="detailsInfo">
                    <ul>
                      <li>ID number can not be empty</li>
                      <li>ID number must be 9 characters</li>
                      <li>ID number must be only numbers</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>

            <button type="submit">Send</button>
          </form>
          <div>
            <h2>Items</h2>
              {userCart.map((item, index) => {
                return (
                  <div ref={elRefs[index]} key={index}>
                    {item.name}
                      </div>
                )
              })}
          </div>
          <div>
            <h2>Amount: </h2>
            <p ref={amountRef}>{userCart.length}</p>
          </div>
          <div>
            <h2>Total for Pay:</h2>
            <p ref={totalPayRef}>{totalPay}</p>
          </div>
        </div>
    )
}

export default ReservPage;