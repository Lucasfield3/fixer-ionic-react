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
    IonFabList, IonButton, IonCardContent, IonCardTitle, IonCol, IonActionSheet, useIonViewWillEnter
} from '@ionic/react'
import { add, menuOutline, trash, share, bookSharp, addSharp, pencilSharp} from 'ionicons/icons';
import './style.css'
import { menuController } from '@ionic/core';
import { useHistory } from 'react-router-dom';
import Cards from './Cards/Cards';
import { get } from 'http';
import { FlashCard, getFlashCards } from '../../services/flashCard.service';

async function openMenu() {
    await menuController.open();
}


const FlashCards: React.FC = () => {

    const [searchText, setSearchText] = useState('');
    const history = useHistory();
    const [showActionSheet, setShowActionSheet] = useState(false);

    const [cards, setCards] = useState<FlashCard[]>([])
    async function getCards() {
        let cardsValues = await getFlashCards()
        setCards(cardsValues)
    }
    useIonViewWillEnter(()=>{

     getCards()

    },[])
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
                        <IonGrid className='ios grid-cards'> 
                            {cards.map((card: FlashCard, index)=>{
                                return(                               
                                  <Cards title={card.title} key={index} type={card.type} id={card.id} onClick={()=>setShowActionSheet(true)}/>
                                )                                         
                            })}                                            
                        
                        </IonGrid>

                   
                    <IonActionSheet
                    isOpen={showActionSheet}
                    onDidDismiss={() => setShowActionSheet(false)}
                    cssClass='ios my-custom-class'
                    buttons={[{
                    text: 'Delete',
                    role: 'destructive',
                    icon: trash,
                    handler: () => {
                        console.log('Delete clicked');
                    }
                    }, {
                    text: 'Editar',
                    icon: pencilSharp,
                    handler: () => {
                        console.log('Share clicked');
                    }
                    }, {
                    text: 'Responder',
                    icon: bookSharp,
                    handler: () => {
                        history.push('/AnswerAlternativa')
                    }
                    }, {
                    text: 'Adicionar',
                    icon: addSharp,
                    handler: () => {
                        console.log('Favorite clicked');
                    }
                    }, {
                    text: 'Fechar',
                    icon: 'close',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
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


const Vazio:React.FC = ()=>{

    return(
        <>
        <IonLabel className='card-vazio'>
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