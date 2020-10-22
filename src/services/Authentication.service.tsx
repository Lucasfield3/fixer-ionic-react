import https from '../utils/https'

interface Credentials {
    email:string;
    password:string;
}
interface AccessToken {
    access_token:string
}
 //type AccessToken = string
export async function login (credentials:Credentials): Promise<AccessToken>{ 

    return https
    .post('auth/login', credentials)
    .then( async (res) => {return await res.data as AccessToken})
}
export const storeToken = (access_token:AccessToken)=>{
    window.localStorage.setItem('access_token', access_token.access_token)
}
export   const getToken = ()=>{
    return window.localStorage.getItem('access_token')
}
    