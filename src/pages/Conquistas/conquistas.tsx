import React, { useState } from 'react';
import styled from 'styled-components';
import CardsConquistas from './CardsConquistas/cardsConquistas';
import './style.css';
import { menuController } from '@ionic/core';
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
    IonSearchbar, IonCardTitle, IonCardContent, IonCol
} from '@ionic/react';
import { menuOutline } from 'ionicons/icons';
import message from '../../Assets/icons/message.svg'
import planet from '../../Assets/icons/planet.svg'
import crystal from '../../Assets/icons/crystal.svg'
import resume from '../../Assets/icons/resume.svg'
import disco from '../../Assets/icons/disco.svg'
import diamond from '../../Assets/icons/diamond.svg'
import winner from '../../Assets/icons/winner.svg'
import cadeado from '../../Assets/icons/padlock.svg'
import criador from '../../Assets/icons/criador.svg'
import aficionado from '../../Assets/icons/aficionado.svg'
import entusiasta from '../../Assets/icons/entusiasta.svg'
import genio from '../../Assets/icons/genio.svg'
import iniciante from '../../Assets/icons/iniciante.svg'
import mentecriativa from '../../Assets/icons/mentecriativa.svg'
import onfire from '../../Assets/icons/onfire.svg'
import onfire2 from '../../Assets/icons/onfire2.svg'
import polivolente from '../../Assets/icons/polivolente.svg'


const Overlay = styled.div`
   background: var(--ion-color-dark);
    opacity: 0.5;
    position: absolute;
    width:100%;
    height: 7rem;
    z-index: 20;
`;

