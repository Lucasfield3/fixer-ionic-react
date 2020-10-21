import React,{ useState} from 'react';
import { IonCardContent, IonRow, IonCol, IonButton, IonLabel, IonInput, IonItem } from '@ionic/react';
import Button from '../styles/Button'
import { useHistory } from 'react-router-dom'
import '../style.css'
import { menuController } from '@ionic/core';
import https from '../../../utils/https'


const Login: React.FC<{handleClickLogin:()=> void}> = props=>{
const [input, setInput] = useState<string>('')
//const [credentials, setCredentials] = useState({ email: '', password: '' })
const [email, setEmail] = useState('')
const [pass, setPass] = useState('')


interface Credentials {
    email:string;
    password:string;
}
interface AccessToken{
    access_token:string;
}
const history = useHistory()
const login = ()=> {

    https
        .post('auth/login', {email:email, password:pass})
        .then(res => {
            window.localStorage.setItem('access_token', res.data.access_token)
            history.push('/Home')
            menuController.enable(true)
            setTimeout(()=>{props.handleClickLogin()}, 1000)
            console.log(res.data)            
        })
        //    storeToken(res.data as AccessToken)     

    }
    
const storeToken = (access_token:AccessToken)=>{
    window.localStorage.setItem('access_token', access_token.access_token)
}
    const getToken = ()=>{
    return window.localStorage.getItem('access_token')
}

 

const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try{
        const access_token = await login()
       
    }catch(err){
        console.log(err)
        console.log('Deu errado')
    }
}
const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
  }

const clickHandler= ()=>{
    setInput('')
}





    return(
        <>
        <IonCardContent className='card-content-login'>
            
            <IonRow className="ion-align-items-center">
                <IonCol>
                    <IonItem color='light'>
                        <IonLabel color='primary' position='floating'>Login:</IonLabel>  
                        <IonInput value={email} name='email' required onIonChange={(e)=>setEmail(e.detail.value!)} color='dark'type='text'></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow className="ion-align-items-center login">
                <IonCol>
                    <IonItem color='light'>
                            <IonLabel color='primary' position='floating'>Senha:</IonLabel>  
                            <IonInput type='password' required name='password' value={pass} onIonChange={e=>setPass(e.detail.value!)} color='dark'></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
                <IonRow className="ion-align-items-center login-row">
                    <IonCol className='col-login'>
                        <IonButton
                        onClick={login}
                        size="small"
                        color='dark'
                        expand="block"
                        className='ion-margin btn-style-dark'
                        >Entrar</IonButton>
                    </IonCol>
            
                    <IonCol>
                        <Button
                        onClick={props.handleClickLogin} 
                        color='light'
                        size="small"  
                        >Voltar</Button>
                    </IonCol>
                </IonRow>
            </IonCardContent>
        </>
    );

}
export default Login;