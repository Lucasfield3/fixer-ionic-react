import https from '../utils/https'
import { getPayload } from './Authentication.service'
import { User } from './flashCard.service'
import { Payload } from './Questionarios.service'


export interface Questionario {
    creator:string;
    title:string;
    time:0;
    flashCards:[string]
}

export interface NewQuestionario{
    owner:User;
    creator:string;
    creation:string;
    modification:string;
    id:string;
    title:string;
    time:0;
    flashCards:[string]
}

export async function createFlashQuestionario(newQuestionario:NewQuestionario){
    console.log(newQuestionario)
    https
        .post<Questionario>('questionnaires', newQuestionario)
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
export async function getAnswering(user:User, questionario:Questionario, position:number){
    console.log(`${user} e ${questionario}`)
    https
        .get(`​questionnaires​/answering?questionnaire=${questionario}&user=${user}&position=${position}`)
        .then(async (res)=>{
            console.log(res.data)
            return await res.data
        })
        .catch((erro)=>{
            console.log(erro)
        })
}
export async function putQuestionario(newQuestionario:NewQuestionario){
    console.log(newQuestionario)
    const  payload = getPayload() as Payload
    return https
        .put<Questionario>(`questionnaires/owner/${payload.id}`, newQuestionario)
        .then(async(res)=>{
            console.log(res.data)
            return await res.data
        })
        .catch((erro)=>{
            console.log(erro)
        })
}
export async function deleteQuestionario(idQuestionario:string){
    const  payload = getPayload() as Payload
    console.log(idQuestionario)
    return https
        .delete(`questionnaires/owner/${payload.id}?id-questionnaire=${idQuestionario}`)
        .then(async (res)=>{
            console.log(res.data)
            return await res.data
        })
        .catch((erro)=>{
            console.log(erro)
        })
}

