import React from 'react';
import {
    IonButton,
    IonPage,

    IonRow,
    IonFabButton,
    IonIcon,
    IonHeader,
    IonMenuButton,
    IonToolbar, IonLabel, IonContent, IonFab, IonFabList
} from '@ionic/react'
import { add, menuOutline } from 'ionicons/icons';
import './style.css'
import { menuController } from '@ionic/core';
import { useHistory } from 'react-router-dom';

async function openMenu() {
    await menuController.open();
}

const FlashCards: React.FC = () => {
    const history = useHistory()

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
                            <IonButton
                                onClick={() => history.push('/questaoDissertativa')}
                                className="ButtonChoise"
                                size="small"
                                color="dark">
                                Disertativa
                            </IonButton>

                            <IonLabel className="ion-label-choise">Ou</IonLabel>

                            <IonButton
                                onClick={() => history.push('/questaoAlternativa')}
                                className="ButtonChoise"
                                size="small"
                                color="dark">
                                Alternativa
                            </IonButton>
                        </IonFabList>
                    </IonFab>
                </IonContent>
            </IonPage>
        </>
    );

}

export default FlashCards;