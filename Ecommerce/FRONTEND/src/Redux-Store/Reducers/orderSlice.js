import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getOrderDetail = createAsyncThunk('cart/getOrderDetail', async () => {
    try {
        const {data} = await axios.get('/user/getUserReserve')

        const {error} = data
        if (error) throw new Error(error)
    } catch (error) {
        console.log(error)
    }
})

export const orderSlice = createSlice({
    name: 'cartDetails',
    initialState: {
        value: [],
        status: 'edle',
        error: null
    },
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(getOrderDetail.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getOrderDetail.fulfilled, (state, action) => {
                state.status = 'succes'
                state.value = action.payload //[...state.value, action.payload] //[{[],[],[]},{[],[],[]}] //arr[-1]
            })
            .addCase(getOrderDetail.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const orderState = (state) => state.order.value
export const orderStatus = (state) => state.order.status

export default orderSlice.reducer