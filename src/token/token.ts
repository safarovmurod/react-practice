import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL?.trim().replace(/\/$/, "")

export const axiosRequest = axios.create({
  baseURL: apiUrl,
})

export const saveToken = (token: string, refresh: string) => {
  localStorage.setItem("token", token)
  localStorage.setItem("refresh", refresh)
}

axiosRequest.interceptors.request.use((config) => {
  if (!apiUrl) {
    throw new Error("VITE_API_URL танзим нашудааст. Суроғаи backend-ро дар environment-и Vercel илова карда, Redeploy кун.")
  }
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const removeToken = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("refresh")
}

axiosRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const refreshToken = localStorage.getItem("refresh")
    const isAuthRequest = error.config?.url?.startsWith("/api/auth/")
    if (error.response?.status === 401 && error.config && !isAuthRequest && refreshToken && !error.config.retry) {
      error.config.retry = true
      try {
        const { data } = await axios.post(`${apiUrl}/api/auth/refresh`, {
          refreshToken,
        })
        saveToken(data.accessToken, data.refreshToken)
        error.config.headers["Authorization"] = `Bearer ${data.accessToken}`
        return axiosRequest(error.config)
      } catch {
        removeToken()
        window.location.href = "/login"
      }
    }
    return Promise.reject(error)
  }
)

