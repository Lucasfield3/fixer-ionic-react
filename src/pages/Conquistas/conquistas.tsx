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
    IonToolbar, IonAvatar, IonLabel, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonSearchbar, IonFooter, IonTitle, IonCol
} from '@ionic/react'
import { menuOutline } from 'ionicons/icons';
import './style.css'
import { menuController } from '@ionic/core';
import { useHistory } from 'react-router-dom'
import imgAvatar from '../../Assets/images/avatar.svg'
import smallLogo from '../../Assets/icons/logo-small.svg'

async function openMenu() {
    await menuController.open();
}

const Conquista: React.FC = () => {

    const [searchText, setSearchText] = useState('');


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

                <IonContent className="menu-apresentacao-content">
                    <IonRow>

                        <IonSearchbar placeholder='Buscar' color='light' className="search-bar"
                            value={searchText}
                            onIonChange={e => setSearchText(e.detail.value!)}>
                            <div className='line'></div>
                        </IonSearchbar>
                    </IonRow>

                    <IonLabel className="label-menu-title-cards">Conquistas</IonLabel>

                    <IonCard id='init-card' className='card-form' color='light'>
                        <IonCardContent>
                            <IonRow className="ion-align-items-center row">
                                <IonCol className='col-btn-conquistas'>
                                    
                                Conteudo

                                </IonCol>
                            </IonRow>
                        </IonCardContent>

                    </IonCard>


                </IonContent>

            </IonPage>
        </>
    );
}


export default Conquista