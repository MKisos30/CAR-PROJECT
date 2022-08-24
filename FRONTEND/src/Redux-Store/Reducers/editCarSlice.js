import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const deleteCar = createAsyncThunk('car/deleteCar', async ({ id }) => {
    try {
        const { data } = await axios.delete('/product/delete-product', { data: { id } })

        const { error } = data
        if (error) throw new Error(error)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const editCarDetails = createAsyncThunk('car/editCarDetails', async ({ id }) => {
    try {
        const { data } = await axios.get(`/product/get-by-car?id=${id}`)

        const { error } = data
        if (error) throw new Error(error)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const listCartSlice = createSlice({
    name: 'listCar',
    initialState: {
        value: [],
        status: 'edle', //'edle'| 'loading' | 'succses' | 'failed',
        error: null
    },
    reducers: {
        editStatusChange: (state) => {
            state.status = "idle"
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(deleteCar.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(deleteCar.fulfilled, (state, action) => {
                state.status = 'succses'
                state.value = action.payload //[...state.value, action.payload] //[{[],[],[]},{[],[],[]}] //arr[-1]
            })
            .addCase(deleteCar.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.messasge
            })
            .addCase(editCarDetails.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(editCarDetails.fulfilled, (state, action) => {
                state.status = 'succses'
                state.value = action.payload //[...state.value, action.payload] //[{[],[],[]},{[],[],[]}] //arr[-1]
            })
            .addCase(editCarDetails.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.messasge
            })
    }
})

export const listCarState = (state) => state.listCar.value
export const listCarStatus = (state) => state.listCar.status

export const { editStatusChange } = listCartSlice.actions
export default listCartSlice.reducer