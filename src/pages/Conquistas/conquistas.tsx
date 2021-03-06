import React, { useState } from 'react';
import styled from 'styled-components';
import CardsConquistas from './CardsConquistas/cardsConquistas';
import './style.css';
import { menuController } from '@ionic/core';
import {
   
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCard,
    IonCardTitle, 
    IonCardContent, 
    IonCol
} from '@ionic/react';
import planet from '../../Assets/icons/planet.svg'
import resume from '../../Assets/icons/resume.svg'
import diamond from '../../Assets/icons/diamond.svg'
import cadeado from '../../Assets/icons/padlock.svg'
import criador from '../../Assets/icons/criador.svg'
import aficionado from '../../Assets/icons/aficionado.svg'
import entusiasta from '../../Assets/icons/entusiasta.svg'
import iniciante from '../../Assets/icons/iniciante.svg'
import mentecriativa from '../../Assets/icons/mentecriativa.svg'
import onfire from '../../Assets/icons/onfire.svg'
import onfire2 from '../../Assets/icons/onfire2.svg'
import polivolente from '../../Assets/icons/polivolente.svg'
import mestrenumeros from '../../Assets/icons/mestrenumeros.svg'
import mito from '../../Assets/icons/mito.svg'
import eremitanumeros from '../../Assets/icons/eremitanumeros.svg'
import mestrepalavras from '../../Assets/icons/mestrepalavras.svg'
import sabiopalavras from '../../Assets/icons/sabiopalavras.svg'
import eremitapalavras from '../../Assets/icons/eremitapalavras.svg'
import classista from '../../Assets/icons/classista.svg'
import prodigio from '../../Assets/icons/prodigio.svg'
import { ButtonMenuDark, HeaderDefault, SearchBar, TitleCards } from '../styles/Page-default/Page-default-styled';


const Overlay = styled.div`
    background: var(--ion-color-dark);
    opacity: 0.5;
    position: absolute;
    width:100%;
    height: 7rem;
`;

