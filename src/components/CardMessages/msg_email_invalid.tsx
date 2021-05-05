import React from 'react';
import { IonButton, IonCard, IonCardHeader,  IonLabel, IonModal } from '@ionic/react'
import './styles.css'

const Emailinvalid: React.FC<{isOpen:boolean; onDidDismiss:(event:CustomEvent)=> void; onClick:()=>void}> = props => {

  return (
    <>
    <IonModal cssClass='ios card-msg'  onDidDismiss={props.onDidDismiss} isOpen={props.isOpen}>
      <IonLabel className="ios label-msg-notification">E-mail inválido.</IonLabel>
      <IonButton onClick={props.onClick} className='ios btn_msg_notification'>OK</IonButton>
    </IonModal>
    </>
  );

}

export default Emailinvalid;