import React from 'react';
import '../style.css';
import { 
IonCard, 
IonCardContent, 
IonHeader, 
IonImg, 
IonFooter, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/react';

const CardsConquistas: React.FC<{img:string;}> = props=>{

    return(
        <>
         <IonCard className='card-conquistas'>
            <IonImg className='card-image' alt='imagem' src={props.img}></IonImg>
                    {props.children}
         </IonCard>
        </>
    );

};

export default CardsConquistas;