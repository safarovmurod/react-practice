import { configureStore } from '@reduxjs/toolkit'
import  counterSlice  from "./couterSlice"

export const store = configureStore({
  reducer: {
    data:counterSlice
  }
})