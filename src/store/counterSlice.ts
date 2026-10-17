import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, type initialState } from "../data/api";
import axios from "axios";



export const getData = createAsyncThunk("data/getData",async()=>{
  try {
      const {data} = await axios.get(api)
      return data
  } catch (error) {
    console.error(error);
  }
})

export const DeleteData = createAsyncThunk('data/DeleteData',async(id,{dispatch})=>{
  try {
     await axios.delete(`${api}/${id}`)
      dispatch(getData())
  } catch (error) {
    console.error(error);
    
  }
})

export  const EditData = createAsyncThunk('data/EditData',async(user,{dispatch})=>{
            try {
              await axios.put(`${api}/${user.id}`,user)
              dispatch(getData())
            } catch (error) {
              console.error(error);
              
            }
})

export  const AddData = createAsyncThunk('data/AddData',async(user,{dispatch})=>{
  try {
     await axios.post(api,user)
     dispatch(getData())
  } catch (error) {
    console.error(error);
    
  }
})

const initialState:initialState={
  data:[],
  loading:false,
  error:[]
}


export const counterSlice = createSlice({
  name:'data',
  initialState,
  reducers:{
      
  },
  extraReducers:(builder)=>{
    builder.addCase(getData.pending,(state)=>{
      state.loading = true
    }).addCase(getData.fulfilled,(state,action)=>{
         state.loading = false
         state.data=action.payload
    }).addCase(getData.rejected,(state)=>{
      state.loading=false
    })
  }
})


export default counterSlice.reducer