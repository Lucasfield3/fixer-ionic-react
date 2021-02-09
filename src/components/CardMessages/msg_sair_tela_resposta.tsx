import React from 'react';
import { IonButton, IonCard, IonCardHeader,  IonLabel, IonPopover, IonRow} from '@ionic/react'
import './styles.css'

const SairTelaResposta: React.FC<{onDidDismiss:()=> void; isOpen:boolean; onClickSim:()=>void; onClickNao:()=>void}> = props => {
  return (
    <>
    <IonPopover
    isOpen={props.isOpen}
    onDidDismiss={props.onDidDismiss}
    cssClass='ios custom-popSair'
    >
      <IonCardHeader className="ios sairTelaResposta">
            <IonLabel className="ios label-msg-notification-sair">Deseja mesmo sair?</IonLabel>
        </IonCardHeader>
        <IonRow className='ion-justify-content-center' style={{display:'flex'}}>
        <IonButton onClick={props.onClickSim} color='light' className='ios btn_msg_sim'>sim</IonButton>
        <IonButton onClick={props.onClickNao}  color='light' className='ios btn_msg_nao'>não</IonButton>
        </IonRow>
    </IonPopover>
    </>
  );

}

export default SairTelaResposta;