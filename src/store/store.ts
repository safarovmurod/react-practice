import { configureStore } from "@reduxjs/toolkit"
import counterSlice from "./CounterSlice"

export const store = configureStore({
  reducer: {
    data: counterSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
