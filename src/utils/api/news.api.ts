import { AxiosInstance } from 'axios'
import api from './axios'

class NewsApi {
  constructor(private readonly requestService: AxiosInstance) {}

  async getNews({ limit, page }: { limit: number; page: number }) {
    return this.requestService.get(`/news?limit=${limit}&page=${page}`)
  }

  async createNews(data: any) {
    return this.requestService.post('/news', data)
  }

  async deleteNews(id: string) {
    return this.requestService.delete(`/news/${id}`)
  }
}

const NewsApiService = new NewsApi(api)

export default NewsApiService
