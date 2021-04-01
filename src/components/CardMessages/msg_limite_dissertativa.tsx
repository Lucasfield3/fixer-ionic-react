import React from 'react';
import { IonButton, IonCard, IonCardHeader,  IonLabel } from '@ionic/react'
import './styles.css'

const Limitedissertativa: React.FC = () => {

  return (
    <>
      <IonCard className='ios card-msg' color='light'>
        <IonCardHeader color="light">
            <IonLabel className="ios label-msg-notification">Você ultrapassou o limite de 240 caracteres no enunciado da resposta dissertativa.</IonLabel>
        </IonCardHeader>
        <IonButton className='ios btn_msg_notification'>OK</IonButton>
      </IonCard >
    </>
  );

}

export default Limitedissertativa;