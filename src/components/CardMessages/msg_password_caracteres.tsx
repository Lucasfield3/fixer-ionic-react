import React from 'react';
import { IonButton, IonCard, IonCardHeader, IonLabel } from '@ionic/react'
import './styles.css'

const Passwordcaracteres: React.FC = () => {

  return (
    <>
      <IonCard className='ios card-msg' color='light'>
        <IonCardHeader color="light">
            <IonLabel className="ios label-msg-notification">Senha invalida: caracteres insuficiêntes, senha deve cumprir um mínimo de 6 caracteres. </IonLabel>
        </IonCardHeader>
        <IonButton className='ios btn_msg_notification'>OK</IonButton>
      </IonCard >
    </>
  );

}

export default Passwordcaracteres;