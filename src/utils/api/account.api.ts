import { AxiosInstance } from 'axios'
import api from './axios'

class AccountApi {
  constructor(private readonly requestSerrvice: AxiosInstance) {}

  async getAccounts() {
    return this.requestSerrvice.get('/account')
  }

  async deleteAccount(id: string) {
    return this.requestSerrvice.delete(`/account/${id}`)
  }

  async createAccount(data: any) {
    return this.requestSerrvice.post('/account', data)
  }

  async editAccount(id: string, data: any) {
    return this.requestSerrvice.patch(`/account/${id}`, data)
  }
}

const AccountApiService = new AccountApi(api)

export default AccountApiService
