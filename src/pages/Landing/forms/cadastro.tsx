import React, { useState } from 'react';
import { IonCardContent, IonRow, IonCol, IonButton, IonLabel, IonInput, IonItem, IonAlert } from '@ionic/react';
import Button, {BtnChange} from '../styles/Button'
import '../style.css'
import { Prop } from 'ionicons/dist/types/stencil-public-runtime';

const Cadastro: React.FC<{ handleClickCad: () => void;}> = props => {

    const [input, setInput] = useState<string>('')
    const [showAlert1, setShowAlert1] = useState(false);
    const [text, setText] = useState<string>('Cancelar')
    
    const Props = ()=>{
        props.handleClickCad();
        setText('Cancelar');
    }

    const [showAlert2, setShowAlert2] = useState(false);
    const [showAlert3, setShowAlert3] = useState(false);
    const [showAlert4, setShowAlert4] = useState(false);
    const [showAlert5, setShowAlert5] = useState(false);
    const [showAlert6, setShowAlert6] = useState(false);

    return (
        <>
            <IonCardContent className="card-content-cadastro">

                <IonRow className="ion-align-items-center">
                    <IonCol>
                        <IonItem color='light'>
                            <IonLabel color='primary' position='floating'>E-mail:</IonLabel>
                            <IonInput value={input} onChange={e => setInput.bind(e.target)} color='dark' type='text'></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>

                <IonRow className="ion-align-items-center">
                    <IonCol>
                        <IonItem color='light'>
                            <IonLabel color='primary' position='floating'>Nome:</IonLabel>
                            <IonInput value={input} onChange={e => setInput.bind(e.target)} color='dark' type='text'></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>

                <IonRow className="ion-align-items-center">
                    <IonCol>
                        <IonItem color='light'>
                            <IonLabel color='primary' position='floating'>Senha:</IonLabel>
                            <IonInput value={input} onChange={e => setInput.bind(e.target)} color='dark' type='password'></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>

                <IonRow className="ion-align-items-center">
                    <IonCol>
                        <IonItem color='light'>
                            <IonLabel color='primary' position='floating'>Confirmar senha:</IonLabel>
                            <IonInput value={input} onChange={e => setInput.bind(e.target)} color='dark' type='password'></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>

                <IonRow className="ion-align-items-center row-btn-cadastro">
                    <IonCol>
                    <IonButton
                        onClick={()=> setShowAlert1(true)}
                        size="small" 
                        color='dark'
                        type='submit'
                        className='ion-margin btn-style-dark btn-cadastro'
                    >Cadastrar</IonButton>
                        <IonAlert
                            isOpen={showAlert1}
                            onDidDismiss={() => setShowAlert1(false)}
                            cssClass='my-custom-class'
                            header={'Parabéns !!!'}
                            subHeader={'Cadastro realizado com sucesso'}
                            message={'Encaminhamos um E-mail de confirmação para sua caixa de entrada, verifique porfavor.'}
                            buttons={[{
                                text:'OK',
                                handler: ()=> setText('Voltar')

                            }]}
                        />


                    </IonCol>
                    <IonCol>
                        <Button
                            onClick={Props}
                            size="small"
                            color='light'
                            className='ion-margin btn-style-cadastro-light'
                        >{text}</Button>
                    </IonCol>
                </IonRow>
            </IonCardContent>
        </>
    );

}

export default Cadastro;
//handleClickLogin: ()=> void
