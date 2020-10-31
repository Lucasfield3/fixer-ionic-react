import React from 'react';
import { IonButton, IonCard, IonCardHeader,  IonLabel, IonPopover} from '@ionic/react'
//import { pin, walk, warning, wifi, wine } from 'ionicons/icons';
import './styles.css'

const Limitedalternativa: React.FC<{onDidDismiss:()=> void; isOpen:boolean; onClick:()=>void}> = props => {
  return (
    <>
    <IonPopover
    isOpen={props.isOpen}
    onDidDismiss={props.onDidDismiss}
    >
      <IonCard className='card-msg-limite' color='light'>
        <IonCardHeader color="light">
            <IonLabel className="ios label-msg-notification">Numero insuficiênte de alternativas.</IonLabel>
        </IonCardHeader>
        <IonButton onClick={props.onClick} className='ios btn_msg_notification'>OK</IonButton>
      </IonCard >
    </IonPopover>
    </>
  );

}

export default Limitedalternativa;