import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserRole = createAsyncThunk('cookie/getUserRole', async () => {
    try {
        const { data } = await axios.get('/user/get-role')

        const { error } = data
        if (error) throw new Error(error)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const userRoleSlice = createSlice({
    name: 'cookie',
    initialState: {
        value: {},
        status: 'edle',
        error: null
    },
    reducers: {
        getStatusAuthIdle: (state) => {
            state.status = "idle"
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserRole.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getUserRole.fulfilled, (state, action) => {
                state.status = 'succses'
                state.value = action.payload
            })
            .addCase(getUserRole.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { getStatusAuthIdle } = userRoleSlice.actions

export const cookieState = (state) => state.cookie.value
export const cookieStatus = (state) => state.cookie.status

export default userRoleSlice.reducer