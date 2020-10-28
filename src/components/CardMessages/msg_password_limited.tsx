import React from 'react';
import { IonButton, IonCard, IonCardHeader, IonIcon, IonLabel, IonRow } from '@ionic/react'
import './styles.css'

const Passwordlimited: React.FC = () => {

  return (
    <>
      <IonCard className='ios card-msg' color='light'>
        <IonCardHeader color="light">
            <IonLabel className="ios label-msg-notification">Senha invalida: senha passou do limite de 18 caracteres. </IonLabel>
        </IonCardHeader>
        <IonButton className='ios btn_msg_notification'>OK</IonButton>
      </IonCard >
    </>
  );

}

export default Passwordlimited;