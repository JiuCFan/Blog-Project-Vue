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

// add response interceptor
http.interceptors.response.use(
  (response) => {
    // All status codes in the 2xx range will trigger this function.
    // do something with the response data
    return response
  },
  (error) => {
    console.log(error.response)
    if (error.response.status == 403) {
      /*   message.error('请先登录')
        console.log(router)
        console.log(route)
        // router.push('/login') */
    }
    // Status codes outside the 2xx range will trigger this function.
    // do something with the response error
    return Promise.reject(error)
  }
)


export { http }