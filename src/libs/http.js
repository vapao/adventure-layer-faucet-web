import axios from 'axios'
import { message } from 'antd';


// const API_BASE_URL = "http://3.84.203.161:8502";
const API_BASE_URL = "https://faucet-devnet.adventurelayer.xyz/";


// create axios instance
const http = axios.create({
    baseURL: API_BASE_URL
  });


// response interceptor
function handleResponse(response) {
  let result;
  console.log('response', response)
  if (response.status === 200) {
    if (response.error) {
      result = response.error
    } else if (response.hasOwnProperty('data')) {
      return Promise.resolve(response.data)
    } else if (response.headers['content-type'] === 'application/octet-stream') {
      return Promise.resolve(response)
    } else if (!response.config.isInternal) {
      return Promise.resolve(response.data)
    } else {
      result = 'Invalid data format'
    }
  } else {
    result = `Request failed: ${response.status} ${response.statusText}`
  }
  message.error(result);
  return Promise.reject(result)
}


// request interceptor
http.interceptors.response.use(response => {
  return handleResponse(response)
}, error => {
  if (error.response) {
    return handleResponse(error.response)
  }
  const result = 'Request exception: ' + error.message;
  message.error(result);
  return Promise.reject(result)
});

export default http;