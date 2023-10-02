import axios from 'axios';

const api = axios.create({
    baseURL: "https://dhodonto.ctd.academy"
})

export default api;