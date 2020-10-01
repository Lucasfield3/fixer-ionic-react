import React, { useState } from 'react';
import {
  IonSearchbar, 
    IonCard, 
    IonGrid,
    IonPage,
    IonRow,
    IonFabButton,
    IonIcon,
    IonHeader,
    IonMenuButton,
    IonToolbar, 
    IonLabel, 
    IonContent, 
    IonFab, 
    IonFabList, IonButton, IonCardContent
} from '@ionic/react'
import { add, menu, menuOutline } from 'ionicons/icons';
import './style.css'
import { menuController } from '@ionic/core';
import { useHistory } from 'react-router-dom';

async function openMenu() {
    await menuController.open();
}


const FlashCards: React.FC = ()=>{

    const [searchText, setSearchText] = useState('');
    const history = useHistory();


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
                    <IonCard className='container-flashcards'>
                        <IonGrid className='align-conquistas'>
                            <IonCardContent className="card-title-menu">
                                <IonLabel className='card-vazio'>
                                    VAZIO
                                </IonLabel>
                            </IonCardContent>
                        </IonGrid>
                    </IonCard>

                
                    <IonFab style={{left:'80%'}} vertical="bottom" horizontal="center" slot="fixed" color="dark">
                        <IonFabButton className='custom-fabButton' color="dark">
                            <IonIcon className="add-icon" icon={add} />
                        </IonFabButton>
                        <IonFabList side="top">
                            <IonButton
                                onClick={() => {
                                    history.push('/questaoDissertativa')
                                    menuController.enable(false)
                                }}
                                className="ButtonChoise"
                                size="small"
                                color="dark">
                                Disertativa
                            </IonButton>

                            <IonLabel className="ion-label-choise">Ou</IonLabel>

                            <IonButton                           
                                onClick={() =>{ 
                                    history.push('/questaoAlternativa')
                                    menuController.enable(false)
                                }}
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