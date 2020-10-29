import React from 'react';
import { IonButton, IonCard, IonCardHeader, IonIcon, IonLabel, IonRow } from '@ionic/react'
//import { pin, walk, warning, wifi, wine } from 'ionicons/icons';
import './styles.css'

const Classcreate: React.FC = () => {

  return (
    <>
      <IonCard className='card-msg' color='light'>
        <IonCardHeader color="light">
            <IonLabel className="ios label-msg-create">Classe criada com sucesso ! </IonLabel>
        </IonCardHeader>
        <IonButton className='ios btn_msg_create'>OK</IonButton>
      </IonCard >
    </>
  );

}

export default Classcreate;