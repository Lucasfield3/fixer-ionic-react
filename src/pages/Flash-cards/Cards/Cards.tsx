import React from 'react';
import './style.css';
import { 
IonCard, IonIcon, IonImg, IonLabel, IonTitle
} from '@ionic/react';
import imgCardIcon from '../../../Assets/images/cardicon.png'
import { card } from 'ionicons/icons';


const Cards: React.FC<{onClick:()=>void;id:string;title:string;type:string}> = props=>{

    return(
        <>
         <IonCard key={props.id} onClick={props.onClick} color='dark' className='ios cards'>
            <IonTitle>{props.title}</IonTitle>
            <IonImg src={imgCardIcon}></IonImg>
            <IonLabel>{props.type}</IonLabel>
         </IonCard>
        </>
    );

};

export default Cards;