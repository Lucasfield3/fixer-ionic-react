import React from 'react';
import {
  IonButton,
  IonPage,
  IonRow,
  IonFabButton,
  IonIcon,
  IonHeader,
  IonMenuButton,
  IonToolbar, IonLabel
} from '@ionic/react'
import { menuOutline } from 'ionicons/icons';
import './style.css'
import { menuController } from '@ionic/core';
async function openMenu(){
    await menuController.open();
}

const Classes: React.FC = ()=>{

    return(
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
            </IonPage>
        </>
    );

}

export default Classes;