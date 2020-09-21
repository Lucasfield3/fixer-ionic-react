import React, {useState} from 'react';
import '../style.css';
import { 
IonCard, 
IonCardContent, 
IonRow, 
IonCol, 
IonButton, IonLabel } from '@ionic/react';

const CardsConquistas: React.FC = ()=>{



    return(
        <>
        <IonCard className='card-conquistas' color='light'>
            <IonCardContent>
                <IonRow className="ion-align-items-center row">
                    <IonCol className='col-btn-conquistas'>
                        <IonLabel>
                            Lvl 1 - 20
                        </IonLabel> 
                    </IonCol>
                </IonRow>
            </IonCardContent>
        </IonCard>
        </>
    );

};

export default CardsConquistas;