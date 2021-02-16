import React from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonIcon, IonLabel, IonPopover, IonRow } from '@ionic/react'
//import { pin, walk, warning, wifi, wine } from 'ionicons/icons';
import './styles.css'

const CardStats: React.FC<{
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
        
        <IonCardContent className='ios container-result'>
          <IonRow>
            <IonLabel  className="stats_answer_correct">
              <IonLabel style={{fontSize:'20px'}} color='dark'>Deseja refazer?</IonLabel>
            </IonLabel>
          </IonRow>

          <IonRow className='ios row-stats'>
            <IonLabel className="stats_answer_exp">EXP adquirido:<IonLabel style={{ color: '#20A4F3' }}> +{props.textExp}</IonLabel></IonLabel>
          </IonRow>

          <IonRow>
            <IonLabel color='dark' className="ios stats_conquista">Conquistas:{props.textConquista}</IonLabel>
          </IonRow>

        </IonCardContent>

          <IonRow className='ios ion-justify-content-center'>           
              {props.children}
            <IonButton color='light'onClick={props.onClickSair}className="ios btn_stats_sair">
              Sair
            </IonButton>
          </IonRow>
    </IonPopover>
    </>
  );

}

export default CardStats;
/**   <IonRow style={{ marginTop: '1.7rem' }} className='ios ion-justify-content-center'>
                        <a href="#" className="ios back-answer">
                            <img className="href-back" src={backAnswer} alt="back" />
                        </a>
                        <IonCard className="ios bar-result-answers" color="light">
                            <IonLabel id="answer-certas-dissertativa">Certas: 0 </IonLabel>
                            <IonLabel id="answer-total-dissertativa">Total: 0 </IonLabel>
                            <IonLabel id="answer-erradas-dissertativa">Erradas: 0 </IonLabel>
                        </IonCard>

                        <a href="#" className="ios back-answer">
                            <img className="href-next" src={nextAnswer} alt="next" />
                        </a>
                    </IonRow> */