import React from 'react';
import {  IonCard, IonCardHeader, IonIcon, IonLabel, IonRow} from '@ionic/react'
//import { pin, walk, warning, wifi, wine } from 'ionicons/icons';
import cardClose from '../../Assets/images/cardClose.svg'
import './styles.css'
import { arrowBack } from 'ionicons/icons';

const CardRed: React.FC<{onClick:()=>void}> = props => {

  return (
    <>
      <IonCard className='card-error' color='light'>
        <IonRow className='ios ion-justify-content-space-between card-invalid-header'></IonRow>
        <IonCardHeader color="light" style={{ height: '20rem' }}>

          <IonRow style={{ marginTop: '0.9rem' }} className='ion-justify-content-center'>
            <IonIcon className="icon-invalid" icon={cardClose}></IonIcon>

          </IonRow>

          <IonRow className='row-invalid'>
            <IonLabel id="label-invalid">Ops... Tente novamente.</IonLabel>
          </IonRow>

          <IonRow>
            <IonLabel className="msg-invalid">A resposta está incorreta, verifique novamente. </IonLabel>
          </IonRow>

          <IonRow>
            <IonLabel className="msg-exp">EXP ADQUIRIDO</IonLabel>
          </IonRow>

          <IonRow>
            <IonLabel className="row-invalid-exp"> 0</IonLabel>
          </IonRow>

        </IonCardHeader>

        <IonRow className='ios ion-justify-content-space-between card-invalid-footer'></IonRow>
        <IonRow className='ios ion-justify-content-center'>
            <IonIcon onClick={props.onClick} color='dark' className='ios arrow-backward' src={arrowBack}></IonIcon>
        </IonRow>
      </IonCard >
    </>
  );

}

export default CardRed;