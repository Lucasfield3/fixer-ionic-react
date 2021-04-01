import React from 'react';
import { IonButton, IonCard, IonCardHeader,  IonLabel } from '@ionic/react'
import './styles.css'

const DivergentPassword: React.FC = () => {

  return (
    <>
      <IonCard className='ios card-msg' color='light'>
        <IonCardHeader color="light">
            <IonLabel className="ios label-msg-notification">Senha não condiz com o e-mail passado !</IonLabel>
        </IonCardHeader>
        <IonButton className='ios btn_msg_notification'>OK</IonButton>
      </IonCard >
    </>
  );

}

export default DivergentPassword;