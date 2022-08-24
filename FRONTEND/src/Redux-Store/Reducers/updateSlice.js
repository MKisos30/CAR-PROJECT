import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getUpdateProduct = createAsyncThunk('car/getUpdateProduct', async () => {
    try {
        const {data} = await axios.get(`/product/all-produtc`)
        
        const {error} = data
        if (error) throw new Error(error)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const updateCarItem = createAsyncThunk('car/updateCarItem', async ({id, type, name, price, color, engineCapacity, folder, img}) => {
    try {
        const {data} = await axios.post('/product/edit-product', {id,type, name, price, color, engineCapacity, folder, img})
        
        const {error} = data
        if (error) throw new Error(error)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const addNewProduct = createAsyncThunk('car/addNewProduct', async ({name, type, color, price, engineCapacity,img, folder}) => {
    try {
        const {data} = await axios.post('/product/save-product', {name, type, color, price, engineCapacity,img, folder})
        
        const {error} = data
        if (error) throw new Error(error)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const updateSlice = createSlice({
    name: 'update',
    initialState: {
        value: [], 
        status: 'edle', //'edle'| 'loading' | 'succses' | 'failed',
        error: null 
    },
    reducers: {

    }, 
    extraReducers:(builder) => {
        builder
            .addCase(getUpdateProduct.pending, (state)=> {
                state.status = 'loading'
            })
            .addCase(getUpdateProduct.fulfilled, (state, action)=>{
                state.status = 'succses'
                state.value = action.payload 
            })
            .addCase(getUpdateProduct.rejected, (state, action)=>{
                state.status = 'failed'
                state.error = action.error.messasge
            })
            .addCase(updateCarItem.pending, (state)=> {
                state.status = 'loading'
            })
            .addCase(updateCarItem.fulfilled, (state, action)=>{
                state.status = 'succses'
                state.value = action.payload 
            })
            .addCase(updateCarItem.rejected, (state, action)=>{
                state.status = 'failed'
                state.error = action.error.messasge
            })
            .addCase(addNewProduct.pending, (state)=> {
                state.status = 'loading'
            })
            .addCase(addNewProduct.fulfilled, (state, action)=>{
                state.status = 'succses'
                state.value = action.payload 
            })
            .addCase(addNewProduct.rejected, (state, action)=>{
                state.status = 'failed'
                state.error = action.error.messasge
            })
    }
})

export const updateState = (state)=>state.update.value;
export const updateStatus = (state) =>state.update.status

export default updateSlice.reducer