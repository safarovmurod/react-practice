import { createSlice } from "@reduxjs/toolkit";
interface User{
    id:number,
    name:string,
    age:number,
}
interface initialvalue{
   data:User[]
}
const initialstate:initialvalue={
      data:[
        {
           id:1,
            name:'ali',
            age:21
        }, 
        {
           id:2,
            name:'vali',
            age:41
        }, 
        {
           id:3,
            name:'saidali',
            age:81
        }, 
    ]
}
export const useSlice =createSlice({
    name:"data",
    initialState:initialstate,
    reducers:{
    AddUserR:(state,{payload})=>{
        state.data= [payload,...state.data]
    },
    EditUserR:(state,{payload})=>{
        state.data =state.data.map((el)=>el.id===payload.id?payload:el)
    },
    DeleteUserR:(state,{payload})=>{
        state.data=state.data.filter((el)=>el.id!==payload)
    }
    }
})

export const {AddUserR,EditUserR,DeleteUserR} = useSlice.actions

export default useSlice.reducer
