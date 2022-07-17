import axios from 'axios'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

const request = axios.create({
  baseURL: '/api',
  timeout: 5000,
})

request.interceptors.request.use((config) => {
  if (store.state.detail.uuid_token) {
    config.headers.userTempId = store.state.detail.uuid_token
  }
  if (store.state.user.token) {
    config.headers.token = store.state.user.token
  }
  nProgress.start()

  return config
})

request.interceptors.response.use(
  (response) => {
    nProgress.done()
    return response.data
  },
  (error) => {
    return Promise.reject(new Error(''))
  }
)

export default request