const Cadeado = styled.img`
    position: absolute;
    width: 4rem;
    height: 2rem;
    z-index: 10;
    top: 31%;

`;
const Disable = styled(IonCol)`
    pointer-events: none;
`;


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

                        <IonSearchbar placeholder='Buscar' color='light' className="ios search-bar"
                            value={searchText}
                            onIonChange={e => setSearchText(e.detail.value!)}>
                            <div className='ios line'></div>
                        </IonSearchbar>
                    </IonRow>

                    <IonLabel className="label-menu-title-cards">Conquistas</IonLabel>

                    <IonCard className='container-conquistas'>
                        <IonGrid className='align-conquistas'>

                            <IonRow>
                                <Disable>
                                <CardsConquistas style={{}} classImg='ios card-image' img={criador}>
                                    <Overlay/>
                                    <Cadeado src={cadeado}></Cadeado>
                                    <IonCardTitle className='ios card-title'>Criador</IonCardTitle>
                                    <IonCardContent className='ios ios card-description'>Crie o seu primerio questionario</IonCardContent>
                                </CardsConquistas>
                                </Disable>
                                <IonCol>
                                <CardsConquistas style={{}} classImg='ios card-image' img={iniciante}>
                                    <IonCardTitle className='ios card-title'>Iniciante</IonCardTitle>
                                    <IonCardContent className='ios card-description'>Descrição da conquista</IonCardContent>
                                </CardsConquistas>

                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                <CardsConquistas style={{}} classImg='ios card-image' img={mentecriativa}>
                                    <IonCardTitle className='ios card-title'>Mente Criativa</IonCardTitle>
                                    <IonCardContent className='ios card-description'>Exemplo de descrição, debloquia ao criar o seu primeiro flash card.  debloquia ao criar o seu primeiro flash card,eu primeiro flash card.  debloquia ao criar o seu primeiro flash card</IonCardContent>
                                </CardsConquistas>

                                </IonCol>
                                <IonCol style={{width:'4rem'}}>
                                <CardsConquistas style={{}} classImg='ios card-image' img={aficionado}>
                                    <IonCardTitle className='ios card-title'>Aficionado</IonCardTitle>
                                    <IonCardContent className='ios card-description'>Descrição da conquista</IonCardContent>
                                </CardsConquistas>

                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol style={{width:'4rem'}}>
                                <CardsConquistas style={{}} classImg='ios card-image' img={entusiasta}>
                                    <IonCardTitle className='ios card-title'>Entusiasta</IonCardTitle>
                                    <IonCardContent className='ios card-description'>Descrição da conquista</IonCardContent>
                                </CardsConquistas>

                                </IonCol>
                                <IonCol>
                                <CardsConquistas style={{}} classImg='ios card-image' img={genio}>
                                    <IonCardTitle className='ios card-title'>Gênio</IonCardTitle>
                                    <IonCardContent className='ios card-description'>Descrição da conquista</IonCardContent>
                                </CardsConquistas>

                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                <CardsConquistas style={{}} classImg='ios card-image' img={onfire}>
                                    <IonCardTitle className='ios card-title'>Onfire</IonCardTitle>
                                    <IonCardContent className='ios card-description'>Descrição da conquista</IonCardContent>
                                </CardsConquistas>

                                </IonCol>
                                <IonCol>
                                <CardsConquistas style={{}} classImg='ios card-image' img={onfire2}>
                                    <IonCardTitle className='ios card-title'>Onfire x2</IonCardTitle>
                                    <IonCardContent className='ios card-description'>Descrição da conquista</IonCardContent>
                                </CardsConquistas>

                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol style={{width:'4rem'}}>
                                <CardsConquistas style={{}}  classImg='ios card-image' img={polivolente}>
                                    <IonCardTitle className='ios card-title'>Polivolente</IonCardTitle>
                                    <IonCardContent className='ios card-description'>Descrição da conquista</IonCardContent>
                                </CardsConquistas>

                                </IonCol>
                                <IonCol>
                                <CardsConquistas style={{}} classImg='ios card-image' img={planet}>
                                    <IonCardTitle className='ios card-title'>Titulo</IonCardTitle>
                                    <IonCardContent className='ios card-description'>Descrição da conquista</IonCardContent>
                                </CardsConquistas>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                <CardsConquistas style={{}} classImg='ios card-image' img={message}>
                                    <IonCardTitle className='ios card-title'>Titulo</IonCardTitle>
                                    <IonCardContent className='ios card-description'>Descrição da conquista</IonCardContent>
                                </CardsConquistas>
                                </IonCol>
                                <IonCol>
                                <CardsConquistas style={{}} classImg='ios card-image' img={crystal}>
                                    <IonCardTitle className='ios card-title'>Titulo</IonCardTitle>
                                    <IonCardContent className='ios card-description'>Descrição da conquista</IonCardContent>
                                </CardsConquistas>

                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                <CardsConquistas style={{}} classImg='ios card-image' img={resume}>
                                    <IonCardTitle className='ios card-title'>Titulo</IonCardTitle>
                                    <IonCardContent className='ios card-description'>Descrição da conquista</IonCardContent>
                                </CardsConquistas>

                                </IonCol>
                                <IonCol>
                                <CardsConquistas style={{}} classImg='ios card-image' img={disco}>
                                    <IonCardTitle className='ios card-title'>Titulo</IonCardTitle>
                                    <IonCardContent className='ios card-description'>Descrição da conquista</IonCardContent>
                                </CardsConquistas>

                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                <CardsConquistas style={{}} classImg='ios card-image' img={diamond}>
                                    <IonCardTitle className='ios card-title'>Titulo</IonCardTitle>
                                    <IonCardContent className='ios card-description'>Descrição da conquista</IonCardContent>
                                </CardsConquistas>

                                </IonCol>
                                <IonCol>
                                <CardsConquistas style={{}} classImg='ios card-image' img={winner}>
                                    <IonCardTitle className='ios card-title'>Titulo</IonCardTitle>
                                    <IonCardContent className='ios card-description'>Descrição da conquista</IonCardContent>
                                </CardsConquistas>
                                </IonCol>
                            </IonRow>

                        </IonGrid>

                    </IonCard>

                </IonContent>

            </IonPage>
        </>
    );
}


export default Conquista
