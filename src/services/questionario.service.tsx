import https from '../utils/https'
import { getPayload } from './Authentication.service'


export async function createFlashQuestionario(){
    https
        .post('flash-cards')
        .then(async (res) => {
            console.log(res.data)
            return await res.data
        })
        .catch((erro)=>{
            console.log(erro)
        })

}
