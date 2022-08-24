import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { orderState, getOrderDetail } from '../Redux-Store/Reducers/orderSlice'

const OrderDetail = () => {

  const order = useSelector()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrderDetail())

  }, [])


  return (
    <div>
      {order.map(item => {
        return (
          <div key={item._id}>
            <h2>Order number: {item._id}</h2>
            <p>Name: {item.name}</p>
            <p>Total Pay:{item.totalPay}</p>
            <p>Total amount: {item.amout}</p>
            <p>Total amount: {item.adress}</p>
            <p>Credit card: ****{item.creditCardNumber.slice(-4)}</p>
            <div>
              <h3>Namesx of cars:</h3>
              <ul>
                {item.namesOfCars.map((i, index) => {
                  return (
                    <li key={index}>{i}</li>
                  )
                })}
              </ul>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default OrderDetail