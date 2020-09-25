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
    IonSearchbar, IonCardTitle, IonCardContent, IonCol, IonImg
} from '@ionic/react';
import { menuOutline } from 'ionicons/icons';
import './style.css';
import { menuController } from '@ionic/core';
import bandeira from '../../Assets/icons/bandeira.svg'
import CardsConquistas from './CardsConquistas/cardsConquistas';
import rocket from '../../Assets/icons/rocket.svg'
import target from '../../Assets/icons/target.svg'
import mortarboard from '../../Assets/icons/mortarboard.svg'
import star from '../../Assets/icons/star.svg'
import clock from '../../Assets/icons/clock.svg'
import mentalhealth from '../../Assets/icons/mentalhealth.svg'
import love from '../../Assets/icons/love.svg'
import lovemutch from '../../Assets/icons/lovemutch.svg'
import message from '../../Assets/icons/message.svg'
import planet from '../../Assets/icons/planet.svg'
import crystal from '../../Assets/icons/crystal.svg'
import resume from '../../Assets/icons/resume.svg'
import disco from '../../Assets/icons/disco.svg'
import diamond from '../../Assets/icons/diamond.svg'
import winner from '../../Assets/icons/winner.svg'
<<<<<<< HEAD
import cadeado from '../../Assets/icons/padlock.svg'
import styled from 'styled-components';
=======
import criador from '../../Assets/icons/criador.svg'
import aficionado from '../../Assets/icons/aficionado.svg'
import entusiasta from '../../Assets/icons/entusiasta.svg'
import genio from '../../Assets/icons/genio.svg'
import iniciante from '../../Assets/icons/iniciante.svg'
import mentecriativa from '../../Assets/icons/mentecriativa.svg'
import onfire from '../../Assets/icons/onfire.svg'
import onfire2 from '../../Assets/icons/onfire2.svg'
import polivolente from '../../Assets/icons/polivolente.svg'
>>>>>>> 23870a52b75cece37757a46ddff35b70ebeaa628


