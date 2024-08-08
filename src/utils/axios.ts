import axios from 'axios'
import { getCookie } from '@/utils/cookie'

const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT
const axiosSetting = axios.create({ baseURL: BASE_URL })

axiosSetting.interceptors.request.use(
  function (config) {
    const token = getCookie('next-auth.session-token')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

export default axiosSetting
