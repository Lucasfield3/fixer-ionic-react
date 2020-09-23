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
    IonToolbar,  
    IonLabel, 
    IonCard, 
    IonSearchbar, IonCardTitle, IonCardSubtitle, IonCardContent
} from '@ionic/react';
import { menuOutline } from 'ionicons/icons';
import './style.css';
import { menuController } from '@ionic/core';
import CardsConquistas from './CardsConquistas/cardsConquistas';

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

                    <IonCard className='container-conquistas'> 
                        <IonGrid className='align-conquistas'>
                            
                                <IonRow>
                                    <CardsConquistas img={''}>
                                        <IonCardTitle className='card-title'>Titulo</IonCardTitle>
                                        <IonCardContent className='card-description'>Exemplo de descrição, debloquia ao criar o seu primeiro flash card.  debloquia ao criar o seu primeiro flash card,eu primeiro flash card.  debloquia ao criar o seu primeiro flash card</IonCardContent>
                                    </CardsConquistas>
                                    <CardsConquistas img={''}>
                                        <IonCardTitle className='card-title'>Titulo</IonCardTitle>
                                        <IonCardContent className='card-description'>Descrição da conquista</IonCardContent>
                                    </CardsConquistas>
                                </IonRow>
                                <IonRow>
                                    <CardsConquistas img={''}>
                                        <IonCardTitle className='card-title'>Titulo</IonCardTitle>
                                        <IonCardContent className='card-description'>Exemplo de descrição, debloquia ao criar o seu primeiro flash card.  debloquia ao criar o seu primeiro flash card,eu primeiro flash card.  debloquia ao criar o seu primeiro flash card</IonCardContent>
                                    </CardsConquistas>
                                    <CardsConquistas img={''}>
                                        <IonCardTitle className='card-title'>Titulo</IonCardTitle>
                                        <IonCardContent className='card-description'>Descrição da conquista</IonCardContent>
                                    </CardsConquistas>
                                </IonRow>
                                <IonRow>
                                    <CardsConquistas img={''}>
                                        <IonCardTitle className='card-title'>Titulo</IonCardTitle>
                                        <IonCardContent className='card-description'>Descrição da conquista</IonCardContent>
                                    </CardsConquistas>
                                    <CardsConquistas img={''}>
                                        <IonCardTitle className='card-title'>Titulo</IonCardTitle>
                                        <IonCardContent className='card-description'>Descrição da conquista</IonCardContent>
                                    </CardsConquistas>
                                </IonRow>
                                <IonRow>
                                    <CardsConquistas img={''}>
                                        <IonCardTitle className='card-title'>Titulo</IonCardTitle>
                                        <IonCardContent className='card-description'>Descrição da conquista</IonCardContent>
                                    </CardsConquistas>
                                    <CardsConquistas img={''}>
                                        <IonCardTitle className='card-title'>Titulo</IonCardTitle>
                                        <IonCardContent className='card-description'>Descrição da conquista</IonCardContent>
                                    </CardsConquistas>
                                </IonRow>
                                <IonRow>
                                    <CardsConquistas img={''}>
                                        <IonCardTitle className='card-title'>Titulo</IonCardTitle>
                                        <IonCardContent className='card-description'>Descrição da conquista</IonCardContent>
                                    </CardsConquistas>
                                    <CardsConquistas img={''}>
                                        <IonCardTitle className='card-title'>Titulo</IonCardTitle>
                                        <IonCardContent className='card-description'>Descrição da conquista</IonCardContent>
                                    </CardsConquistas>
                                </IonRow>
                                <IonRow>
                                    <CardsConquistas img={''}>
                                            <IonCardTitle className='card-title'>Titulo</IonCardTitle>
                                            <IonCardContent className='card-description'>Descrição da conquista</IonCardContent>
                                    </CardsConquistas>
                                    <CardsConquistas img={''}>
                                        <IonCardTitle className='card-title'>Titulo</IonCardTitle>
                                        <IonCardContent className='card-description'>Descrição da conquista</IonCardContent>
                                    </CardsConquistas>
                                </IonRow>
                                <IonRow>
                                    <CardsConquistas img={''}>
                                            <IonCardTitle className='card-title'>Titulo</IonCardTitle>
                                            <IonCardContent className='card-description'>Descrição da conquista</IonCardContent>
                                    </CardsConquistas>
                                    <CardsConquistas img={''}>
                                        <IonCardTitle className='card-title'>Titulo</IonCardTitle>
                                        <IonCardContent className='card-description'>Descrição da conquista</IonCardContent>
                                    </CardsConquistas>
                                </IonRow>
                                <IonRow>
                                    <CardsConquistas img={''}>
                                        <IonCardTitle className='card-title'>Titulo</IonCardTitle>
                                        <IonCardContent className='card-description'>Descrição da conquista</IonCardContent>
                                    </CardsConquistas>
                                    <CardsConquistas img={''}>
                                        <IonCardTitle className='card-title'>Titulo</IonCardTitle>
                                        <IonCardContent className='card-description'>Descrição da conquista</IonCardContent>
                                    </CardsConquistas>
                                </IonRow>

                        </IonGrid>
                      
                    </IonCard>

                </IonContent>

            </IonPage>
        </>
    );
}


export default Conquista
