import React from 'react';
import './style.css';
import { 
IonCard,  IonCol, IonLabel, IonTitle
} from '@ionic/react';
import imgCardIcon from '../../../Assets/images/cardicon.png'
import { FlashCard } from '../../../services/flashCard.service';
import { CSSProperties } from 'styled-components';


const Cards: React.FC<{onClick:()=>void;id:string;title:string;type:string;text:string;status:FlashCard[];styleTitle?:CSSProperties; size?:string;styleType?:CSSProperties}> = props=>{

    //const adjustSize = '3';
    return(
        <>
        <IonCol  size={props.size}  col-md-3 col-lg-3>
            <IonCard  key={props.id} onClick={props.onClick} color='dark' className='ios cards'>
                <IonTitle style={props.styleTitle} title={props.text}>{props.title}</IonTitle>
                <img alt='Flash-card' className='img-card' src={imgCardIcon}></img>
                <IonLabel style={props.styleType} >{props.type}</IonLabel>
            </IonCard>
        </IonCol>
        </>
    );

};

export default Cards;