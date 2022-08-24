import { configureStore } from '@reduxjs/toolkit';
import carReducer from './Reducers/carSlice';
import carOneReducer from './Reducers/carOneSlice';
import cartReducer from './Reducers/cartSlice'
import orderReducer from './Reducers/orderSlice'
import updateReducer from './Reducers/updateSlice'
import authReducer from './Reducers/authSlice'
import cookieReducer from './Reducers/cookieSlice';
import userReducer from './Reducers/userSlice';
import reserveReducer from './Reducers/reservSlice';
import listCarReducer from './Reducers/editCarSlice';
import searchReducer from './Reducers/searchSlice';

export default configureStore({
  reducer: {
    car: carReducer,
    oneCar: carOneReducer,
    cart: cartReducer,
    order: orderReducer,
    update: updateReducer,
    auth: authReducer,
    cookie: cookieReducer,
    user: userReducer,
    reserve: reserveReducer,
    listCar: listCarReducer,
    search: searchReducer
  },
})