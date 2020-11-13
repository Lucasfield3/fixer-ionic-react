import React, { useEffect, useState } from 'react';
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
    IonFabList, IonButton, IonActionSheet, useIonViewWillEnter, IonCol, useIonViewWillLeave, useIonViewDidLeave, useIonViewDidEnter
} from '@ionic/react'
import { add, menuOutline, trash, share, bookSharp, addSharp, pencilSharp, card } from 'ionicons/icons';
import './style.css'
import { menuController } from '@ionic/core';
import { useHistory } from 'react-router-dom';
import Cards from './Cards/Cards';
import { deleteFlashCard, FlashCard, getFlashCards } from '../../services/flashCard.service';
import { parse } from 'url';

async function openMenu() {
    await menuController.open();
}


const FlashCards: React.FC = () => {

    const [searchText, setSearchText] = useState('');
    const history = useHistory();
    const [showActionSheet, setShowActionSheet] = useState(false);
    const [activeCard, setActiveCard] = useState<FlashCard>()
    const [cards, setCards] = useState<FlashCard[]>([])

    async function getCards() {
        let cardsValues = await getFlashCards()
        setCards(cardsValues)
    }
    useIonViewWillEnter(() => {
        menuController.enable(true);
        getCards()
        
    }, [])
    const handleResponderButton = ()=>{
        if(activeCard?.type === 'alternative'){
            history.push('AnswerAlternativa', activeCard)         
        }else if(activeCard?.type === 'dissertative'){
            history.push('AnswerDissertativa', activeCard)             
        }

    }
    const handleEditFlashCard = ()=>{
        if(activeCard?.type === 'alternative'){
            history.push('EditAlternativa', activeCard)         
        }else if(activeCard?.type === 'dissertative'){
            history.push('EditDissertativa', activeCard)             
        }
    }


    const handleMenu = (card:FlashCard)=>{
        setActiveCard(card)
        setShowActionSheet(true)
    }
    const handleDelete = (card:FlashCard)=>{
        const flashCardDeleted = cards.filter((cardDeleted)=> cardDeleted.id !== card.id )
        deleteFlashCard(card.id)
        setCards(flashCardDeleted)
        console.log(cards)
    }
    return (
        <>
            <IonPage>
                <IonHeader className='custom-header'>
                    <IonToolbar>
                        <IonRow className='row-label'>
                            <IonLabel className="label-menu-fixer">FIXER</IonLabel>
                        </IonRow>
                        <IonFabButton slot='start' onClick={() => openMenu()} className="icon-fab-button dark" size="small" color="dark">
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
                    <IonCard style={{alignItems:cards!.length == 0 && 'center' || 'unset'}} className='container-flashcards'>
                        <IonCol >
                            <IonGrid className='ios grid-flashcards'>
                                {cards.map((card: FlashCard, index) => {
                                    return (
                                        <Cards  title={card.title} key={index} type={card.type === 'alternative' && 'alternativa' || 'dissertativa'} id={card.id} onClick={() => handleMenu(card)} />
                                    )
                                })}
                            </IonGrid>
                            {cards.length == 0 && <Vazio/>|| '' }
                        </IonCol>

                        <IonActionSheet

                            isOpen={showActionSheet}
                            mode={'ios'}
                            onDidDismiss={() => {
                                setShowActionSheet(false)
                                menuController.enable(true);
                            }}
                            cssClass='ios menu-bottom'
                            buttons={[{
                                cssClass: 'custom-icon-lix',
                                text: 'Delete',
                                role: 'destructive',
                                icon: trash,
                                handler: () => {
                                    handleDelete(activeCard!)
                                    menuController.enable(true);
                                }
                            }, {
                                cssClass: 'custom-icon-edit',
                                text: 'Editar',
                                icon: pencilSharp,
                                handler: () => {
                                    handleEditFlashCard()
                                }
                            }, {
                                cssClass: 'custom-icon-answer',
                                text: 'Responder',
                                icon: bookSharp,
                                handler: () => { 
                                    handleResponderButton()
                                }
                            }, {
                                cssClass: 'custom-icon-add',
                                text: 'Adicionar',
                                icon: addSharp,
                                handler: () => {
                                    console.log('Favorite clicked');
                                }
                            }, {
                                cssClass: 'custom-icon-close',
                                text: 'Fechar',
                                icon: 'close',
                                role: 'cancel',
                                handler: () => {
                                    console.log('Cancel clicked');
                                    menuController.enable(true);
                                }
                            }]}
                        >
                        </IonActionSheet>
                    </IonCard>


                    <IonFab style={{ left: '80%' }} vertical="bottom" horizontal="center" slot="fixed" color="dark">
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
                                onClick={() => {
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


const Vazio: React.FC = () => {

    return (
        <>
        <IonLabel className='card-vazio-cards'>
                VAZIO
        </IonLabel>
        </>
    )
}

export default FlashCards;

/* <IonGrid className='align-conquistas'>
                            <IonCardContent className="card-title-menu">

                                <IonRow>
                                    <IonCol>
                                        <IonCard onClick={() => {
                                            history.push('/AnswerAlternativa')
                                        }} className="card-teste" color="ligth">
                                            <IonCardHeader>
                                                <IonCardTitle>Card Title</IonCardTitle>
                                            </IonCardHeader>
                                            <IonCardContent>
                                                Keep close to Nature's heart... and break clear away, once in awhile,
                                                and climb a mountain or spend a week in the woods. Wash your spirit clean....
                                    </IonCardContent>
                                        </IonCard>
                                    </IonCol>
                                </IonRow>









                            </IonCardContent> */