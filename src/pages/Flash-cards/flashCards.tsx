import React, { useCallback, useState } from 'react';
import { 
    IonPage,
    IonRow,  
    IonLabel,
    IonContent, 
    useIonViewWillEnter, 

} from '@ionic/react'
import { menuController } from '@ionic/core';
import { useHistory } from 'react-router-dom';
import Cards from './Cards/Cards';
import { deleteFlashCard, FlashCard, getAllFlashCards } from '../../services/flashCard.service';
import { 
    SearchBar, 
    Vazio, 
    TitleCards, 
    CreateButton, 
    ButtonChoice, 
    CardMenu, 
    HeaderDefault, 
    ButtonMenuDark, 
    ContainerCards 
} from '../styles/Page-default/Page-default-styled';



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
        let cardsValues = await getAllFlashCards()
        setCards(cardsValues)
    }

    useIonViewWillEnter(() => {
        // const fetchData = async ()=>{
        //     let cardsValues = await getAllFlashCards()
        //     setCards(cardsValues)
        // }
        // menuController.enable(true);
        
        if(cards) getCards()
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
        deleteFlashCard(card.id!)
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
            <HeaderDefault>
                <ButtonMenuDark onClick={()=>openMenu()}/>
            </HeaderDefault>
                <IonContent>
                    <IonRow>
                        <SearchBar placeholder='Buscar' color='light' className="search-bar"
                            value={searchText}
                            onIonChange={e => setSearchText(e.detail.value!)}>
                            <div className='line'></div>
                        </SearchBar>
                    </IonRow>

                    <TitleCards>FlashCards</TitleCards>
                    <ContainerCards style={{
                        display:cards!.length == 0 && 'flex' || 'block',
                        flexDirection:cards!.length == 0 && 'column' || 'unset'
                        }}>
                                {cardsFiltered.map((card: FlashCard, index) => {
                                    return (
                                    <Cards 
                                    status={filteredCards} 
                                    // text={card.title} 
                                    title={card.title} 
                                    key={index} 
                                    type={card.type === 'alternative' && 'alternativa' || 'dissertativa'} 
                                    id={card.id!} 
                                    onClick={() => handleMenu(card)}>
                                        {filteredCards}
                                    </Cards>
                                    )
                                })}
                            {cards.length == 0 && <Vazio/>|| '' }
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
                    </ContainerCards>


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

