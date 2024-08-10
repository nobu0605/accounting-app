import axios from 'axios'

export const originalAxios = axios

const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT
const axiosSetting = axios.create({ baseURL: BASE_URL })

export default axiosSetting
