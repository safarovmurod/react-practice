import { createSlice } from "@reduxjs/toolkit"

interface initialvalue {
  data: User[]
}
export interface User {
  name: string
  age: number
  id: number
  status: boolean
  image: string
}
let initialvalue: initialvalue = {
  data: [
    {
      id: 1,
      name: "Ali",
      age: 22,
      status: true,
      image: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      name: "Umar",
      age: 25,
      status: false,
      image: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 3,
      name: "Faridun",
      age: 19,
      status: true,
      image: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: 4,
      name: "Samir",
      age: 28,
      status: false,
      image: "https://i.pravatar.cc/150?img=4",
    },
    {
      id: 5,
      name: "Dilshod",
      age: 24,
      status: true,
      image: "https://i.pravatar.cc/150?img=5",
    },
  ],
}

export const counterSlice = createSlice({
  name: "couter",
  initialState: initialvalue,
  reducers: {
    deleteUser: (state, { payload }) => {
      state.data = state.data.filter((el) => el.id !== payload)
    },
    AddUser: (state, { payload }) => {
      state.data = [payload, ...state.data]
    },
    EditUser: (state, { payload }) => {
      state.data = state.data.map((el) => (el.id === payload.id ? payload : el))
    },
  },
})
export const { AddUser, deleteUser, EditUser } = counterSlice.actions
export default counterSlice.reducer
