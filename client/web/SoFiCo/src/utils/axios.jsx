import axios from 'axios'

const instance = axios.create({
    baseURL : "https://sofico.ufdevs.me/"
})

export default instance;