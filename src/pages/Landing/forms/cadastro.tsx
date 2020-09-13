import React, { useState } from 'react';
import { IonCardContent, IonRow, IonCol, IonButton, IonLabel, IonInput, IonItem, IonAlert } from '@ionic/react';
import Button from '../styles/Button'
import '../style.css'


const Cadastro: React.FC<{ handleClickCad: () => void;}> = props => {

    const [input, setInput] = useState<string>('')
    const [showAlert1, setShowAlert1] = useState(false);
    const [text, setText] = useState<string>('Cancelar')
    
    const Props = ()=>{
        props.handleClickCad();
        setTimeout(()=>{
            setText('Cancelar');
        }, 1000)
        
    }

<<<<<<< HEAD
    /*const [showAlert2, setShowAlert2] = useState(false);
    const [showAlert3, setShowAlert3] = useState(false);
    const [showAlert4, setShowAlert4] = useState(false);
    const [showAlert5, setShowAlert5] = useState(false);
    const [showAlert6, setShowAlert6] = useState(false);
    */
=======
>>>>>>> 9a87dc6286a3538504cbd92061309a658f339223
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
                            onDidDismiss={() => {
                                setText('Voltar')
                                setShowAlert1(false)
                            }}
                            cssClass='my-custom-class .alert-wrapper'                            
                            header={'Parabéns !!!'}
                            subHeader={'Cadastro realizado com sucesso.'}
                            message={'Um e-mail de confirmação foi enviado para sua caixa de entrada.'}
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
