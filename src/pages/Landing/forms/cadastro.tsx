import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { IonCardContent, IonRow, IonCol, IonLabel, IonInput, IonItem, IonAlert, useIonViewWillEnter } from '@ionic/react';
import {ButtonRed, ButtonDark} from '../Landing-style/Landing-styled'
import '../style.css'
import { cadastro, NewUser } from '../../../services/User.service';
import Emailinvalid from '../../../components/CardMessages/msg_email_invalid';
import { ModalErrorDefault } from '../../styles/Page-default/Page-default-styled';

const Cadastro: React.FC<{ handleClickCad: () => void; }> = props => {

    const [showAlert1, setShowAlert1] = useState<boolean>(false);
    const { register, handleSubmit, errors, setValue, getValues } = useForm();
    interface ArrayErros {
        email?:boolean;
        name?:boolean;
        password?:boolean;
        confirmPass?:boolean;
        camposInvalidos?:boolean;
    }
    const errorsArray:ArrayErros = {
        email:false,
        name:false,
        password:false,
        confirmPass:false,
        camposInvalidos:false,
    }

    const [isOpen, setIsOpen] = useState<ArrayErros>(errorsArray)
    const onSubmit = (data:NewUser) => {
        console.log(data)
        cadastro(data)

    }

    const valueInputs = (value:string)=>{
        const inputValue = getValues(value)
        console.log(inputValue)
        return inputValue
    }

    const cleanInputs = ()=>{
        setValue('email', '')
        setValue('name', '')
        setValue('password', '')
        setValue('confirmPassword', '')
    }

    const Errors = ()=>{
        if(errors.email && errors.name && errors.password || 
            errors.name && errors.password || 
            errors.email && errors.name || 
            errors.email && errors.password){
            setIsOpen({camposInvalidos:true})
        }else if(errors.email) {
            setIsOpen({email:true})
        }else if(errors.name){
            setIsOpen({name:true})
        }else if(errors.password){
            setIsOpen({password:true})
        }else if(valueInputs('confirmPassword') !== valueInputs('password')){
            setIsOpen({confirmPass:true})
        }else {
            setShowAlert1(true)
        }

    }

       
    return (
        <>
            <IonCardContent className="card-content-cadastro">

            <form onSubmit={handleSubmit(onSubmit)}>

                <IonRow className="ion-align-items-center">
                    <IonCol>
                        <IonItem color='light'>
                            <IonLabel color='primary' position='floating'>E-mail:</IonLabel>
                            <IonInput  name='email' ref={register({required: true, maxLength:50})}  color='dark' type='text'></IonInput>
                            
                        </IonItem>
                    </IonCol>
                </IonRow>
 
                <IonRow className="ion-align-items-center">
                    <IonCol>
                        <IonItem color='light'>
                            <IonLabel color='primary' position='floating'>Nome:</IonLabel>
                            <IonInput  name='name' ref={register({required:true, maxLength:20})}  color='dark' type='text'></IonInput>
                            
                        </IonItem>
                    </IonCol>
                </IonRow>
                <ModalErrorDefault 
                    cssClass='ios modal-criar' 
                    backdropDismiss={true} 
                    msg='Email inválido.' 
                    color='danger' 
                    onDidDismiss={()=> setIsOpen({email:false})} 
                    isOpen={isOpen.email!} 
                    onClick={()=> {
                        setIsOpen({email:false})
                        console.log(isOpen)
                    }}/>
                    <ModalErrorDefault 
                    cssClass='ios modal-criar' 
                    backdropDismiss={true} 
                    msg='Nome inválido.' 
                    color='danger' 
                    onDidDismiss={()=> setIsOpen({name:false})} 
                    isOpen={isOpen.name!} 
                    onClick={()=> {
                        setIsOpen({name:false})
                        console.log(isOpen)
                    }}/>
                    <ModalErrorDefault 
                    cssClass='ios modal-criar' 
                    backdropDismiss={true} 
                    msg='password inválido.' 
                    color='danger' 
                    onDidDismiss={()=> setIsOpen({password:false})} 
                    isOpen={isOpen.password!} 
                    onClick={()=> {
                        setIsOpen({password:false})
                        console.log(isOpen)
                    }}/>
                    <ModalErrorDefault 
                    cssClass='ios modal-criar' 
                    backdropDismiss={true} 
                    msg='As senhas não são iguais.' 
                    color='danger' 
                    onDidDismiss={()=> setIsOpen({confirmPass:false})} 
                    isOpen={isOpen.confirmPass!} 
                    onClick={()=> {
                        setIsOpen({confirmPass:false})
                    }}/>
                      <ModalErrorDefault 
                    cssClass='ios modal-criar' 
                    backdropDismiss={true} 
                    msg='Campos inválidos.' 
                    color='danger' 
                    onDidDismiss={()=> setIsOpen({camposInvalidos:false})} 
                    isOpen={isOpen.camposInvalidos!} 
                    onClick={()=> {
                        setIsOpen({camposInvalidos:false})
                    }}/>
                <IonRow className="ion-align-items-center">
                    <IonCol>
                        <IonItem color='light'>
                            <IonLabel color='primary' position='floating'>Senha:</IonLabel>
                            <IonInput  name='password' ref={register({required:true, maxLength:25})}  color='dark' type='password'></IonInput>
                            
                        </IonItem>
                    </IonCol>
                </IonRow>

                <IonRow className="ion-align-items-center">
                    <IonCol>
                        <IonItem color='light'>
                            <IonLabel color='primary' position='floating'>Confirmar senha:</IonLabel>
                            <IonInput  name='confirmPassword' ref={register({required:true, maxLength:25})}  color='dark' type='password'></IonInput>
                            {valueInputs('confirmPassword') !== valueInputs('password') && console.log('As senhas não são iguais.')}
                        </IonItem>
                    </IonCol>
                </IonRow>

                <IonRow className="ion-align-items-center row-btn-cadastro">
                    <IonCol>
                        <ButtonDark
                            onClick={()=> Errors()}
                            size="small"
                            type='submit'
                            className='ios btn-dark'
                        >Cadastrar</ButtonDark>


                    </IonCol>
                    <IonCol>
                        <ButtonRed
                            onClick={() => {
                                props.handleClickCad()
                                valueInputs('confirmPassword')
                                cleanInputs()
                            }}
                            size="small"
                            color='light'
                            className='ios btn-danger'
                        >Cancelar</ButtonRed>
                    </IonCol>
                </IonRow>
            </form>
                <IonAlert
                            isOpen={showAlert1}
                            onDidDismiss={() => {
                                props.handleClickCad();
                                setShowAlert1(false);
                            }}
                            cssClass='my-custom-class .alert-wrapper'
                            header={'Parabéns !!!'}
                            subHeader={'Cadastro realizado com sucesso.'}
                            message={'Um e-mail de confirmação foi enviado para sua caixa de entrada.'}
                            buttons={[{
                                text: 'OK',
                                handler: () => {
                                    props.handleClickCad();
                                    setShowAlert1(false);
                                }


                            }]}
                        />

            </IonCardContent>
        </>
    );

}

export default Cadastro;

