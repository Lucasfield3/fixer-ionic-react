import React from 'react';
import { IonButton, IonCard, IonCardHeader, IonIcon, IonLabel, IonRow } from '@ionic/react'
//import { pin, walk, warning, wifi, wine } from 'ionicons/icons';
import './styles.css'

const CardStats: React.FC = () => {

  return (
    <>
      <IonCard className='card-stats' color='light'>
        <IonRow className='ios ion-justify-content-center card-stats-header'>
          <IonLabel className="label_result">Resultado</IonLabel>
        </IonRow>
        <IonCardHeader color="light" style={{ height: '15rem' }}>

          <IonRow style={{ marginTop: '0.9rem' }} className='ios ion-justify-content-center'>
            <IonLabel className="stats_answer_correct">
              Respostas <IonLabel style={{ color: '#2EC4B6' }}>corretas: 0</IonLabel>/0
            </IonLabel>
          </IonRow>

          <IonRow className='ios row-stats'>
            <IonLabel className="stats_answer_exp">EXP adquirido: <IonLabel style={{ color: '#20A4F3' }}> +000</IonLabel></IonLabel>
          </IonRow>

          <IonRow>
            <IonLabel className="ios stats_conquista">Conquistas: "Nome da conquista"</IonLabel>
          </IonRow>

          <IonRow className='ios ion-justify-content-center' style={{ margin: '1rem 0' }}>
            <IonButton className="ios btn_stats_refazer">
              Refazer
            </IonButton>

            <IonButton className="ios btn_stats_sair">
              Sair
            </IonButton>
          </IonRow>

        </IonCardHeader>

      </IonCard >
    </>
  );

}

export default CardStats;