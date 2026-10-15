import axios from "axios"
import { create } from "zustand"
const api = ''
export const useTodoStore = create((set, get) => ({
  data: [],
  isLoading: false,
  infoUser: null,


   getData: async () => {
    set({ isLoading: true })
    const { data } = await axios.get(api)
    set({ data: data.data, isLoading: false })
  },
  addData: async (user) => {
    try {
      await axios.post(api, user)
      get().getData()
    } catch (error) {
      console.error(error)
    }
  },
}))
