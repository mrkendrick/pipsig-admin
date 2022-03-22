import { AxiosInstance } from 'axios'
import api from './axios'

class UsersApi {
  constructor(private readonly requestService: AxiosInstance) {}

  async getUsers({ limit, page }: { limit: number; page: number }) {
    return this.requestService.get(`/user?limit=${limit}&page=${page}`)
  }

  async updateUser(id: string, data: any) {
    return this.requestService.patch(`/user/${id}`, data)
  }
}

const UsersApiService = new UsersApi(api)

export default UsersApiService
