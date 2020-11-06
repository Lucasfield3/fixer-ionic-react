import React from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonIcon, IonLabel, IonPopover, IonRow } from '@ionic/react'
//import { pin, walk, warning, wifi, wine } from 'ionicons/icons';
import './styles.css'

const CardStats: React.FC<{
  onClickRedone:()=>void; 
  onClickSair:()=>void;
  textCorrect:string;
  textTotal:string;
  textExp:string;
  textConquista:string;
  isOpen:boolean;
  backdropDismiss:boolean;
}> = props => {

  return (
    <>
    <IonPopover isOpen={props.isOpen} backdropDismiss={props.backdropDismiss}>
      <IonCardHeader style={{padding:0}}>
        <IonRow className='ios ion-justify-content-center card-stats-header'>
          <IonLabel className="label_result">Resultado</IonLabel>
        </IonRow>
      </IonCardHeader>
        
        <IonCardContent className='container-result'>
          <IonRow>
            <IonLabel  className="stats_answer_correct">
              <IonLabel color='dark'>Respostas corretas: </IonLabel><IonLabel color='success'>{props.textCorrect}</IonLabel>/{props.textTotal}
            </IonLabel>
          </IonRow>

          <IonRow className='ios row-stats'>
            <IonLabel className="stats_answer_exp">EXP adquirido: <IonLabel style={{ color: '#20A4F3' }}> +{props.textExp}</IonLabel></IonLabel>
          </IonRow>

          <IonRow>
            <IonLabel color='dark' className="ios stats_conquista">Conquistas: {props.textConquista}</IonLabel>
          </IonRow>

        </IonCardContent>

          <IonRow className='ios ion-justify-content-center'>
            <IonButton color='light'onClick={props.onClickRedone} className="ios btn_stats_refazer">
              Refazer
            </IonButton>

            <IonButton color='light' onClick={props.onClickSair}className="ios btn_stats_sair">
              Sair
            </IonButton>
          </IonRow>
    </IonPopover>
    </>
  );

}

export default CardStats;