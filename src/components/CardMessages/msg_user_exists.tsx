import React from 'react';
import { IonButton, IonCard, IonCardHeader,  IonLabel } from '@ionic/react'
import './styles.css'

const Userexists: React.FC = () => {

  return (
    <>
      <IonCard className='ios card-msg' color='light'>
        <IonCardHeader color="light">
            <IonLabel className="ios label-msg-notification">Nome de usuário já existe !</IonLabel>
        </IonCardHeader>
        <IonButton className='ios btn_msg_notification'>OK</IonButton>
      </IonCard >
      
    </>
  );

}

export default Userexists;