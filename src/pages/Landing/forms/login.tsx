import React, { useState } from 'react';
import {useForm} from 'react-hook-form'
import { IonCardContent, IonRow, IonCol, IonLabel, IonInput, IonItem, useIonViewWillLeave } from '@ionic/react';
import {ButtonRed, ButtonDark} from '../Landing-style/Landing-styled'
import { useHistory } from 'react-router-dom'
import '../style.css'
import { menuController } from '@ionic/core';
import { AccessToken, Credentials, login, storeToken} from '../../../services/Authentication.service';
import { ModalErrorDefault } from '../../styles/Page-default/Page-default-styled';


const Login: React.FC<{handleClickLogin:()=> void}> = props=>{

const history = useHistory()

const { register, handleSubmit,  errors, setValue } = useForm()
// interface ArrayErros {
//     login?:boolean;
//     password?:boolean;
//     camposInvalidos?:boolean;
// }
// const errorsArray:ArrayErros = {
//     login:false,
//     password:false,
//     camposInvalidos:false,
// }

const [isOpen, setIsOpen] = useState(false)
const onSubmit = async (data:Credentials):Promise<AccessToken | any> =>{
    console.log(data)
    const access_token = await login(data)
    if(access_token){
        storeToken(access_token)
        menuController.enable(true)
        history.push('Home')
    }else{
        setIsOpen(true)
    }
    
}

const Errors = ()=>{
    if(errors.email && errors.password){
        setIsOpen(true)
    }else if(errors.email){
        setIsOpen(true)
    }else if(errors.password){
        setIsOpen(true)
    }
}

const MsgsAndErrors = ()=>{

    if(errors.email && errors.password){

        return 'Campos inválidos.'
    }else if(errors.email){

        return 'Login inválido.'
    }else if(errors.password){

        return 'Senha inválida.'
    }else {

        return 'Login ou senha inválidos.'
    }
}

const CleanInputs =()=>{
    setValue('email', '')
    setValue('password', '')
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
                        onClick={()=>Errors()}
                        >Entrar</ButtonDark>
                    </IonCol>
             
                    <IonCol>
                        <ButtonRed
                        color='light'
                        size='small'
                        className='ios btn-danger'
                        onClick={()=>{           
                            props.handleClickLogin()
                            CleanInputs()
                        }} 
                        >Voltar</ButtonRed>
                    </IonCol>
                </IonRow>
           </form>
           <ModalErrorDefault 
            cssClass='ios modal-criar' 
            backdropDismiss={true} 
            msg={MsgsAndErrors()!}
            color='danger' 
            onDidDismiss={()=> setIsOpen(false)} 
            isOpen={isOpen} 
            onClick={()=> {
                setIsOpen(false)
            }}/>
            </IonCardContent>
        </>
    );

}
export default Login;