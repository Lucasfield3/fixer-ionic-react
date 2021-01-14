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
    IonFabList, 
    IonButton, 
    IonActionSheet, 
    useIonViewWillEnter, 
    IonCol
} from '@ionic/react'
import { add, menuOutline, trash, bookSharp, addSharp, pencilSharp, card} from 'ionicons/icons';
import './style.css'
import { menuController } from '@ionic/core';
import { useHistory } from 'react-router-dom';
import Cards from './Cards/Cards';
import { deleteFlashCard, FlashCard, getFlashCards } from '../../services/flashCard.service';
import { SearchBar, Vazio, TitleCards, CreateButton, ButtonChoice, CardMenu } from '../styles/Page-default/Page-default-styled';



async function openMenu() {
    await menuController.open();
}


const FlashCards: React.FC = () => {

    const [searchText, setSearchText] = useState('');
    const history = useHistory();
    const [showActionSheet, setShowActionSheet] = useState(false);
    const [activeCard, setActiveCard] = useState<FlashCard>()
    const [cards, setCards] = useState<FlashCard[]>([])
    const status:FlashCard[] = []
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
   

        const filteredCards = status.filter(card=>{
        card.title.toLowerCase().includes(searchText.toLowerCase())
    })

    

   
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

    let cardsFiltered = cards.filter(card =>{
       if(cards){
            return card.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
        }
    })

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
                        <SearchBar placeholder='Buscar' color='light' className="search-bar"
                            value={searchText}
                            onIonChange={e => setSearchText(e.detail.value!)}>
                            <div className='line'></div>
                        </SearchBar>
                    </IonRow>

                    <TitleCards>FlashCards</TitleCards>
                    <IonCard style={{alignItems:cards!.length == 0 && 'center' || 'unset'}} className='container-flashcards'>
                        <IonCol>
                            <IonGrid className='ios grid-flashcards'>
                                {cardsFiltered.map((card: FlashCard, index) => {
                                    return (
                                    <Cards status={filteredCards} text={card.title} title={card.title} key={index} type={card.type === 'alternative' && 'alternativa' || 'dissertativa'} id={card.id} onClick={() => handleMenu(card)}>{filteredCards}</Cards>
                                    )
                                })}
                            </IonGrid>
                            {cards.length == 0 && <Vazio/>|| '' }
                        </IonCol>
                        <CardMenu onDidDismiss={()=>{       
                                setShowActionSheet(false)
                                menuController.enable(true);
                        }} 
                        isOpen={showActionSheet}
                        handlerDelete={()=>{
                            handleDelete(activeCard!)
                            menuController.enable(true);
                        }}
                        handlerEdit={()=>handleEditFlashCard()}
                        handlerAnswer={()=>handleResponderButton()}
                        handlerAdd={()=> console.log('Favorite clicked')}
                        handlerClose={()=>menuController.enable(true)}
                        />
                        
                    </IonCard>


                    <CreateButton onClick={()=>{
                        history.push('/questaoDissertativa')
                        menuController.enable(false)}}>                          
                            <ButtonChoice
                                onClick={()=>{
                                    history.push('/questaoDissertativa')
                                    menuController.enable(false)

                                }}
                                size="small"
                                color="dark">
                                    Dissertativa
                            </ButtonChoice>
                            <IonLabel className="ion-label-choise">Ou</IonLabel>
                            <ButtonChoice
                                onClick={() => {
                                    history.push('/questaoAlternativa')
                                    menuController.enable(false)
                                }}
                                className="ButtonChoise"
                                size="small"
                                color="dark">
                                Alternativa
                            </ButtonChoice>
                    </CreateButton>
                </IonContent>
            </IonPage>
        </>
    );

}



export default FlashCards;

