import { createSlice } from "@reduxjs/toolkit"

interface InitialState {
  data: any[]
}

const initialState: InitialState = {
  data: [
    {
      id: 1,
      name: "ali",
    },
    {
      id: 2,
      name: "vali",
    },
    {
      id: 3,
      name: "mahmadali",
    },
  ],
}
export const counterSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    
  },
})

export const {} = counterSlice.actions
export default counterSlice.reducer
