import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { IonCardContent, IonRow, IonCol, IonLabel, IonInput, IonItem, IonAlert } from '@ionic/react';
import {ButtonRed, ButtonDark} from '../Landing-style/Landing-styled'
import '../style.css'
import { cadastro, NewUser } from '../../../services/User.service';

const Cadastro: React.FC<{ handleClickCad: () => void; }> = props => {

    const [showAlert1, setShowAlert1] = useState<boolean>(false);
    const { register, handleSubmit, watch, errors } = useForm();


    const onSubmit = (data:NewUser) => {
        console.log(data)
        cadastro(data)
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
                        </IonItem>
                    </IonCol>
                </IonRow>

                <IonRow className="ion-align-items-center row-btn-cadastro">
                    <IonCol>
                        <ButtonDark
                            onClick={()=> {
                                setShowAlert1(true)
                            }}
                            size="small"
                            type='submit'
                            className='ios btn-dark'
                        >Cadastrar</ButtonDark>


                    </IonCol>
                    <IonCol>
                        <ButtonRed
                            onClick={() => props.handleClickCad()}
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

    /*const [showAlert2, setShowAlert2] = useState(false);
    const [showAlert3, setShowAlert3] = useState(false);
    const [showAlert4, setShowAlert4] = useState(false);
    const [showAlert5, setShowAlert5] = useState(false);
    const [showAlert6, setShowAlert6] = useState(false);
    */

export default Cadastro;
//handleClickLogin: ()=> void
