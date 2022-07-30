// encapsulate axios
import axios from "axios"
import { getToken } from "./token"

const http = axios.create({
  // baseURL: "http://localhost:8080",
  timeout: 5000,
})

// add request interceptor
http.interceptors.request.use(
  (config) => {
    // if login set token as requst header
    const token = getToken()
    if (token) {
      config.headers.authorization = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)


export { http }