import React from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader,  IonLabel, IonPopover} from '@ionic/react'
//import { pin, walk, warning, wifi, wine } from 'ionicons/icons';
import './styles.css'

const Limitedalternativa: React.FC<{onDidDismiss:()=> void; isOpen:boolean; onClick:()=>void}> = props => {
  return (
    <>
    <IonPopover
    isOpen={props.isOpen}
    onDidDismiss={props.onDidDismiss}
    >
      <IonCardContent style={{height:'15%'}} className='card-msg-limite' color='light'>
        <IonCardHeader style={{padding:0}} color="light">
            <IonLabel className="ios label-msg-notification">Numero insuficiênte de alternativas.</IonLabel>
        </IonCardHeader>
        <IonButton color='light' onClick={props.onClick} className='ios btn_msg_notification'>OK</IonButton>
      </IonCardContent >
    </IonPopover>
    </>
  );

}

export default Limitedalternativa;