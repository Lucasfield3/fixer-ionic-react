import https from '../utils/https'

interface NewFlashCard{
    creator:string;
    enunciated:string;
    subject?:string;
    time?:string;
    answerFlashCard:string;
}

interface FlashCard {
    owner:User;
    creator:User;
    creation:string;
    modification:string;
    id:string;
    enunciated:string;
    type:string;
    subject:string;
    time:string;
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

export async function createFlashCard(newFlashCard:NewFlashCard){

    https
        .post<FlashCard>('flash-cards', newFlashCard)
        .then(async (res) => {
            console.log(res.data)
            return await console.log(res.data)
        })

}