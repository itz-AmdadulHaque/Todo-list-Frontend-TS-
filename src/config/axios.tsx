import axios from 'axios'
const URL = import.meta.env.VITE_BASE_URL as string
const instance = axios.create({
    baseURL: URL,
  });

export default instance;