import React,{ useState} from 'react';
import { IonCardContent, IonRow, IonCol, IonButton, IonLabel, IonInput, IonItem } from '@ionic/react';
import Button from '../styles/Button'
import { useHistory } from 'react-router-dom'
import '../style.css'
import { menuController } from '@ionic/core';
import { login, storeToken} from '../../../services/Authentication.service';


const Login: React.FC<{handleClickLogin:()=> void}> = props=>{
const [input, setInput] = useState<string>('')
//const [credentials, setCredentials] = useState({ email: '', password: '' })
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
//type AccessToken = string
//const [access_token, setAccess_token] = useState<AccessToken>('')
 const history = useHistory()

 
    const handleClickAuth = async () =>{
        try{
           const access_token = await login({email: email, password: password})
          storeToken(access_token)
        
        }catch (err){
           console.log(err)
        }
        history.push('/Home')
        menuController.enable(true)
        setTimeout(()=>{props.handleClickLogin()}, 1000)
        setEmail('')
        setPassword('')
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
                        <IonInput value={email} name='email' required onIonChange={e=>setEmail(e.detail.value!.trim())} color='dark'type='text'></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow className="ion-align-items-center login">
                <IonCol>
                    <IonItem color='light'>
                            <IonLabel color='primary' position='floating'>Senha:</IonLabel>  
                            <IonInput type='password' required name='password' value={password} onIonChange={e=>setPassword(e.detail.value!.trim())} color='dark'></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
                <IonRow className="ion-align-items-center login-row">
                    <IonCol className='col-login'>
                        <IonButton
                        onClick={handleClickAuth}
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