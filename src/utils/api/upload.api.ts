import axios from 'axios'
import { uploadPreset, cloudinaryName } from '../config'

const baseURL = `https://api.cloudinary.com/v1_1/${cloudinaryName}`

const defaultConfig = {
  baseURL,
  timeout: 60000,
  headers: {
    'Content-type': 'application/json',
  },
}

const api = axios.create({ ...defaultConfig })

api.interceptors.request.use(
  config => {
    return config
  },
  err => Promise.reject(err),
)

class Upload {
  uploadImage(file: string | ArrayBuffer | null) {
    const data = {
      file,
      upload_preset: uploadPreset,
    }
    return api.post('/image/upload', data)
  }
}

const UploadService = new Upload()

export default UploadService
