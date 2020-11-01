import React from 'react';
import { IonButton, IonCard, IonCardHeader,  IonLabel, IonPopover} from '@ionic/react'
//import { pin, walk, warning, wifi, wine } from 'ionicons/icons';
import './styles.css'

const Limitedalternativa: React.FC<{onDidDismiss:()=> void; isOpen:boolean; onClick:()=>void}> = props => {
  return (
    <>
<<<<<<< HEAD
      <IonCard className='ios card-msg' color='light'>
=======
    <IonPopover
    isOpen={props.isOpen}
    onDidDismiss={props.onDidDismiss}
    >
      <IonCard className='card-msg-limite' color='light'>
>>>>>>> cc43549e0199cd4e340e20533bf0aa6a0cf6cd4b
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