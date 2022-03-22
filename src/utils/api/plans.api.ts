import { AxiosInstance } from 'axios'
import api from './axios'

class PlansApi {
  constructor(private readonly requestService: AxiosInstance) {}

  async getPlans() {
    return this.requestService.get(`/plans`)
  }

  async addPlan(data: any) {
    return this.requestService.post(`/plans`, data)
  }

  async deletePlan(id: string) {
    return this.requestService.delete(`/plans/${id}`)
  }

  async updatePlan(id: string, data: any) {
    return this.requestService.patch(`/plans/${id}`, data)
  }
}

const PlansApiService = new PlansApi(api)

export default PlansApiService
