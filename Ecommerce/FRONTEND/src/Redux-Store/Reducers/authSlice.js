import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getUserLogIn = createAsyncThunk('auth/getUserLogIn', async ({ mail, password }) => {
    try {
        const { data } = await axios.post('/user/login', { mail, password })

        console.log(data)
        const { error } = data
        if (error) throw new Error(error)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const getUserRegister = createAsyncThunk('auth/getUserRegister', async ({ name, mail, password, confirmPass }) => {
    try {
        const { data } = await axios.post("/user/register", { name, mail, password, confirmPass })

        const { error } = data
        if (error) throw new Error(error)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const userLogout = createAsyncThunk('cookie/removeUserRole', async () => {
    try {
        const { data } = await axios.get('/user/logout')
        console.log(data)
        const { error } = data
        if (error) throw new Error(error)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const authSlice = createSlice({
    name: 'authLogin',
    initialState: {
        value: [],
        status: 'idle', //'edle'| 'loading' | 'succses' | 'failed',
        error: null
    },
    reducers: {
        authStatusChange: (state) => {
            state.status = "idle"
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserLogIn.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getUserLogIn.fulfilled, (state, action) => {
                state.status = 'succses'
                state.value = action.payload
            })
            .addCase(getUserLogIn.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.messasge
            })
            .addCase(getUserRegister.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getUserRegister.fulfilled, (state, action) => {
                state.status = 'succses'
                state.value = action.payload
            })
            .addCase(getUserRegister.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.messasge
            })
            .addCase(userLogout.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(userLogout.fulfilled, (state, action) => {
                state.status = 'succses'
                state.value = action.payload
            })
            .addCase(userLogout.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.messasge
            })
    }
})

export const authState = (state) => state.auth.value;
export const authStatus = (state) => state.auth.status

export const { authStatusChange } = authSlice.actions
export default authSlice.reducer