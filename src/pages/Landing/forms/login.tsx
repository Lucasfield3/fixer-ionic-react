import React, { useState } from 'react';
import {useForm} from 'react-hook-form'
import { IonCardContent, IonRow, IonCol, IonLabel, IonInput, IonItem, IonLoading } from '@ionic/react';
import {ButtonRed, ButtonDark} from '../Landing-style/Landing-styled'
import { useHistory } from 'react-router-dom'
import '../style.css'
import { menuController } from '@ionic/core';
import { AccessToken, Credentials, login, storeToken} from '../../../services/Authentication.service';
import { ModalErrorDefault } from '../../styles/Page-default/Page-default-styled';


const Login: React.FC<{handleClickLogin:()=> void}> = props=>{

const history = useHistory()

const { register, handleSubmit,  errors, setValue } = useForm()


const [isOpen, setIsOpen] = useState(false)
const [showLoading, setShowLoading] = useState(false);
var access_token:AccessToken | any = null
const onSubmit = async (data:Credentials):Promise<AccessToken | any> =>{
    setShowLoading(false)
    console.log(data)
    if(Errors() === false){
        setShowLoading(true)
        access_token = await login(data)
        if(access_token){
            props.handleClickLogin()
            CleanInputs()
            storeToken(access_token)
            menuController.enable(true)
            history.push('Home')
            setShowLoading(false)
        }else{
            setShowLoading(false)
            setIsOpen(true)
        }
    }else {
        setShowLoading(false)
    }

   
    
}

var myStyleForLength ={
    fontSize:'16px',
    marginTop:'0rem',
    paddingBottom:'0rem'
} as React.CSSProperties

var myStyleForEmpty ={
    fontSize:'20px',
    marginTop:'0.5rem',
    paddingBottom:'0.5rem'
} as React.CSSProperties


const Errors = ()=>{
    if(errors.email && errors.email.type === "required" && 
    errors.password && errors.password.type === "required"){
       
        setIsOpen(true)
        
    }else if(errors.email && errors.email.type === "maxLength" && 
    errors.password && errors.password.type === "maxLength"){
       
        setIsOpen(true)
       
    }else if(errors.email && errors.email.type === "required"){
       
        setIsOpen(true)
       
    }else if(errors.password && errors.password.type === "required"){
       
        setIsOpen(true)
        
    }else if(errors.email && errors.email.type === "maxLength"){
       
        setIsOpen(true)
       
    }else if(errors.password && errors.password.type === "maxLength"){
       
        setIsOpen(true)
       
    }else return false
}



const MsgsAndErrors = ()=>{
    if(errors.email && errors.email.type === "required" && 
        errors.password && errors.password.type === "required"){

        return 'Campos Vazios.'
    }else if(errors.email && errors.email.type === "maxLength" && 
    errors.password && errors.password.type === "maxLength"){

        return 'Você ultrapassou o número máximo de caracteres nos dois campos.'
    }else if(errors.email && errors.email.type === "required"){

        return 'Campo email vazio.'
    }else if(errors.password && errors.password.type === "required"){

        return 'Campo senha vazio.'
    }else if(errors.email && errors.email.type === "maxLength"){

        return 'Você ultrapassou o número máximo de 65 caracteres no campo email.'
    }else if(errors.password && errors.password.type === "maxLength"){

        return 'Você ultrapassou o número máximo de 30 caracteres no campo senha.'
    } 
    else{
       
        return 'Senha ou Login Incorretos.'
    }   

}
const dinamicStyle = ()=>{
    if(errors.email && errors.email.type === "required" && 
    errors.password && errors.password.type === "required"){
        return myStyleForEmpty
    }else if(errors.email && errors.email.type === "maxLength" && 
    errors.password && errors.password.type === "maxLength"){
        return myStyleForLength
    }else if(errors.email && errors.email.type === "maxLength"){
        return myStyleForLength
    }else if(errors.password && errors.password.type === "maxLength"){
        return myStyleForLength
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
                        <IonInput  name='email' ref={register({required:true, maxLength:65})} color='dark'type='text'></IonInput>

                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow className="ion-align-items-center senha">
                <IonCol>
                    <IonItem color='light'>
                            <IonLabel color='primary' position='floating'>Senha:</IonLabel>  
                            <IonInput type='password' ref={register({required:true, maxLength:30})} name='password' color='dark'></IonInput>
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
            style={dinamicStyle()}
            onClick={()=> {
                setIsOpen(false)
            }}/>

            <IonLoading
            showBackdrop={true}
            cssClass='loading-edit-login'
            isOpen={showLoading}
            />                      
            </IonCardContent>
        </>
    );

}
export default Login;