import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { api } from "../data/api"

const initialState = {
  data: [],
  isloading: false,
}


export const getData = createAsyncThunk("name/getData", async () => {
  try {
    const { data } = await axios.get(api)
    return data
  } catch (error) {
    console.error(error)
  }
})
export const deleteData = createAsyncThunk("name/deleteData", async (id,{dispatch}) => {
  try {
     await axios.delete(`${api}/${id}`)
    dispatch(getData())
  } catch (error) {
    console.error(error)
  }
})
export const addData = createAsyncThunk("name/addData", async (user,{dispatch}) => {
  try {
     await axios.post(api,user)
    dispatch(getData())
  } catch (error) {
    console.error(error)
  }
})






export const counterSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getData.pending,(state)=>{
        state.isloading=false
    }).addCase(getData.fulfilled,(state,{payload})=>{
        state.data = payload
         state.isloading=true
    })
  },
})

export default counterSlice.reducer
