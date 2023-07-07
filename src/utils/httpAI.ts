import axios, { AxiosInstance } from 'axios'

class HttpAI {
  instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:5000',
      timeout: 1000,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
const httpAi = new HttpAI().instance
export default httpAi
