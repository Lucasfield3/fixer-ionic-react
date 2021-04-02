import React from 'react';
import { IonButton,  IonCardContent, IonCardHeader,  IonLabel, IonPopover, IonRow } from '@ionic/react'
import './styles.css'
import { TagsIfIsRight } from '../../pages/styles/Page-default/Page-default-styled';



const CardStats: React.FC<{
  onClickSair:()=>void;
  textCorrect:string;
  textTotal:string;
  textExp:string;
  textConquista:string;
  isOpen:boolean;
  backdropDismiss:boolean;
  condition:any;
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
        {props.condition && <TagsIfIsRight textExp={props.textExp} textConquista={props.textConquista} /> || 
        <IonRow>
          <IonLabel  className="stats_answer_correct">
            <IonLabel style={{fontSize:'20px'}} color='dark'>Deseja refazer?</IonLabel>
          </IonLabel>
        </IonRow>
        }
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
