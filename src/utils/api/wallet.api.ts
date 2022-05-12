import { AxiosInstance } from 'axios'
import api from './axios'

class WalletApi {
  constructor(private readonly requestService: AxiosInstance) {}

  async getWallets({ limit, page }: { limit: number; page: number }) {
    return this.requestService.get(`/wallet?limit=${limit}&page=${page}`)
  }

  async getWallet(id: string) {
    return await this.requestService.get(`/wallet/${id}`)
  }

  async updateWallet(data: any, id: string) {
    return this.requestService.patch(`/wallet/${id}`, data)
  }
}

const WalletApiService = new WalletApi(api)

export default WalletApiService
