import { configureStore, createSlice } from "@reduxjs/toolkit";
import  useSlice  from "./createSlice";

export const store = configureStore({
    reducer:{
        data:useSlice
    }
})