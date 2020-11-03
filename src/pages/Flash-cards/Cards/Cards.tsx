import React from 'react';
import './style.css';
import { 
IonCard, IonLabel, IonTitle
} from '@ionic/react';
import { card } from 'ionicons/icons';


const Cards: React.FC<{onClick:()=>void;id:string;title:string;type:string}> = props=>{

    return(
        <>
         <IonCard key={props.id} onClick={props.onClick} color='dark' className='ios cards'>
            <IonTitle>{props.title}</IonTitle>
            <IonLabel>{props.type}</IonLabel>
         </IonCard>
        </>
    );

};

export default Cards;