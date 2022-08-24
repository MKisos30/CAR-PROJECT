import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getUserFromCookie = createAsyncThunk('user/getUserFromCookie', async () => {
    try {
        const {data} = await axios.get("/user/getUserData")

        const {error} = data
        if (error) throw new Error(error)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: [], 
        status: 'edle', //'edle'| 'loading' | 'succses' | 'failed',
        error: null 
    },
    reducers: {

    }, 
    extraReducers:(builder) => {
        builder
            .addCase(getUserFromCookie.pending, (state)=> {
                state.status = 'loading'
            })
            .addCase(getUserFromCookie.fulfilled, (state, action)=>{
                state.status = 'succses'
                state.value = action.payload
            })
            .addCase(getUserFromCookie.rejected, (state, action)=>{
                state.status = 'failed'
                state.error = action.error.messasge
            })
    }
})

export const userState = (state) => state.user.value;
export const userStatus = (state) => state.user.status

export default userSlice.reducer