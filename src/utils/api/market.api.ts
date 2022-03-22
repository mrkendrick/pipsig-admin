import axios, { AxiosInstance } from 'axios'

const baseURL = 'https://api.coingecko.com/api/v3'

const defaultConfig = {
  baseURL,
  timeout: 60000,
}

const api = axios.create({ ...defaultConfig })

class MarketApi {
  constructor(private readonly requestService: AxiosInstance) {}

  async getMarket(currency: string) {
    return this.requestService.get(
      `/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=50&page=1&sparkline=false`,
    )
  }
}

const MarketApiService = new MarketApi(api)

export default MarketApiService
