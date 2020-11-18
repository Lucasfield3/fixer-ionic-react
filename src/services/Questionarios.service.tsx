import https from '../utils/https'
import { getPayload } from './Authentication.service'


export interface Questionario {
    owner:User;
    creator:User;
    creation?:string;
    modification?:string;
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
export interface Alternative{
    answer:string;
    id?:string;
}
export interface Checker {
    answer:string;
    correct:boolean
}
export async function createQuest(newQuest:Questionario){
    console.log(newQuest)
    https
        .post<Questionario>('/questionnaires', newQuest)
        .then(async (res) => {
            console.log(res.data)
            return await res.data
        })
        .catch((erro)=>{
            console.log(erro)
        })

}

export async function getQuest(id:string){
    const payload =  getPayload() as Payload
    https
        .get(`questionnaires/one-questionnaire?id-user=${payload.id}&id-questionnaire=${id}`)
        .then(async (res)=>{
            console.log(res.data)
            return await res.data
        })
        .catch((erro)=>{
            console.log(erro)
        })
}
export async function getQuestionarios():Promise<Questionario[]>{
    const payload =  getPayload() as Payload
    return https
        .get(`questionnaires/owner/${payload.id}`)
        .then(async (res)=>{
            console.log(res.data)
            return await res.data
        })
        .catch((erro)=>{
            console.log(erro)
        })
}

export async function deleteQuest(idQuest:string){
    const  payload = getPayload() as Payload
    console.log(idQuest)
    return https
        .delete(`/questionnaires/owner/${payload.id}?questionnaires-id=${idQuest}`)
        .then(async (res)=>{
            console.log(res.data)
            return await res.data
        })
        .catch((erro)=>{
            console.log(erro)
        })
}
export async function putQuest(questionario:Questionario){
    console.log(questionario)
    const  payload = getPayload() as Payload
    return https
        .put<Questionario>(`/flash-cards/owner/${payload.id}`, questionario)
        .then(async(res)=>{
            console.log(res.data)
            return await res.data
        })
        .catch((erro)=>{
            console.log(erro)
        })
}
