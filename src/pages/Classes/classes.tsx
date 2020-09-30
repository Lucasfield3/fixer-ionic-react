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
    IonActionSheet, IonFab, IonFabList, IonGrid
} from '@ionic/react'
import { logoFacebook, logoInstagram, logoTwitter, logoVimeo, menuOutline } from 'ionicons/icons';
import './style.css'
import { menuController } from '@ionic/core';

import { add, trash, share, caretForwardCircle, heart, close, arrowBackCircle } from 'ionicons/icons';
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

<<<<<<< HEAD
                <IonContent >
                    <IonButton className="btnMostrar" onClick={() => setShowActionSheet(true)} expand="block">
                        Add
                    </IonButton>

                    <IonActionSheet
                        isOpen={showActionSheet}
                        onDidDismiss={() => setShowActionSheet(false)}
                        cssClass='my-custom-class'
                        buttons={[{
                            text: 'Delete',
                            role: 'destructive',
                            icon: trash,
                            handler: () => {
                                console.log('Delete clicked');
                            }
                        }, {
                            text: 'Share',
                            icon: share,
                            handler: () => {
                                console.log('Share clicked');
                            }
                        }, {
                            text: 'Play (open modal)',
                            icon: caretForwardCircle,
                            handler: () => {
                                console.log('Play clicked');
                            }
                        }, {
                            text: 'Favorite',
                            icon: heart,
                            handler: () => {
                                console.log('Favorite clicked');
                            }
                        }, {
                            text: 'Cancel',
                            icon: close,
                            role: 'cancel',
                            handler: () => {
                                console.log('Cancel clicked');
                            }
                        }]}
                    >
                    </IonActionSheet>
=======
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
>>>>>>> 6450bf99b7aa927e5242c6d3e01b05e87aaef5f2
                </IonContent>


            </IonPage>
        </>
    );

}

export default Classes;