import axios, { type AxiosInstance } from 'axios'
import { AuthResponse } from 'src/types/auth.type'
import { getAccessTokenFromLS, saveAcessTokenToLS } from './auth'
import { clearAcessTokenToLS } from './auth'
class Http {
  instance: AxiosInstance
  private accessToken?: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: 'http://localhost:8080',
      timeout: 1000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use((response) => {
      const { url } = response.config
      if (url === '/signup' || url === '/signin') {
        this.accessToken = (response.data as AuthResponse).data?.token
        saveAcessTokenToLS(this.accessToken as string)
      } else if (url === '/logout') {
        this.accessToken = ''
        clearAcessTokenToLS()
      }
      return response
    })
  }
}



const http = new Http().instance

export default http
