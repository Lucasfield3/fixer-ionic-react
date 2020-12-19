import React,{ useState} from 'react';
import { IonCardContent, IonRow, IonCol, IonLabel, IonInput, IonItem } from '@ionic/react';
import {ButtonRed, ButtonDark} from '../../styles/Page-default/Landing-style/Landing-styled'
import { useHistory } from 'react-router-dom'
import '../style.css'
import { menuController } from '@ionic/core';
import { login, storeToken} from '../../../services/Authentication.service';


const Login: React.FC<{handleClickLogin:()=> void}> = props=>{
const [input, setInput] = useState<string>('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

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
                        <ButtonDark
                        size="small"
                        type='submit'
                        className='ios btn-dark'
                        onClick={handleClickAuth}
                        >Entrar</ButtonDark>
                    </IonCol>
            
                    <IonCol>
                        <ButtonRed
                        color='light'
                        size='small'
                        className='ios btn-danger'
                        onClick={props.handleClickLogin} 
                        >Voltar</ButtonRed>
                    </IonCol>
                </IonRow>
            </IonCardContent>
        </>
    );

}
export default Login;