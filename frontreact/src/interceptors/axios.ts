import axios from "axios";

axios.defaults.baseURL  = 'http://localhost:8888/api/';
axios.defaults.withCredentials = true;

let refresh = false;

axios.interceptors.response.use(
  resp => resp,
  async error => {
    if(error.response && error.response.status === 401 && !refresh) {
      refresh = true;
      try {
        const response: any = await axios.post('refresh');
        if(response.status === 200) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
          return axios(error.config)
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    refresh = false;
    return Promise.reject(error);
});