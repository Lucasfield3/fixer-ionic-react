import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonCard, IonCardContent, IonButton, IonRow, IonGrid } from '@ionic/react';
import './style.css'

const Landing: React.FC = ()=>{

    return(
        <IonPage className="landing">
            <IonContent >
                <IonGrid >
                <IonRow  className="ion-justify-content-center ion-margin-top">
                    <IonCard className='card' color='light'>
                        <IonCardContent></IonCardContent>
                    </IonCard>
                </IonRow>
                <IonRow className="ion-justify-content-center">
                    <IonCard  color='light'>
                        <IonCardContent>
                            <IonButton className='ion-margin'>Login</IonButton>
                            <IonButton className='ion-margin'>Cadastro</IonButton>
                        </IonCardContent>
                    </IonCard>
                </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}


export default Landing;