import React, { useState } from 'react';
import {
    IonButton, 
    IonCard, 
    IonCardSubtitle, 
    IonCardTitle,
    IonCol, 
    IonContent, 
    IonFabButton, 
    IonGrid, 
    IonHeader, 
    IonIcon, 
    IonInput, 
    IonItem, 
    IonLabel, 
    IonMenuButton, 
    IonModal, 
    IonPage, 
    IonRow, 
    IonSearchbar, 
    IonText, 
    IonToggle, 
    IonToolbar,
    useIonViewWillEnter
} from '@ionic/react'
import './style.css'
import { arrowUndoSharp, remove } from 'ionicons/icons';
import { useHistory } from 'react-router';
import { menuController } from '@ionic/core';
import { FlashCard } from '../../services/flashCard.service';
import { Timer } from '../Flash-cards/Dissertativa/questaoDisertativa';

const CriarQuestionario:React.FC = ()=>{

    const [textTitle, setTextTitle] = useState<string>('')
    const [showModal2, setShowModal2] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showModalCreate, setShowModalCreate] = useState(false)
    const [cards, setCards] = useState<FlashCard[]>([]);
    const [listCards, setListCards] = useState<FlashCard[]>([]);
    const [searchText, setSearchText] = useState('');
    const [timer, setTimer] = useState<{}>(<Timer/>)
    const [shownTimer, setShownTimer] = useState<boolean>(false);
    const [checked, setChecked] = useState<boolean>(false);
    const history = useHistory()

    const DeleteCard = (id:number)=>{
        const cardDeleted = cards.filter( card=> parseInt(card.id) !== id)
        setCards(cardDeleted)
    }
    useIonViewWillEnter(()=>{
        setCards(cards)
    },[])

    const AddFlashCards = ()=>{

    }
    const getAllFlashCards = ()=>{
        
    }
    return(
        <>
            <IonPage>
            <IonHeader className='custom-header'>
                    <IonToolbar>
                        <IonRow className='row-label'>
                            <IonLabel className="label-menu-fixer-dissertativa">FIXER</IonLabel>
                        </IonRow>
                        <IonFabButton
                            onClick={() => {
                                history.push('/Questionarios')
                                menuController.enable(true);
                            }}
                            slot='start'
                            className="icon-fab-button light"

                            size="small"
                            color="light">
                            <IonIcon icon={arrowUndoSharp} />
                            <IonButton slot='start'>
                                <IonMenuButton></IonMenuButton>
                            </IonButton>
                        </IonFabButton>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonItem style={{borderRadius:'6px'}} className="item-input-dissertativa">
                        <IonInput  value={textTitle} type="text" required className="input-dissertativa" title='insira o título do Questionário' onIonChange={e => setTextTitle(e.detail.value!)} placeholder="Insira o título do Questionário"></IonInput>
                    </IonItem>
                    <IonCard color='light' className='card-buttons'>
                        <IonButton onClick={()=> setShowModal2(true)}  style={{marginBottom:'1.5rem', marginTop:'0.5rem'}} className='buttons-dark' color='dark'>Criar flashcards</IonButton>
                        <IonButton onClick={()=> setShowModal(true)}  style={{marginBottom:'0.5rem'}} className='buttons-dark' color='dark'>Adicionar flashcards</IonButton>
                    </IonCard>
                    <IonModal onDidDismiss={()=> setShowModal2(false)} isOpen={showModal2} cssClass='modal-choose'>
                        <IonButton color='light' className="btn-dissertativa" onClick={() => {
                            setShowModal2(false)                                        
                            history.push('/questaoDissertativa')                        
                            }}>Dissertativa</IonButton>
                        <IonLabel className="label-modal">ou</IonLabel>
                        <IonButton color='light' className="btn-alternativa" onClick={() => {
                            setShowModal2(false)   
                            history.push('/questaoAlternativa')
                            }}>Alternativa</IonButton>
                    </IonModal>
                    <IonModal isOpen={showModal} cssClass='modal-list' onDidDismiss={()=> setShowModal(false)}>
                        <IonRow className='ion-justify-content-center'>
                            <IonLabel className='title-select'>Selecione um flashcard</IonLabel>
                        </IonRow>
                        <IonRow>
                            <IonSearchbar placeholder='Buscar' color='light' className="search-bar"
                                value={searchText}
                                onIonChange={e => setSearchText(e.detail.value!)}>
                                <div className='line'></div>
                            </IonSearchbar>
                        </IonRow>
                        <IonGrid className='back-list'>
                            {listCards.map((card:FlashCard, index)=>{
                                return(
                                    <IonRow key={index}>{card.title}</IonRow>
                                )
                            })}
                        </IonGrid>
                    </IonModal>
                    <IonModal backdropDismiss={false} isOpen={showModalCreate} cssClass='modal-criar'>
                        <IonCardTitle className="div-modal-alternativa">
                            <IonText className="modal-text" color="dark">
                                <IonLabel>Deseja criar mais um Questionário ?</IonLabel>
                            </IonText>
                            <IonCardSubtitle className="header-btn">
                                <IonButton color='light' className="btn-sim" onClick={() => {
                                    history.push('CriarQuestionario')
                                    }}>Sim</IonButton>
                                <IonButton color='light' className="btn-nao" onClick={() => {
                                    setShowModalCreate(false)
                                    history.push('Questionarios')
                                    menuController.enable(true)
                                    }}>Não</IonButton>
                            </IonCardSubtitle>
                        </IonCardTitle>
                    </IonModal>
                    <IonRow className='row-toggle'>
                        <IonLabel color='dark' className='label-timer' >Tempo</IonLabel>
                        <IonToggle checked={checked} onIonChange={(e) => setChecked(e.detail.checked)} className='ios toggle' onClick={() => setShownTimer(!shownTimer)} />
                        
                    </IonRow>
                    <IonRow className='ios row-timer-questionario'>
                        {shownTimer && timer}
                    </IonRow>
                    <IonCard color='light' className='card-list'>
                        {cards.map((card:FlashCard, index)=>{
                            return(
                            <IonRow key={index} className='ion-justify-content-center'>
                                <IonLabel key={card.id} style={{fontWeight:'bold', fontSize:'18px'}} color='dark'>{card.title}</IonLabel>
                            </IonRow>
                            )
                        })}
                        <IonRow>
                            <IonGrid className='back-list-remove'>
                               <IonRow className='ion-justify-content-center row-label-remove'>Remover</IonRow>
                                    <IonRow>
                                        <IonCol color='dark' className="flash-cards" style={{height:'auto', width:'10rem'}}>Flashcard titulo</IonCol>
                                        <IonFabButton  className='remove-btn' color='light'><IonIcon color='danger' icon={remove}></IonIcon></IonFabButton>
                                    </IonRow>
                                
                
                            </IonGrid>
                        </IonRow>
                    </IonCard>
                    
                    <IonRow style={{ marginTop: '1.7rem'}} className='ios ion-justify-content-center'>
                        <IonButton onClick={()=> setShowModalCreate(true)} className="ios btn-criar-questionario">Criar</IonButton>
                    </IonRow>
                </IonContent>
            </IonPage>
        </>
    )
}

export default CriarQuestionario;