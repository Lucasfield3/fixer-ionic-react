import https from '../utils/https'
import { getPayload } from './Authentication.service'

export interface NewFlashCard{
    creator:string;
    enunciated:string;
    subject?:string;
    time?:number;
    answerFlashCard:string;
    alternatives?:Alternative[];
    title:string;
    themes:string[];
    id?:string;
}
export interface NewAlternative{
    answer:string
}
export interface FlashCard {
    [x: string]: any
    owner?:User;
    creator:User;
    creation?:string;
    modification?:string;
    id:string;
    enunciated:string;
    type?:string;
    subject:string;
    time?:number;
    title:string;
    themes:string[];
    alternatives?:Alternative[];
}
export interface User{
    id:string;
    name?:string;
    email?:string;
    role?:string;
    entryDate?: Date;
    modification?:Date;
    status?:Status;
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
export interface Alternative{
    answer:string;
    id?:string;
}
export interface Checker {
    answer:string;
    correct:boolean
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
export async function getAllFlashCards():Promise<FlashCard[] | any>{
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
export async function getCheck(idFlashCard:string, answer:string):Promise<Checker>{
    const  payload = getPayload() as Payload
    return https
        .get(`/flash-cards/check?answer=${answer}&flash-card-id=${idFlashCard}&user-id=${payload.id}`)
        .then(async (res)=>{
            console.log(res.data)
            return await res.data
        })
        .catch((erro)=>{
            console.log(erro)
        })
}
export async function deleteFlashCard(idFlashCard:string){
    const  payload = getPayload() as Payload
    console.log(idFlashCard)
    return https
        .delete(`/flash-cards/owner/${payload.id}?flash-card-id=${idFlashCard}`)
        .then(async (res)=>{
            console.log(res.data)
            return await res.data
        })
        .catch((erro)=>{
            console.log(erro)
        })
}
export async function putFlashCard(newflashCard:NewFlashCard){
    console.log(newflashCard)
    const  payload = getPayload() as Payload
    return https
        .put<FlashCard>(`/flash-cards/owner/${payload.id}`, newflashCard)
        .then(async(res)=>{
            console.log(res.data)
            return await res.data
        })
        .catch((erro)=>{
            console.log(erro)
        })
}
export async function getRightAnswer(idFlashCard:string){
    console.log(idFlashCard)
    const  payload = getPayload() as Payload
    return https
        .get(`/flash-cards/answer?id-user=${payload.id}&id-flash-card=${idFlashCard}`)
        .then(async(res)=>{
            console.log(res.data)
            return await res.data
        })
        .catch((erro)=>{
            console.log(erro)
        })
}