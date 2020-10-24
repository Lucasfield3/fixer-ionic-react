import React from 'react';
import { IonCard, IonCardHeader, IonIcon, IonLabel, IonRow } from '@ionic/react'
//import { pin, walk, warning, wifi, wine } from 'ionicons/icons';
import cardPositive from '../../Assets/images/cardPositive.svg'
import './styles.css'

const CardGreen: React.FC = () => {

  return (
    <>
      <IonCard className='card-accept' color='light'>
        <IonRow className='ios ion-justify-content-space-between card-acertou-header'></IonRow>
        <IonCardHeader color="light" style={{ height: '20rem' }}>

          <IonRow style={{ marginTop: '0.9rem' }} className='ion-justify-content-center'>
            <IonIcon className="icon-acertou" icon={cardPositive}></IonIcon>

          </IonRow>

          <IonRow className='row-acertou'>
            <IonLabel className="label-acertou">Pabranéns, Você acertou !</IonLabel>
          </IonRow>

          <IonRow>
            <IonLabel className="msg-exp">EXP ADQUIRIDO</IonLabel>
          </IonRow>

          <IonRow>
            <IonLabel className="row-acertou-exp"> 0</IonLabel>
          </IonRow>

        </IonCardHeader>

        <IonRow className='ios ion-justify-content-space-between card-acertou-footer'></IonRow>
      </IonCard >
    </>
  );

}

export default CardGreen;