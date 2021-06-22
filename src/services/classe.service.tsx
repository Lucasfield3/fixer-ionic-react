import https from '../utils/https'
import { getPayload } from './Authentication.service'
import { User } from './flashCard.service'
import { Payload } from './Questionnaires.service'
export interface NewClass {
    creator:string;
    title:string;
    questionnaires:string[];
}

export interface Classe {
    owner:User;
    creator:User;
    creation?:string;
    modification?:string;
    id:string;
    title:string;
    questionnaires:string[];
}

export async function createClasse(newClass:NewClass){
    console.log(newClass)
    https
        .post('/classrooms', newClass)
        .then(async (res)=>{
            console.log(res.data)
            return await res.data
        })
        .catch((error)=>{
            console.log(error)
        })
}

export async function getAllClasses():Promise<Classe[] | void>{
    const payload = getPayload() as Payload
    https
        .get(`/classrooms/owner/${payload.id}`)
        .then(async (res)=>{
            console.log(res.data)
            return await res.data
        })
        .catch((error)=>{
            console.log(error)
        })
}

export async function getClasse(id:string){
    const payload = getPayload() as Payload
    https
        .get(`/classrooms/one-classroom?id-user=${payload.id}?id-classroom=${id}`)
        .then(async (res)=>{
            console.log(res.data)
            return await res.data
        })
        .catch((error)=>{
            console.log(error)
        })
}

export async function deleteClass(idClass:string){
    const payload = getPayload() as Payload
    https
        .delete(`/classrooms/owner/${payload.id}?id-classroom=${idClass}`)
        .then(async (res)=>{
            console.log(res.data)
            return await res.data
        })
        .catch((error)=>{
            console.log(error)
        })
}

export async function putClass(newClass:NewClass){
    const  payload = getPayload() as Payload
    https
        .put<Classe>(`/classrooms/owner/${payload.id}`, newClass)
        .then(async(res)=>{
            console.log(res.data)
            return await res.data
        })
        .catch((error)=>{
            console.log(error)
        })
}