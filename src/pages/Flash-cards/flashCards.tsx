import React, { useState } from 'react';
import {
  IonButton,
  IonPage,
  IonRow,
  IonFabButton,
  IonIcon,
  IonHeader,
  IonMenuButton,
  IonToolbar, 
  IonLabel, 
  IonContent, 
  IonSearchbar, IonCard, IonGrid
} from '@ionic/react'
import { menuOutline } from 'ionicons/icons';
import './style.css'
import { menuController } from '@ionic/core';

async function openMenu(){
    await menuController.open();
}


const FlashCards: React.FC = ()=>{

    const [searchText, setSearchText] = useState('');

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

                <IonContent>
                    <IonRow>

                        <IonSearchbar placeholder='Buscar' color='light' className="search-bar"
                            value={searchText}
                            onIonChange={e => setSearchText(e.detail.value!)}>
                            <div className='line'></div>
                        </IonSearchbar>
                    </IonRow>

                    <IonLabel className="label-menu-title-cards">FlashCards</IonLabel>
                    <IonCard className='container-conquistas'>
                        <IonGrid className='align-conquistas'>
                        </IonGrid>
                    </IonCard>
                </IonContent>
            </IonPage>
        </>
    );

}

export default FlashCards;