import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getByCategoryCars = createAsyncThunk('car/getCars', async ({category}) => {
    try {
        const {data} = await axios.get(`/product/get-by-category?type=${category}`)
        
        const {error} = data
        if (error) throw new Error(error)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const carSlice = createSlice({
    name: 'car',
    initialState: {
        value: [], 
        status: 'edle',
        error: null 
    },
    reducers: {

    }, 
    extraReducers:(builder) => {
        builder
            .addCase(getByCategoryCars.pending, (state)=> {
                state.status = 'loading'
            })
            .addCase(getByCategoryCars.fulfilled, (state, action)=>{
                state.status = 'succses'
                state.value = action.payload //[...state.value, action.payload] //[{[],[],[]},{[],[],[]}] //arr[-1]
            })
            .addCase(getByCategoryCars.rejected, (state, action)=>{
                state.status = 'failed'
                state.error = action.error.messasge
            })
    }
})

export const carState = (state) => state.car.value;
export const carStatus = (state) => state.car.status

export default carSlice.reducer