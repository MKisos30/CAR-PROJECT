import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getCart = createAsyncThunk('user/getCart', async () => {
    try {
        const {data} = await axios.get('/user/getUserCart')
        
        const {error} = data
        if (error) throw new Error(error) 
        return data
    } catch (error) {
        console.log(error)
    }
})

export const carDetails = createAsyncThunk('user/getCarDetails', async ({carId}) => {
    try {
        const {data} = await axios.post('/user/addToCart', {carId})

        const {error} = data
        if (error) throw new Error(error) 
        return data
    } catch (error) {
        console.log(error)
    }
})

export const deleteItemFromCart = createAsyncThunk('user/getDeleteItemFromCart', async ({carId}) => {
    try {
        const {data} = await axios.get(`/user/removeFromCart?carId=${carId}`) 

        const {error} = data
        if (error) throw new Error(error) 
        return data
    } catch (error) {
        console.log(error)
    }
})

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        value: [], 
        status: 'edle', //'edle'| 'loading' | 'succses' | 'failed',
        error: null 
    },
    reducers: {

    }, 
    extraReducers:(builder) => {
        builder
            .addCase(getCart.pending, (state)=> {
                state.status = 'loading'
            })
            .addCase(getCart.fulfilled, (state, action)=>{
                state.status = 'succses'
                state.value = action.payload 
            })
            .addCase(getCart.rejected, (state, action)=>{
                state.status = 'failed'
                state.error = action.error.messasge
            })
            .addCase(carDetails.pending, (state)=> {
                state.status = 'loading'
            })
            .addCase(carDetails.fulfilled, (state, action)=>{
                state.status = 'succses'
                state.value = [...state.value, action.payload]
            })
            .addCase(carDetails.rejected, (state, action)=>{
                state.status = 'failed'
                state.error = action.error.messasge
            })
            .addCase(deleteItemFromCart.pending, (state)=> {
                state.status = 'loading'
            })
            .addCase(deleteItemFromCart.fulfilled, (state, action)=>{
                state.status = 'succses'
                state.value = action.payload 
            })
            .addCase(deleteItemFromCart.rejected, (state, action)=>{
                state.status = 'failed'
                state.error = action.error.messasge
            })
    }
})

export const cartState = (state)=>state.cart.value
export const cartStatus = (state) =>state.cart.status

export default cartSlice.reducer