import React from 'react';
import { IonCard, IonCardHeader, IonIcon, IonLabel, IonRow } from '@ionic/react'
//import { pin, walk, warning, wifi, wine } from 'ionicons/icons';
import cardPositive from '../../Assets/images/cardPositive.svg'
import './styles.css'
import { arrowBack } from 'ionicons/icons';

const CardGreen: React.FC<{textRightAnswer:string}> = props => {

  return (
    <>
      <IonCard className='card-accept' color='light'>
        <IonRow className='ios ion-justify-content-space-between card-acertou-header'></IonRow>
        <IonCardHeader color="light" style={{ height: '15rem' }}>

          <IonRow  className='ion-justify-content-center'>
            <IonIcon className="icon-acertou" icon={cardPositive}></IonIcon>

          </IonRow>

          <IonRow className='row-acertou'>
            <IonLabel className="label-acertou">Pabranéns, Você acertou !</IonLabel>
          </IonRow>

          <IonRow>
            <IonLabel className="msg-exp">EXP ADQUIRIDO</IonLabel>
          </IonRow>

          <IonRow>
            <IonLabel className="ios row-acertou-exp"> 0</IonLabel>
          </IonRow>
          <IonRow>
            <IonLabel className="right-answer">{props.textRightAnswer}</IonLabel>
          </IonRow>
        </IonCardHeader>

        <IonRow className='ios ion-justify-content-space-between card-acertou-footer'></IonRow>
      </IonCard >
    </>
  );

}

export default CardGreen;