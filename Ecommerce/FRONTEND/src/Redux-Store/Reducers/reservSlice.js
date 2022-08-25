import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const sendReservDetails = createAsyncThunk('user/sendReservDetails', async ({name, adress, phoneNumber, creditCardNumber, creditCardValidity, cvv, idNumber, amout, totalPrice, namesOfCars}) => {
    try {
        const {data} = await axios.post('/reserve/save-reserve', {name, adress, phoneNumber, creditCardNumber, creditCardValidity, cvv, idNumber, amout, totalPrice, namesOfCars})
  
        const {error} = data
        if (error) throw new Error(error)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const reserveSlice = createSlice({
    name: 'reserve',
    initialState: {
        value: [], 
        status: 'edle', //'edle'| 'loading' | 'succses' | 'failed',
        error: null 
    },
    reducers: {

    }, 
    extraReducers:(builder) => {
        builder
            .addCase(sendReservDetails.pending, (state)=> {
                state.status = 'loading'
            })
            .addCase(sendReservDetails.fulfilled, (state, action)=>{
                state.status = 'succses'
                state.value = action.payload
            })
            .addCase(sendReservDetails.rejected, (state, action)=>{
                state.status = 'failed'
                state.error = action.error.messasge
            })
    }
})

export const reserveState = (state)=>state.reserve.value;
export const reserveStatus = (state) =>state.reserve.status

export default reserveSlice.reducer