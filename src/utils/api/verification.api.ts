import { AxiosInstance } from 'axios'
import api from './axios'

class VerificationApi {
  constructor(private readonly requestService: AxiosInstance) {}

  async verify(data: {
    firstName: string
    lastName: string
    citizenship: string
    gender: string
    dob: {
      day: number
      month: string
      year: number
    }
  }) {
    return this.requestService.post('/verification', data)
  }

  async getVerificationRequests({
    limit,
    page,
  }: {
    limit: number
    page: number
  }) {
    return this.requestService.get(`/verification?limit=${limit}&page=${page}`)
  }

  async getVerificationRequest(id: string) {
    return this.requestService.get(`/verification/${id}`)
  }

  async deleteVerificationRequest(id: string) {
    return this.requestService.delete(`/verification/${id}`)
  }
}

const VerificationApiService = new VerificationApi(api)

export default VerificationApiService
