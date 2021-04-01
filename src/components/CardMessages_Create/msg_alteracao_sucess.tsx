import React from 'react';
import { IonButton, IonCard, IonCardHeader, IonLabel } from '@ionic/react'
import './styles.css'

const Alteracaosucess: React.FC = () => {

  return (
    <>
      <IonCard className='ios card-msg' color='light'>
        <IonCardHeader color="light">
            <IonLabel className="ios label-msg-create">Alterações salvas com sucesso ! </IonLabel>
        </IonCardHeader>
        <IonButton className='ios btn_msg_create'>OK</IonButton>
      </IonCard >
    </>
  );

}

export default Alteracaosucess;