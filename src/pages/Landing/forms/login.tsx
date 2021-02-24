import React from 'react';
import {useForm} from 'react-hook-form'
import { IonCardContent, IonRow, IonCol, IonLabel, IonInput, IonItem } from '@ionic/react';
import {ButtonRed, ButtonDark} from '../Landing-style/Landing-styled'
import { useHistory } from 'react-router-dom'
import '../style.css'
import { menuController } from '@ionic/core';
import { Credentials, login, storeToken} from '../../../services/Authentication.service';


const Login: React.FC<{handleClickLogin:()=> void}> = props=>{

const history = useHistory()

const { register, handleSubmit, watch, errors } = useForm()
const onSubmit = async (data:Credentials) =>{
    console.log(data)
    const access_token = await login(data)
    storeToken(access_token)
}


    return(
        <>
        <IonCardContent className='card-content-login'>
            
           <form onSubmit={handleSubmit(onSubmit)}>
           <IonRow className="ios ion-align-items-center email">
                <IonCol>
                    <IonItem color='light'>
                        <IonLabel color='primary' position='floating'>Login:</IonLabel>  
                        <IonInput  name='email' ref={register({required:true})} color='dark'type='text'></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow className="ion-align-items-center senha">
                <IonCol>
                    <IonItem color='light'>
                            <IonLabel color='primary' position='floating'>Senha:</IonLabel>  
                            <IonInput type='password' ref={register({required:true})} name='password' color='dark'></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
                <IonRow className="ion-align-items-center login-row">
                    <IonCol className='col-login'>
                        <ButtonDark
                        size="small"
                        type='submit'
                        className='ios btn-dark'
                        onClick={()=>{
                            menuController.enable(true)
                            history.push('Home')
                        }}
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
           </form>
            </IonCardContent>
        </>
    );

}
export default Login;