const Overlay = styled.div`
   background: var(--ion-color-dark);
    opacity: 0.7;
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
<<<<<<< HEAD
                                <Disable>
                                <CardsConquistas  classImg='card-image' img={bandeira}>
                                    <Overlay/>
                                    <Cadeado src={cadeado}></Cadeado>
                                    <IonCardTitle className='card-title'>Titulo</IonCardTitle>
=======
                                <IonCol>
                                <CardsConquistas style={{width:'auto'}} classImg='card-image' img={criador}>
                                    <IonCardTitle className='card-title'>Criador</IonCardTitle>
>>>>>>> 23870a52b75cece37757a46ddff35b70ebeaa628
                                    <IonCardContent className='card-description'>Exemplo de descrição, debloquia ao criar o seu primeiro flash card.  debloquia ao criar o seu primeiro flash card,eu primeiro flash card.  debloquia ao criar o seu primeiro flash card</IonCardContent>
                                </CardsConquistas>
                                </Disable>
                                <IonCol>
<<<<<<< HEAD
                                <CardsConquistas  classImg='card-image' img={rocket}>
                                    <IonCardTitle className='card-title'>Titulo</IonCardTitle>
=======
                                <CardsConquistas style={{width:'auto'}} classImg='card-image' img={iniciante}>
                                    <IonCardTitle className='card-title'>Iniciante</IonCardTitle>
>>>>>>> 23870a52b75cece37757a46ddff35b70ebeaa628
                                    <IonCardContent className='card-description'>Descrição da conquista</IonCardContent>
                                </CardsConquistas>

                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
<<<<<<< HEAD
                                <CardsConquistas  classImg='card-image' img={target}>
                                    <IonCardTitle className='card-title'>Titulo</IonCardTitle>
=======
                                <CardsConquistas style={{width:'auto'}} classImg='card-image' img={mentecriativa}>
                                    <IonCardTitle className='card-title'>Mente Criativa</IonCardTitle>
>>>>>>> 23870a52b75cece37757a46ddff35b70ebeaa628
                                    <IonCardContent className='card-description'>Exemplo de descrição, debloquia ao criar o seu primeiro flash card.  debloquia ao criar o seu primeiro flash card,eu primeiro flash card.  debloquia ao criar o seu primeiro flash card</IonCardContent>
                                </CardsConquistas>

                                </IonCol>
                                <IonCol>
<<<<<<< HEAD
                                <CardsConquistas  classImg='card-image' img={mortarboard}>
                                    <IonCardTitle className='card-title'>Titulo</IonCardTitle>
=======
                                <CardsConquistas style={{width:'auto'}} classImg='card-image' img={aficionado}>
                                    <IonCardTitle className='card-title'>Aficionado</IonCardTitle>
>>>>>>> 23870a52b75cece37757a46ddff35b70ebeaa628
                                    <IonCardContent className='card-description'>Descrição da conquista</IonCardContent>
                                </CardsConquistas>

                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
<<<<<<< HEAD
                                <CardsConquistas  classImg='card-image' img={star}>
                                    <IonCardTitle className='card-title'>Titulo</IonCardTitle>
=======
                                <CardsConquistas style={{width:'auto'}} classImg='card-image' img={entusiasta}>
                                    <IonCardTitle className='card-title'>Entusiasta</IonCardTitle>
>>>>>>> 23870a52b75cece37757a46ddff35b70ebeaa628
                                    <IonCardContent className='card-description'>Descrição da conquista</IonCardContent>
                                </CardsConquistas>

                                </IonCol>
                                <IonCol>
<<<<<<< HEAD
                                <CardsConquistas  classImg='card-image' img={mentalhealth}>
                                    <IonCardTitle className='card-title'>Titulo</IonCardTitle>
=======
                                <CardsConquistas style={{width:'auto'}} classImg='card-image' img={genio}>
                                    <IonCardTitle className='card-title'>Gênio</IonCardTitle>
>>>>>>> 23870a52b75cece37757a46ddff35b70ebeaa628
                                    <IonCardContent className='card-description'>Descrição da conquista</IonCardContent>
                                </CardsConquistas>

                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
<<<<<<< HEAD
                                <CardsConquistas  classImg='card-image' img={clock}>
                                    <IonCardTitle className='card-title'>Titulo</IonCardTitle>
=======
                                <CardsConquistas style={{width:'auto'}} classImg='card-image' img={onfire}>
                                    <IonCardTitle className='card-title'>Onfire</IonCardTitle>
>>>>>>> 23870a52b75cece37757a46ddff35b70ebeaa628
                                    <IonCardContent className='card-description'>Descrição da conquista</IonCardContent>
                                </CardsConquistas>

                                </IonCol>
                                <IonCol>
<<<<<<< HEAD
                                <CardsConquistas classImg='card-image' img={love}>
                                    <IonCardTitle className='card-title'>Titulo</IonCardTitle>
=======
                                <CardsConquistas style={{width:'auto'}}classImg='card-image' img={onfire2}>
                                    <IonCardTitle className='card-title'>Onfire x2</IonCardTitle>
>>>>>>> 23870a52b75cece37757a46ddff35b70ebeaa628
                                    <IonCardContent className='card-description'>Descrição da conquista</IonCardContent>
                                </CardsConquistas>

                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
<<<<<<< HEAD
                                <CardsConquistas  classImg='card-image' img={lovemutch}>
                                    <IonCardTitle className='card-title'>Titulo</IonCardTitle>
=======
                                <CardsConquistas style={{width:'auto'}} classImg='card-image' img={polivolente}>
                                    <IonCardTitle className='card-title'>Polivolente</IonCardTitle>
>>>>>>> 23870a52b75cece37757a46ddff35b70ebeaa628
                                    <IonCardContent className='card-description'>Descrição da conquista</IonCardContent>
                                </CardsConquistas>

                                </IonCol>
                                <IonCol>
                                <CardsConquistas  classImg='card-image' img={planet}>
                                    <IonCardTitle className='card-title'>Titulo</IonCardTitle>
                                    <IonCardContent className='card-description'>Descrição da conquista</IonCardContent>
                                </CardsConquistas>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                <CardsConquistas  classImg='card-image' img={message}>
                                    <IonCardTitle className='card-title'>Titulo</IonCardTitle>
                                    <IonCardContent className='card-description'>Descrição da conquista</IonCardContent>
                                </CardsConquistas>

                                </IonCol>
                                <IonCol>
                                <CardsConquistas  classImg='card-image' img={crystal}>
                                    <IonCardTitle className='card-title'>Titulo</IonCardTitle>
                                    <IonCardContent className='card-description'>Descrição da conquista</IonCardContent>
                                </CardsConquistas>

                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                <CardsConquistas  classImg='card-image' img={resume}>
                                    <IonCardTitle className='card-title'>Titulo</IonCardTitle>
                                    <IonCardContent className='card-description'>Descrição da conquista</IonCardContent>
                                </CardsConquistas>

                                </IonCol>
                                <IonCol>
                                <CardsConquistas  classImg={'card-image'} img={disco}>
                                    <IonCardTitle className='card-title'>Titulo</IonCardTitle>
                                    <IonCardContent className='card-description'>Descrição da conquista</IonCardContent>
                                </CardsConquistas>

                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                <CardsConquistas  classImg={'card-image'} img={diamond}>
                                    <IonCardTitle className='card-title'>Titulo</IonCardTitle>
                                    <IonCardContent className='card-description'>Descrição da conquista</IonCardContent>
                                </CardsConquistas>

                                </IonCol>
                                <IonCol>
                                <CardsConquistas  classImg={'card-image'} img={winner}>
                                    <IonCardTitle className='card-title'>Titulo</IonCardTitle>
                                    <IonCardContent className='card-description'>Descrição da conquista</IonCardContent>
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
