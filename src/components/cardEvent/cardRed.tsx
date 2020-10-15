import React, { useEffect, useState, useRef } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFabButton, IonFooter, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonPage, IonPopover, IonRow, IonTitle, IonToolbar } from '@ionic/react'
import { pin, walk, warning, wifi, wine } from 'ionicons/icons';
import cardClose from '../../Assets/images/cardClose.svg'
import './styles.css'

const CardRed: React.FC = () => {

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
      </IonCard >
    </>
  );

}

export default CardRed;