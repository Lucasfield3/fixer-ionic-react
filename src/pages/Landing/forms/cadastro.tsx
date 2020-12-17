import React, { useState } from 'react';
import { IonCardContent, IonRow, IonCol, IonButton, IonLabel, IonInput, IonItem, IonAlert } from '@ionic/react';
import {ButtonRed, ButtonDark} from '../styles/Buttons'
import '../style.css'
import { cadastro } from '../../../services/User.service';

const Cadastro: React.FC<{ handleClickCad: () => void; }> = props => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showAlert1, setShowAlert1] = useState<boolean>(false);

    const  handleClickAuth = async () => {

        try{
            await cadastro({
                email:email, 
                name:name, 
                password:password, 
                confirmPassword:confirmPassword
            })
            
        }catch(err){
            console.log(err)
        }
        props.handleClickCad();

    }
    /*const [showAlert2, setShowAlert2] = useState(false);
    const [showAlert3, setShowAlert3] = useState(false);
    const [showAlert4, setShowAlert4] = useState(false);
    const [showAlert5, setShowAlert5] = useState(false);
    const [showAlert6, setShowAlert6] = useState(false);
    */
    return (
        <>
            <IonCardContent className="card-content-cadastro">

                <IonRow className="ion-align-items-center">
                    <IonCol>
                        <IonItem color='light'>
                            <IonLabel color='primary' position='floating'>E-mail:</IonLabel>
                            <IonInput value={email} onIonChange={e => setEmail(e.detail.value!.trim())} color='dark' type='text'></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>

                <IonRow className="ion-align-items-center">
                    <IonCol>
                        <IonItem color='light'>
                            <IonLabel color='primary' position='floating'>Nome:</IonLabel>
                            <IonInput value={name} onIonChange={e => setName(e.detail.value!.trim())} color='dark' type='text'></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>

                <IonRow className="ion-align-items-center">
                    <IonCol>
                        <IonItem color='light'>
                            <IonLabel color='primary' position='floating'>Senha:</IonLabel>
                            <IonInput value={password} onIonChange={e => setPassword(e.detail.value!.trim())} color='dark' type='password'></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>

                <IonRow className="ion-align-items-center">
                    <IonCol>
                        <IonItem color='light'>
                            <IonLabel color='primary' position='floating'>Confirmar senha:</IonLabel>
                            <IonInput value={confirmPassword} onIonChange={e => setConfirmPassword(e.detail.value!.trim())} color='dark' type='password'></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>

                <IonRow className="ion-align-items-center row-btn-cadastro">
                    <IonCol>
                        <ButtonDark
                            onClick={handleClickAuth}
                            size="small"
                            type='submit'
                            className='ios btn-dark'
                        >Cadastrar</ButtonDark>
                        <IonAlert
                            isOpen={showAlert1}
                            onDidDismiss={() => {
                                props.handleClickCad();
                                setShowAlert1(false)
                            }}
                            cssClass='my-custom-class .alert-wrapper'
                            header={'Parabéns !!!'}
                            subHeader={'Cadastro realizado com sucesso.'}
                            message={'Um e-mail de confirmação foi enviado para sua caixa de entrada.'}
                            buttons={[{
                                text: 'OK',
                                handler: () => {
                                    props.handleClickCad();
                                }


                            }]}
                        />


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
            </IonCardContent>
        </>
    );

}

export default Cadastro;
//handleClickLogin: ()=> void
