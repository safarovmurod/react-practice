import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { api } from "../data/api"
import type { InitialState, NewUser, User, UserId } from "../component/types"

export const getUsers = createAsyncThunk("data/getUsers", async () => {
  try {
    const { data } = await axios.get<User[]>(api)
    return data
  } catch (error) {
    console.error(error)
  }
})

export const getUserById = createAsyncThunk(
  "data/getUserById",
  async (id: UserId) => {
    try {
      const { data } = await axios.get<User>(`${api}/${id}`)
      return data
    } catch (error) {
      console.error(error)
    }
  }
)

export const addUser = createAsyncThunk(
  "data/addUser",
  async (newUser: NewUser, { dispatch }) => {
    try {
      const { data } = await axios.post<User>(api, newUser)
      await dispatch(getUsers())
      return data
    } catch (error) {
      console.error(error)
    }
  }
)

export const editUser = createAsyncThunk(
  "data/editUser",
  async (user: User, { dispatch }) => {
    try {
      const { data } = await axios.put<User>(`${api}/${user.id}`, user)
      await dispatch(getUsers())
      return data
    } catch (error) {
      console.error(error)
    }
  }
)

export const deleteUser = createAsyncThunk(
  "data/deleteUser",
  async (id: UserId, { dispatch }) => {
    try {
      await axios.delete(`${api}/${id}`)
      await dispatch(getUsers())
      return id
    } catch (error) {
      console.error(error)
    }
  }
)

export const toggleCompleted = createAsyncThunk(
  "data/toggleCompleted",
  async (
    { id, isCompleted }: { id: UserId; isCompleted: boolean },
    { dispatch }
  ) => {
    try {
      await axios.patch(`${api}/${id}`, { isCompleted })
      await dispatch(getUsers())
      return id
    } catch (error) {
      console.error(error)
    }
  }
)

const initialState: InitialState = {
  data: [],
  infoUser: null,
  loading: false,
  infoLoading: false,
  error: null,
  infoError: null,
  search: "",
  page: 1,
  pageSize: 2,
}

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setSearch: (state, action: { payload: string }) => {
      state.search = action.payload
      state.page = 1
    },
    setPage: (state, action: { payload: number }) => {
      state.page = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload ?? []
        const matching = state.data.filter((user) =>
          user.name.toLowerCase().includes(state.search.toLowerCase())
        )
        const lastPage = Math.max(1, Math.ceil(matching.length / state.pageSize))
        state.page = Math.min(state.page, lastPage)
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Request failed"
      })
      .addCase(getUserById.pending, (state) => {
        state.infoLoading = true
        state.infoError = null
        state.infoUser = null
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.infoLoading = false
        state.infoUser = action.payload ?? null
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.infoLoading = false
        state.infoError = action.error.message || "Request failed"
      })
  },
})

export const { setSearch, setPage } = dataSlice.actions
export default dataSlice.reducer
