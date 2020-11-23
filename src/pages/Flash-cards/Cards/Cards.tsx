import React from 'react';
import './style.css';
import { 
IonCard,  IonImg, IonLabel, IonTitle
} from '@ionic/react';
import imgCardIcon from '../../../Assets/images/cardicon.png'
import { FlashCard } from '../../../services/flashCard.service';


const Cards: React.FC<{onClick:()=>void;id:string;title:string;type:string;text:string;status:FlashCard[]}> = props=>{

    return(
        <>
         <IonCard  key={props.id} onClick={props.onClick} color='dark' className='ios cards'>
            <IonTitle title={props.text}>{props.title}</IonTitle>
            <IonImg src={imgCardIcon}></IonImg>
            <IonLabel >{props.type}</IonLabel>
         </IonCard>
        </>
    );

};

export default Cards;