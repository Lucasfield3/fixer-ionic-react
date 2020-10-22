import https from '../utils/https'

interface NewUser{
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

    https
        .post<User>('users', newUser)
        .then(async (res) => {
            console.log(res.data)
            return await console.log(res.data)
        })

}