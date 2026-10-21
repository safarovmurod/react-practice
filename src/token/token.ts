import axios from "axios";
// 2
export const axiosReques=axios.create({
   baseURL: import.meta.env.VITE_API
})
// 3
export const savetoken = (token,refresh)=>{
   localStorage.setItem('token',token)
   localStorage.setItem('refresh',refresh)
}
// 4
export const getToken=()=>{
   return localStorage.getItem('token')
}
// 5
axiosReques.interceptors.request.use(
   (config)=>{
      const token = getToken()
      if (token) {
         config.headers['Authorization']=`Bearer ${token}`
      }
      return config
   }
)
