import  axios from "axios";
import nProgress from "nprogress";
import "nprogress/nprogress.css"

const mockAjax = axios.create({
  baseURL:'/mock',
  timeout:5000,
});

mockAjax.interceptors.request.use((config)=>{
  nProgress.start();
  return config;
})

mockAjax.interceptors.response.use(
  response => {
    nProgress.done();
    return response.data
  },
  error => {
    return Promise.reject(new Error(""))
  }
)

export default mockAjax;