import axios, { AxiosInstance } from 'axios'
import api from './axios'

class NftApi {
  constructor(private readonly requestSerrvice: AxiosInstance) {}

  async getCollections({ limit, page }: { limit: number; page: number }) {
    return this.requestSerrvice.get(`/nft?limit=${limit}&page=${page}`)
  }

  async createCollection(data: any) {
    return this.requestSerrvice.post('/nft', data)
  }

  async createAsset(collectionId: string, data: any) {
    return this.requestSerrvice.post(`/nft/${collectionId}/asset`, data)
  }

  async deleteAsset(collection: string, asset: string) {
    return this.requestSerrvice.delete(`/nft/${collection}/asset/${asset}`)
  }

  async updateAsset(collection: string, asset: string, data: any) {
    return this.requestSerrvice.patch(`/nft/${collection}/asset/${asset}`, data)
  }

  async validate(name: string) {
    return axios.get(
      `https://api.opensea.io/api/v1/collection/${name}?format=json`,
    )
  }
}

const NftApiService = new NftApi(api)

export default NftApiService
