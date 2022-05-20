import axios from 'axios'
import HelperServices from '../helpers'

export const baseURL = 'https://api.pipsignal.org/api/v1'

const defaultConfig = {
  baseURL,
  timeout: 60000,
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
}

const api = axios.create({ ...defaultConfig })

api.interceptors.request.use(
  config => {
    const token =
      HelperServices.cookies({ method: 'get' }) ||
      HelperServices.session({ method: 'get' })

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }

    return config
  },
  err => Promise.reject(err),
)

export default api
