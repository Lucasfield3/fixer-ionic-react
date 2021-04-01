import React from 'react';
import './style.css';
import { 
IonCard,  IonImg, IonLabel, IonTitle
} from '@ionic/react';
import IconDissertativa from '../../Assets/images/CardIconDissertativa.png'


const CardsClasses: React.FC<{onClick:()=>void;id:string;title:string;type:string;text:string}> = props=>{

    return(
        <>
         <IonCard  key={props.id} onClick={props.onClick} color='dark' className='ios cards'>
            <IonTitle title={props.text}>{props.title}</IonTitle>
            <IonImg src={IconDissertativa}></IonImg>
            <IonLabel >{props.type}</IonLabel>
         </IonCard>
        </>
    );

};

export default CardsClasses;