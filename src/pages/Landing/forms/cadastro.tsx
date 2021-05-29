import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { IonCardContent, IonRow, IonCol, IonLabel, IonInput, IonItem, IonAlert } from '@ionic/react';
import {ButtonRed, ButtonDark} from '../Landing-style/Landing-styled'
import '../style.css'
import { cadastro, NewUser } from '../../../services/User.service';
import { ModalErrorDefault } from '../../styles/Page-default/Page-default-styled';

const Cadastro: React.FC<{ handleClickCad: () => void; }> = props => {

    const [showAlert1, setShowAlert1] = useState<boolean>(false);
    const { register, handleSubmit, errors, setValue, getValues } = useForm();

    const Errors = ()=>{
        if(
            errors.email && errors.email.type === "required" && 
            errors.password && errors.password.type === "required" &&
            errors.name && errors.name.type === "required" ||
            errors.email && errors.email.type === "required" && 
            errors.password && errors.password.type === "required" ||
            errors.password && errors.password.type === "required" &&
            errors.name && errors.name.type === "required" ||
            errors.name && errors.name.type === "required" &&
            errors.email && errors.email.type === "required"
        ){
    
            setIsOpen(true) 
        }else if(
            errors.email && errors.email.type === "maxLength" && 
            errors.password && errors.password.type === "maxLength" &&
            errors.name && errors.name.type === "maxLength"
        ){
    
            setIsOpen(true)        
        }else if(errors.email && errors.email.type === "maxLength" && 
                errors.name && errors.name.type === "maxLength"){
    
            setIsOpen(true)         
        }else if(errors.name && errors.name.type === "maxLength" && 
                errors.password && errors.password.type === "maxLength"){
    
            setIsOpen(true)          
        }else if(errors.email && errors.email.type === "maxLength" && 
                errors.password && errors.password.type === "maxLength"){
    
            setIsOpen(true)
        }else if(errors.email && errors.email.type === "required"){
    
            setIsOpen(true)
        }else if(errors.password && errors.password.type === "required"){
    
            setIsOpen(true)
        }else if(errors.name && errors.name.type === "required"){

            setIsOpen(true)
        }else if(errors.email && errors.email.type === "maxLength"){
    
            setIsOpen(true)
        }else if(errors.password && errors.password.type === "maxLength"){
    
            setIsOpen(true)
        }else if(errors.name && errors.name.type === "maxLength"){

            setIsOpen(true)
        }

    }

    
    const MsgsAndErrors = ()=>{
        if(
            errors.email && errors.email.type === "required" && 
            errors.password && errors.password.type === "required" &&
            errors.name && errors.name.type === "required" ||
            errors.email && errors.email.type === "required" && 
            errors.password && errors.password.type === "required" ||
            errors.password && errors.password.type === "required" &&
            errors.name && errors.name.type === "required" ||
            errors.name && errors.name.type === "required" &&
            errors.email && errors.email.type === "required"
            ){
    
            return 'Campos vazios.'
        }else if(
            errors.email && errors.email.type === "maxLength" && 
            errors.password && errors.password.type === "maxLength" &&
            errors.name && errors.name.type === "maxLength"
        ){

            return 'Você ultrapassou o número máximo de caracteres nos campos: email(65 caracteres), nome(30 caracteres) e senha(30 caracteres).'
        }else if(errors.email && errors.email.type === "maxLength" && 
                errors.name && errors.name.type === "maxLength"){
            
                return 'Você ultrapassou o número máximo de caracteres nos campos: email(65 caracteres) e nome(30 caracteres).'
        }else if(errors.name && errors.name.type === "maxLength" && 
                errors.password && errors.password.type === "maxLength"){
    
                return 'Você ultrapassou o número máximo de caracteres nos campos: nome(30 caracteres) e senha(30 caracteres).'
        }else if(errors.email && errors.email.type === "maxLength" && 
                errors.password && errors.password.type === "maxLength"){

                return 'Você ultrapassou o número máximo de caracteres nos campos: email(65 caracteres) e senha(30 caracteres).'
        }else if(errors.email && errors.email.type === "required"){
    
            return 'Campo email vazio.'
        }else if(errors.password && errors.password.type === "required"){
    
            return 'Campo senha vazio.'
        }else if(errors.name && errors.name.type === "required"){

            return 'Campo nome vazio.'
        }else if(errors.email && errors.email.type === "maxLength"){
    
            return 'Você ultrapassou o número máximo de 65 caracteres no campo email.'
        }else if(errors.password && errors.password.type === "maxLength"){
    
            return 'Você ultrapassou o número máximo de 30 caracteres no campo senha.'
        }else if(errors.name && errors.name.type === "maxLength"){

            return 'Você ultrapassou o número máximo de 30 caracteres no campo nome.'
        }else if(valueInputs('confirmPassword') !== valueInputs('password')){

            return 'As senhas não são iguais.'
        }else{
            return 'Campo/s incorretos.'
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

    var btnStyleForLengthInAllFields = {
        marginTop:'0rem',
        width:'3.1rem',
        height:'1.3rem'
    } as React.CSSProperties  

     var btnStyleForLengthInTwoFields = {
        marginTop:'0.4rem',
        width:'3.1rem',
        height:'1.8rem'
    } as React.CSSProperties  

    const dinamicBtnStyle = () =>{
        if(
            errors.email && errors.email.type === "maxLength" && 
            errors.password && errors.password.type === "maxLength" &&
            errors.name && errors.name.type === "maxLength"
            ){
    
                return btnStyleForLengthInAllFields
        }

        if( errors.email && errors.email.type === "maxLength" && 
            errors.name && errors.name.type === "maxLength"){
    
                return btnStyleForLengthInTwoFields
        }

        if(errors.name && errors.name.type === "maxLength" && 
            errors.password && errors.password.type === "maxLength"){
    
                return btnStyleForLengthInTwoFields
        }

        if(errors.email && errors.email.type === "maxLength" && 
            errors.password && errors.password.type === "maxLength"){
    
                return btnStyleForLengthInTwoFields
        }

    }
    
    const dinamicStyle = ()=>{

        if(
            errors.email && errors.email.type === "maxLength" && 
            errors.password && errors.password.type === "maxLength" &&
            errors.name && errors.name.type === "maxLength" ||
            errors.email && errors.email.type === "maxLength" && 
            errors.password && errors.password.type === "maxLength" ||
            errors.password && errors.password.type === "maxLength" &&
            errors.name && errors.name.type === "maxLength" ||
            errors.name && errors.name.type === "maxLength" &&
            errors.email && errors.email.type === "maxLength"
            ){
    
                return myStyleForLength
        }

        if(errors.email && errors.email.type === "required"){
            return myStyleForEmpty
        }

        if(errors.name && errors.name.type === "required"){
            return myStyleForEmpty
        }

        if(errors.password && errors.password.type === "required"){
            return myStyleForEmpty
        }

        if(errors.email && errors.email.type === "maxLength"){
            return myStyleForLength
        }

        if(errors.name && errors.name.type === "maxLength"){
            return myStyleForLength
        }

        if(errors.password && errors.password.type === "maxLength"){
            return myStyleForLength
        }
    }    

    const [isOpen, setIsOpen] = useState(false)
    const onSubmit = async (data:NewUser) => {
        console.log(data)

        if(valueInputs('confirmPassword') !== valueInputs('password')){
            setIsOpen(true)
        }else{
            try{
                cadastro(data)
                setShowAlert1(true)
            }catch(e){
                console.log(e)
                setIsOpen(true)
            }
 
        }

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

   

       
    return (
        <>
            <IonCardContent className="card-content-cadastro">

            <form onSubmit={handleSubmit(onSubmit)}>

                <IonRow className="ion-align-items-center">
                    <IonCol>
                        <IonItem color='light'>
                            <IonLabel color='primary' position='floating'>E-mail:</IonLabel>
                            <IonInput  name='email' ref={register({required: true, maxLength:65})}  color='dark' type='text'></IonInput>
                            
                        </IonItem>
                    </IonCol>
                </IonRow>
 
                <IonRow className="ion-align-items-center">
                    <IonCol>
                        <IonItem color='light'>
                            <IonLabel color='primary' position='floating'>Nome:</IonLabel>
                            <IonInput  name='name' ref={register({required:true, maxLength:30})}  color='dark' type='text'></IonInput>
                            
                        </IonItem>
                    </IonCol>
                </IonRow>
                <ModalErrorDefault 
                    cssClass='ios modal-criar' 
                    backdropDismiss={true} 
                    msg={MsgsAndErrors()!} 
                    color='danger' 
                    onDidDismiss={()=> setIsOpen(false)}
                    style={dinamicStyle()} 
                    styleBtn={dinamicBtnStyle()}
                    isOpen={isOpen} 
                    onClick={()=> {
                        setIsOpen(false)
                    }}/>
                   
                <IonRow className="ion-align-items-center">
                    <IonCol>
                        <IonItem color='light'>
                            <IonLabel color='primary' position='floating'>Senha:</IonLabel>
                            <IonInput  name='password' ref={register({required:true, maxLength:30})}  color='dark' type='password'></IonInput>                           
                        </IonItem>
                    </IonCol>
                </IonRow>

                <IonRow className="ion-align-items-center">
                    <IonCol>
                        <IonItem color='light'>
                            <IonLabel color='primary' position='floating'>Confirmar senha:</IonLabel>
                            <IonInput  name='confirmPassword' ref={register({required:true})}  color='dark' type='password'></IonInput>
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
                        cleanInputs()
                    }}
                    mode='md'
                    cssClass='my-custom-class .alert-wrapper'
                    
                    subHeader={'Cadastro realizado com sucesso.'}
                    message={'Agora vá até o login para entrar no Fixer.'}
                    buttons={[{
                        text: 'OK',
                        handler: () => {
                            props.handleClickCad();
                            setShowAlert1(false);
                            cleanInputs()
                        }


                    }]}
                />

            </IonCardContent>
        </>
    );

}

export default Cadastro;

