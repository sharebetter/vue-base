import axios from 'axios'
import store from '../store'

/* eslint-disable */
// 是否允许携带cookie
axios.defaults.withCredentials = true
axios.defaults.timeout = 30000,
// 添加一个请求拦截器
axios.interceptors.request.use((config) => {
  if (config.data){
    store.commit('setLoadingStatus', !(config.data['isLoading'] === 'unloading' || false))
  }
  config.headers['Accept'] = 'application/json';
  config.headers['Content-Type'] = 'application/json';
  return config;
}, (error) => {
  store.commit('setLoadingStatus', false)
  return Promise.reject(error);
});


// 添加一个响应拦截器
axios.interceptors.response.use((response) => {
  store.commit('setLoadingStatus', false)
  if (response.data.resultCode===0 || response.data.resultCode==='-1000') {
    Toast.fail(response.data.resultMsg);
  }
  return response.data.resultBody
}, (error) => {
  store.commit('setLoadingStatus', false)
  return Promise.reject(error);
});

export default axios
