import React from 'react';
import { IonCard, IonCardHeader, IonIcon, IonLabel, IonRow } from '@ionic/react'
//import { pin, walk, warning, wifi, wine } from 'ionicons/icons';
import cardPositive from '../../Assets/images/cardPositive.svg'
import './styles.css'

const StatsDissertativa: React.FC = () => {

  return (
    <>
      <IonCard className='card-stats' color='light'>
        <IonRow className='ios ion-justify-content-center card-stats-header'>
          <IonLabel className="label_result">Resultado</IonLabel>
        </IonRow>
        <IonCardHeader color="light" style={{ height: '12rem' }}>

          <IonRow style={{ marginTop: '0.9rem' }} className='ios ion-justify-content-center'>
            <IonLabel className="stats_answer_correct">Respostas corretas: 0/0</IonLabel>
          </IonRow>

          <IonRow className='ios row-stats'>
            <IonLabel className="stats_answer_exp">EXP adquirido: +000</IonLabel>
          </IonRow>

          <IonRow>
            <IonLabel className="ios stats_conquista">Conquistas: "Nome da conquista"</IonLabel>
          </IonRow>

        </IonCardHeader>

      </IonCard >
    </>
  );

}

export default StatsDissertativa;