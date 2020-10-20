import axios from 'axios'

const https = axios.create({
    baseURL:'https://fixer-api.herokuapp.com/'
})

const access_token = window.localStorage.getItem('access_token');

if(access_token){
    https.defaults.headers.authorization = `Bearer ${access_token}`
}

export default https;