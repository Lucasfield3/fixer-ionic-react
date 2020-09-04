import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonCard, IonCardContent } from '@ionic/react';
import './style.css'

const Landing: React.FC = ()=>{

    return(
        <IonPage className="landing">
            <IonContent className="container">
                <IonCard className="card" color='light'>
                    <IonCardContent></IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
}


export default Landing;