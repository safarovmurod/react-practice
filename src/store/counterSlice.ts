import { createSlice } from "@reduxjs/toolkit"

interface User {
  id: number
  name: string
  age: number
  status: boolean
}
interface initialStatevalue {
  data: User[]
  select: string
  search: string
}
const initialState: initialStatevalue = {
  data: [
    {
      id: 1,
      name: "ali",
      age: 23,
      status: false,
    },
    {
      id: 2,
      name: "vali",
      age: 21,
      status: true,
    },
    {
      id: 3,
      name: "saidali",
      age: 29,
      status: false,
    },
  ],
 select:'all',
 search:''
}

export const counterSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    DeleteUserR: (state, { payload }) => {
      state.data = state.data.filter((el) => el.id !== payload)
    },
    AddUserR: (state, { payload }) => {
      state.data = [...state.data, payload]
    },
    EditUserR: (state, { payload }) => {
      state.data = state.data.map((el) => (el.id == payload.id ? payload : el))
    },
    SelectUserR: (state, { payload }) => {
      state.select = payload
    },
    SearchUserR: (state, { payload }) => {
      state.search = payload
    },
  },
  selectors: {
    selectorsResult: (state) => {
      return state.data
        .filter((el) => {
          if (state.select === "online") return el.status === true
          if (state.select === "offline") return el.status === false
          return true
        })
        .filter((el) => {
          if (!state.search.trim()) return true
          return el.name.toLowerCase().includes(state.search.toLowerCase().trim())
        })
    },
  },
})

export const { DeleteUserR, AddUserR, EditUserR, SelectUserR, SearchUserR} = counterSlice.actions
export const { selectorsResult } = counterSlice.selectors
export default counterSlice.reducer
