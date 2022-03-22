import { AxiosInstance } from 'axios'
import api from './axios'

class OrdersApi {
  constructor(private readonly requestService: AxiosInstance) {}

  async createOrder(data: any) {
    return this.requestService.post('/orders', data)
  }

  async getOrders({ limit, page }: { limit: number; page: number }) {
    return this.requestService.get(`/orders?limit=${limit}&page=${page}`)
  }

  async getOrder(id: string) {
    return this.requestService.get(`/orders/${id}`)
  }

  async updateOrder(id: string, data: any) {
    return this.requestService.patch(`/orders/${id}`, data)
  }
}

const OrdersApiService = new OrdersApi(api)

export default OrdersApiService
