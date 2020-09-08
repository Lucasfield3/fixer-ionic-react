import React from 'react';
import { IonCardContent, IonRow, IonCol, IonButton } from '@ionic/react';
import Button from '../styles/Button'
import '../style.css'

const Cadastro: React.FC<{handleClickCad: ()=> void}> = props =>{

    return(
        <>
        <IonCardContent>
            <IonRow className="ion-align-items-center row">
                <IonCol>
                    <IonButton
                    onClick={props.handleClickCad} 
                    size="small" color='dark' 
                    className='ion-margin btn-style-dark'
                    >Cadastrar</IonButton>
                </IonCol>
                <IonCol>
                    <Button
                    onClick={props.handleClickCad} 
                    size="small" 
                    color='light' 
                    className='ion-margin btn-style-light'
                    >Cancelar</Button>
                </IonCol>
            </IonRow>
        </IonCardContent>
        </>
    );

}

export default Cadastro;
//handleClickLogin: ()=> void