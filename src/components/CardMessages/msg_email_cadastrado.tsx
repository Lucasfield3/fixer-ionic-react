import React from 'react';
import { IonButton, IonCard, IonCardHeader, IonLabel, } from '@ionic/react'
import './styles.css'

const Emailcadastrado: React.FC = () => {

  return (
    <>
      <IonCard className='ios card-msg' color='light'>
        <IonCardHeader color="light">
            <IonLabel className="ios label-msg-notification">E-mail já cadastrado.</IonLabel>
        </IonCardHeader>
        <IonButton className='ios btn_msg_notification'>OK</IonButton>
      </IonCard >
    </>
  );

}

export default Emailcadastrado;