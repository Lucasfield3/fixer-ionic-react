import https from '../utils/https'

export interface NewUser{
    name:string;
    email:string;
    password:string;
    confirmPassword:string;
}

interface User {
    id:string;
    name:string;
    email:string;
    role:string;
    entryDate: Date;
    modification:Date;
    status:Status;
}

interface Status{
    level:number;
    xp:number;
    flashcardsAnswered:number;
    flashcardsRight:number;
    questionnairesAnswered:number;
    questionnairesFullRight:number;
}

export async function cadastro(newUser:NewUser){
    console.log(newUser)
    https
        .post<User>('users', newUser)
        .then(async (res) => {
            console.log(res.data)
            return await res.data
        })

}

export async function getUser(user:string):Promise<User>{
    console.log(user)
    return https
        .get(`users/${user}`)
        .then(async(res)=>{
            console.log(res.data)
            return await res.data
        })
}