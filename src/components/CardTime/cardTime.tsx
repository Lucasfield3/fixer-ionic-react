import React from 'react';
import {  IonCard, IonCardHeader, IonIcon, IonLabel, IonRow} from '@ionic/react'
import cardClose from '../../Assets/images/cardClose.svg'


const CardTime: React.FC = () => {

  return (
    <>
      <IonCard className='card-error' color='light'>
        <IonRow className='ios ion-justify-content-space-between card-invalid-header'></IonRow>
        <IonCardHeader color="light" style={{height:'15rem'}}>

          <IonRow className='ion-justify-content-center'>
            <IonIcon className="icon-invalid" icon={cardClose}></IonIcon>

          </IonRow>

          <IonRow className='row-invalid'>
            <IonLabel id="label-invalid">Ops... Tente novamente.</IonLabel>
          </IonRow>

          <IonRow>
            <IonLabel className="msg-invalid">O tempo acabou.Que pena.</IonLabel>
          </IonRow>

 

        </IonCardHeader>

        <IonRow className='ios ion-justify-content-space-between card-invalid-footer'></IonRow>
      </IonCard >
    </>
  );

}

export default CardTime;