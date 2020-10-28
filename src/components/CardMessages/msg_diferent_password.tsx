import React from 'react';
import { IonButton, IonCard, IonCardHeader, IonIcon, IonLabel, IonRow } from '@ionic/react'
import './styles.css'

const DiferentPassword: React.FC = () => {

  return (
    <>
      <IonCard className='ios card-msg' color='light'>
        <IonCardHeader color="light">
            <IonLabel className="ios label-msg-notification">Senhas diferentes !</IonLabel>
        </IonCardHeader>
        <IonButton className='ios btn_msg_notification'>OK</IonButton>
      </IonCard >
    </>
  );

}

export default DiferentPassword;