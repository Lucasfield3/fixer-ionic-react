import React from 'react';
import '../style.css';
import { 
IonCard, 
IonImg, 
} from '@ionic/react';


const CardsConquistas: React.FC<{img:string; classImg:string;style:{}}> = props=>{

    return(
        <>
         <IonCard className='ios card-conquistas'>
            <IonImg style={props.style} className={props.classImg} alt='imagem' src={props.img}></IonImg>
                    {props.children}
         </IonCard>
        </>
    );

};

export default CardsConquistas;