import { baseURL } from './axios'
import axios from 'axios'

class SettingsApi {
  constructor(private readonly baseUrl: string) {}

  async getPlans() {
    return axios.get(`${this.baseUrl}/plans`)
  }

  async getAccounts() {
    return axios.get(`${this.baseUrl}/account`)
  }
}

const SettingsApiService = new SettingsApi(baseURL)

export default SettingsApiService
