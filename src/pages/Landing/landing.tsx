import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import './style.css'

const Landing: React.FC = ()=>{

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar color='primary'>
                    <IonTitle>Funcionou</IonTitle>
                </IonToolbar>
            </IonHeader>
        </IonPage>
    );
}


export default Landing;