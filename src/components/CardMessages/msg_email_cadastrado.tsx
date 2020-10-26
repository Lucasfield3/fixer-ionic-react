import React from 'react';
import { IonButton, IonCard, IonCardHeader, IonIcon, IonLabel, IonRow } from '@ionic/react'
//import { pin, walk, warning, wifi, wine } from 'ionicons/icons';
import cardPositive from '../../Assets/images/cardPositive.svg'
import './styles.css'

const Emailcadastrado: React.FC = () => {

  return (
    <>
      <IonCard className='card-msg' color='light'>
        <IonCardHeader color="light">
            <IonLabel className="ios label-msg-notification">E-mail já cadastrado.</IonLabel>
        </IonCardHeader>
        <IonButton className='ios btn_msg_notification'>OK</IonButton>
      </IonCard >
    </>
  );

}

export default Emailcadastrado;