const Cadeado = styled.img`
    position: absolute;
    width: 4rem;
    height: 2rem;
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
            <HeaderDefault>
                <ButtonMenuDark onClick={()=>openMenu()}/>
            </HeaderDefault>

                <IonContent className="menu-apresentacao-content">
                <IonRow>
                    <SearchBar placeholder='Buscar' color='light' className="search-bar"
                        value={searchText}
                        onIonChange={e => setSearchText(e.detail.value!)}>
                        <div className='line'></div>
                    </SearchBar>
                </IonRow>

                <TitleCards>Conquistas</TitleCards>

                    <IonCard className='ios container-conquistas'>
                        <IonGrid className='ios align-conquistas'>

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
                                    <IonCardContent className='ios card-description'>Responda um questionário inteiro</IonCardContent>
                                </CardsConquistas>

                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                <CardsConquistas style={{}} classImg='ios card-image' img={polivolente}>
                                    <IonCardTitle className='ios card-title'>Polivolente</IonCardTitle>
                                    <IonCardContent className='ios card-description'>Crie mais de um tipo de questionário</IonCardContent>
                                </CardsConquistas>

                                </IonCol>
                                <IonCol style={{width:'4rem'}}>
                                <CardsConquistas style={{}} classImg='ios card-image' img={prodigio}>
                                    <IonCardTitle className='ios card-title'>Prodígio</IonCardTitle>
                                    <IonCardContent className='ios card-description'>Gabarite 1 questioário</IonCardContent>
                                </CardsConquistas>

                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol style={{width:'4rem'}}>
                                <CardsConquistas style={{}} classImg='ios card-image' img={entusiasta}>
                                    <IonCardTitle className='ios card-title'>Entusiasta</IonCardTitle>
                                    <IonCardContent className='ios card-description'>Crie 50 flashcards</IonCardContent>
                                </CardsConquistas>

                                </IonCol>
                                <IonCol>

                                <CardsConquistas style={{}} classImg='ios card-image' img={aficionado}>
                                    <IonCardTitle className='ios card-title'>Aficionado</IonCardTitle>
                                    <IonCardContent className='ios card-description'>Crie 150 flashcards</IonCardContent>
                                </CardsConquistas>
                        

                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                <CardsConquistas style={{}} classImg='ios card-image' img={onfire}>
                                    <IonCardTitle className='ios card-title'>Onfire</IonCardTitle>
                                    <IonCardContent className='ios card-description'>Acerte 10 perguntas seguidas</IonCardContent>
                                </CardsConquistas>

                                </IonCol>
                                <IonCol>
                                <CardsConquistas style={{}} classImg='ios card-image' img={onfire2}>
                                    <IonCardTitle className='ios card-title'>Onfire x2</IonCardTitle>
                                    <IonCardContent className='ios card-description'>Acerte 20 perguntas seguidas</IonCardContent>
                                </CardsConquistas>

                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol style={{width:'4rem'}}>
                                <CardsConquistas style={{}}  classImg='ios card-image' img={mestrenumeros}>
                                    <IonCardTitle className='ios card-title'>Mestre dos Números</IonCardTitle>
                                    <IonCardContent className='ios card-description'>Responda 3 questionários de ,atemática</IonCardContent>
                                </CardsConquistas>

                                </IonCol>
                                <IonCol>
                                <CardsConquistas style={{}} classImg='ios card-image' img={planet}>
                                    <IonCardTitle className='ios card-title'>Sabe Tudo</IonCardTitle>
                                    <IonCardContent className='ios card-description'>Gabarite 10 questionários</IonCardContent>
                                </CardsConquistas>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                <CardsConquistas style={{}} classImg='ios card-image' img={mito}>
                                    <IonCardTitle className='ios card-title'>Mito !</IonCardTitle>
                                    <IonCardContent className='ios card-description'>Gabarite 100 questionários</IonCardContent>
                                </CardsConquistas>
                                </IonCol>
                                <IonCol>
                                <CardsConquistas style={{}} classImg='ios card-image' img={mentecriativa}>
                                    <IonCardTitle className='ios card-title'>Mente Criativa</IonCardTitle>
                                    <IonCardContent className='ios card-description'>Crie 50 questionários</IonCardContent>
                                </CardsConquistas>

                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                <CardsConquistas style={{}} classImg='ios card-image' img={resume}>
                                    <IonCardTitle className='ios card-title'>Sábio dos Números</IonCardTitle>
                                    <IonCardContent className='ios card-description'>Gabarite 10 questionários de matemática</IonCardContent>
                                </CardsConquistas>

                                </IonCol>
                                <IonCol>
                                <CardsConquistas style={{}} classImg='ios card-image' img={eremitanumeros}>
                                    <IonCardTitle className='ios card-title'>Eremita dos Números</IonCardTitle>
                                    <IonCardContent className='ios card-description'>Gabarite 50 questionários de matemática</IonCardContent>
                                </CardsConquistas>

                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                <CardsConquistas style={{}} classImg='ios card-image' img={mestrepalavras}>
                                    <IonCardTitle className='ios card-title'>Mestre das Palavras</IonCardTitle>
                                    <IonCardContent className='ios card-description'>Responda 3 questionários de português</IonCardContent>
                                </CardsConquistas>

                                </IonCol>
                                <IonCol>
                                <CardsConquistas style={{}} classImg='ios card-image' img={sabiopalavras}>
                                    <IonCardTitle className='ios card-title'>Sábio das Palavras</IonCardTitle>
                                    <IonCardContent className='ios card-description'>Gabarite 10 questionários de português</IonCardContent>
                                </CardsConquistas>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                <CardsConquistas style={{}} classImg='ios card-image' img={eremitapalavras}>
                                    <IonCardTitle className='ios card-title'>Eremita das Palavras</IonCardTitle>
                                    <IonCardContent className='ios card-description'>Gabarite 50 questionários de português</IonCardContent>
                                </CardsConquistas>
                                </IonCol>

                                <IonCol>
                                <CardsConquistas style={{}} classImg='ios card-image' img={diamond}>
                                    <IonCardTitle className='ios card-title'>Organizador</IonCardTitle>
                                    <IonCardContent className='ios card-description'>Gabarite 10 questionários de português</IonCardContent>
                                </CardsConquistas>
                                </IonCol>
                            </IonRow>
                                <IonCol>
                                <CardsConquistas style={{}} classImg='ios card-image' img={classista}>
                                    <IonCardTitle className='ios card-title'>Classista</IonCardTitle>
                                    <IonCardContent className='ios card-description'>Crie 10 classes</IonCardContent>
                                </CardsConquistas>
                                </IonCol>
                        </IonGrid>

                    </IonCard>

                </IonContent>

            </IonPage>
        </>
    );
}


export default Conquista
