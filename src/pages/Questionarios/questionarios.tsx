import React, { useState } from 'react';
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
  IonToolbar, IonAvatar, IonLabel, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonSearchbar, IonFooter, IonTitle
} from '@ionic/react'
import { menuOutline } from 'ionicons/icons';
import './style.css'
import { menuController } from '@ionic/core';
import { useHistory } from 'react-router-dom'
import imgAvatar from '../../Assets/images/avatar.svg'
import smallLogo from '../../Assets/icons/logo-small.svg'

async function openMenu(){
    await menuController.open();
}

const Questionarios: React.FC = ()=>{

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

export default Questionarios;