import React, { useState } from 'react';
import {
    IonButton,
    IonPage,
    IonContent,
    IonRow,
    IonFabButton,
    IonIcon,
    IonHeader,
    IonMenuButton,
    IonToolbar,
    IonLabel,
    IonFab, 
    IonFabList
} from '@ionic/react'
import { menuOutline } from 'ionicons/icons';
import './style.css'
import { menuController } from '@ionic/core';

import { add, /*trash, share, caretForwardCircle, heart, close, arrowBackCircle*/ } from 'ionicons/icons';
//import { add, logoFacebook, logoAmazon, logoVimeo, logoTwitter, logoInstagram, settings } from 'ionicons/icons';



async function openMenu() {
    await menuController.open();
}

const Classes: React.FC = () => {

    const [showActionSheet, setShowActionSheet] = useState(false);


    return (
        <>
            <IonPage>
                <IonHeader className='custom-header'>
                    <IonToolbar>
                        <IonRow className='row-label'>
                            <IonLabel className="label-menu-fixer">FIXER</IonLabel>
                        </IonRow>
                        <IonFabButton slot='start' onClick={openMenu} className="icon-fab-button dark" size="small" color="dark">
                            <IonIcon icon={menuOutline} />
                            <IonButton slot='start'>
                                <IonMenuButton></IonMenuButton>
                            </IonButton>
                        </IonFabButton>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <IonFab vertical="bottom" horizontal="center" slot="fixed" color="dark">
                        <IonFabButton>
                            <IonIcon icon={add} />
                        </IonFabButton>
                        <IonFabList side="top">
                            <IonButton className="ButtonChoise" size="small" color="dark">Disertativa</IonButton>
                            <IonLabel className="ion-label-choise">Ou</IonLabel>
                            <IonButton className="ButtonChoise" size="small" color="dark">Alternativa</IonButton>
                        </IonFabList>
                    </IonFab>
                </IonContent>
            </IonPage>
        </>
    );

}

export default Classes;