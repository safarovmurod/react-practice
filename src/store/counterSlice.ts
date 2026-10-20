import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiRedax } from "../data/apiRedax";

interface User{
   id:number
   name:string
   job:string
}
interface initialState{
   data:User[]
   isloading:boolean
   error:unknown
}
const initialState = {
   data:[],
   isloading:false,
   error:null
}
//get
export const getData=createAsyncThunk('data/getData',async(params?:any)=>{

   try {
      const {data} = await axios.get(apiRedax, {
         params: {
            name: params?.search || undefined,
            page: params?.page,
            limit: params?.limit
         }
      })
      return data
   } catch (error) {
      console.error(error);
   }
})
// delete
export const deleteRedax=createAsyncThunk('data/deleteRedax',async(id,{dispatch})=>{

   try {
      await axios.delete(`${apiRedax}/${id}`)
      dispatch(getData())
   } catch (error) {
      console.error(error);
   }
})
// add 
export const addRedax = createAsyncThunk('data/addRedax',async(user,{dispatch})=>{
   try {
       await axios.post(apiRedax,user)
       dispatch(getData())
   } catch (error) {
      console.error(error);
   }
})
//edit
export let editUser = createAsyncThunk('data/editUser', async (user, { dispatch }) => {
    try {
        await axios.put(`${apiRedax}/${user.id}`, user)
        dispatch(getData())
    } catch (error) {
        console.log(error);

    }
})
//slice
export default createSlice({
   name: "data",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getData.pending, (state) => {
            state.isloading = true;
         })
         .addCase(getData.fulfilled, (state, { payload }) => {
            state.isloading = false;
            state.data = payload;
         })
         .addCase(getData.rejected, (state, { paylaod }) => {
            state.isloading = false;
            state.data = paylaod;
         });
   }
});

