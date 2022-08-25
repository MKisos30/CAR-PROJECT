import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getOneCar = createAsyncThunk('oneCar/getOneCar', async ({ id }) => {
    try {
        const { data } = await axios.get(`/product/get-by-car?id=${id}`)

        const { error } = data
        if (error) throw new Error(error)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const carOneSlice = createSlice({
    name: 'oneCar',
    initialState: {
        value: [],
        status: 'edle', //'edle'| 'loading' | 'succses' | 'failed',
        error: null
    },
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(getOneCar.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getOneCar.fulfilled, (state, action) => {
                state.status = 'succses'
                state.value = action.payload
            })
            .addCase(getOneCar.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.messasge
            })
    }
})

export const oneCarState = (state) => state.oneCar.value
export const oneCarStatus = (state) => state.oneCar.status

export default carOneSlice.reducer