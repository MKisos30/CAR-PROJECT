import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const searchCar = createAsyncThunk('search/searchCar', async ({ name }) => {
    try {
        const { data } = await axios.get(`/product/search/${name}`)
        console.log(data)
        const { error } = data
        if (error) throw new Error(error)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        value: {},
        status: 'edle', //'edle'| 'loading' | 'succses' | 'failed',
        error: null
    },
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(searchCar.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(searchCar.fulfilled, (state, action) => {
                state.status = 'succses'
                state.value = action.payload
            })
            .addCase(searchCar.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.messasge
            })
    }
})

export const searchState = (state) => state.search.value
export const searchStatus = (state) => state.search.status

export default searchSlice.reducer