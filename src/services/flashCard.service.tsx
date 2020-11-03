import https from '../utils/https'
import { getPayload } from './Authentication.service'

interface NewFlashCard{
    creator:string;
    enunciated:string;
    subject?:string;
    time?:string;
    answerFlashCard:string;
    alternatives?:Alternatives[];
    title:string;
    themes:string[]
}

export interface FlashCard {
    owner:User;
    creator:User;
    creation:string;
    modification:string;
    id:string;
    enunciated:string;
    type:string;
    subject:string;
    time:string;
    title:string;
    themes:string[];
}
interface User{
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
export interface Payload {
    id:string;
    email:string;
    iat:number;
    exp:number;

}
export interface Alternatives{
    answer:string;
}
export async function createFlashCard(newFlashCard:NewFlashCard){
    console.log(newFlashCard)
    https
        .post<FlashCard>('flash-cards', newFlashCard)
        .then(async (res) => {
            console.log(res.data)
            return await res.data
        })
        .catch((erro)=>{
            console.log(erro)
        })

}

export async function getFlashCard(id:string){
    const payload =  getPayload() as Payload
    https
        .get(`flash-cards/one-flash-card?id-user=${payload.id}&id-flash-card=${id}`)
        .then(async (res)=>{
            console.log(res.data)
            return await res.data
        })
        .catch((erro)=>{
            console.log(erro)
        })
}
export async function getFlashCards():Promise<FlashCard[]>{
    const payload =  getPayload() as Payload
    return https
        .get(`flash-cards/owner/${payload.id}`)
        .then(async (res)=>{
            console.log(res.data)
            return await res.data
        })
        .catch((erro)=>{
            console.log(erro)
        })
}


