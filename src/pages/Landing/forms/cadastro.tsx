import React,{ useState} from 'react';
import { IonCardContent, IonRow, IonCol, IonButton, IonLabel, IonInput, IonItem } from '@ionic/react';
import Button from '../styles/Button'
import '../style.css'

const Cadastro: React.FC<{ handleClickCad: () => void }> = props => {

    const [input, setInput] = useState<string>('')
    

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
                                <IonLabel color='primary' position='floating'>Login:</IonLabel>
                                <IonInput value={input} onChange={e => setInput.bind(e.target)} color='dark' type='text'></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow className="ion-align-items-center">
                        <IonCol>
                            <IonItem color='light'>
                                <IonLabel color='primary' position='floating'>Senha:</IonLabel>
                                <IonInput value={input} onChange={e => setInput.bind(e.target)} color='dark' type='text'></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow className="ion-align-items-center">
                        <IonCol>
                            <IonItem color='light'>
                                <IonLabel color='primary' position='floating'>Confirmar senha:</IonLabel>
                                <IonInput value={input} onChange={e => setInput.bind(e.target)} color='dark' type='text'></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                <IonRow className="ion-align-items-center row-btn-cadastro">

                    <IonCol>
                        <IonButton
                            onClick={props.handleClickCad}
                            size="small" color='dark'
                            className='ion-margin btn-style-dark btn-cadastro'
                        >Cadastrar</IonButton>
                    </IonCol>
                    <IonCol>
                        <Button
                            onClick={props.handleClickCad}
                            size="small"
                            color='light'
                            className='ion-margin btn-style-cadastro-light'
                        >Cancelar</Button>
                    </IonCol>
                </IonRow>
            </IonCardContent>
        </>
    );

}

export default Cadastro;
//handleClickLogin: ()=> void