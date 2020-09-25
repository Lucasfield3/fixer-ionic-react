import React,{useState} from 'react';
import {
    IonButton,
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonFabButton,
    IonIcon,
    IonHeader,
    IonMenuButton,
    IonMenu,
    IonToolbar, IonAvatar, IonLabel, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonSearchbar, IonFooter, IonTitle, IonActionSheet, IonFab, IonFabList
} from '@ionic/react'
import { menuOutline } from 'ionicons/icons';
import './style.css'
import { menuController } from '@ionic/core';

import imgAvatar from '../../Assets/images/avatar.svg'
import smallLogo from '../../Assets/icons/logo-small.svg'
import { trash, share, caretForwardCircle, heart, close } from 'ionicons/icons';
import { add, logoFacebook, logoAmazon, logoVimeo, logoTwitter, logoInstagram, settings } from 'ionicons/icons';



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
                </IonContent>






            </IonPage>
        </>
    );

}

export default Classes;