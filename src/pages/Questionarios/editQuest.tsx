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
    IonIcon, 
    IonInput, 
    IonItem, 
    IonLabel, 
    IonModal, 
    IonPage, 
    IonRow, 
    IonText, 
    useIonViewWillEnter
} from '@ionic/react'
import './style.css'
import { remove } from 'ionicons/icons';
import { useHistory } from 'react-router';
import { menuController } from '@ionic/core';
import { FlashCard } from '../../services/flashCard.service';
import { ButtonArrow,  ContainerList, HeaderDefault, RowBtnCreate, RowTimer, SearchBar, Timer } from '../styles/Page-default/Page-default-styled';
import { useForm } from 'react-hook-form';



export const EditQuest:React.FC = () =>{

    const [textTitle, setTextTitle] = useState<string>('')
    const [showModal2, setShowModal2] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showModalCreate, setShowModalCreate] = useState(false)
    const [cards, setCards] = useState<FlashCard[]>([]);
    const [listCards, setListCards] = useState<FlashCard[]>([]);
    const [searchText, setSearchText] = useState('');
    const [time, setTime] = useState<string>(':');
    const [shownTimer, setShownTimer] = useState<boolean>(false);
    const [checked, setChecked] = useState<boolean>(false);
    const history = useHistory()

    const { register, handleSubmit, setValue, getValues } = useForm()

    const onSubmit = (data:FlashCard) =>{
        console.log(data)
    }

    const DeleteCard = (id:number)=>{
        const cardDeleted = cards.filter( card=> parseInt(card.id) !== id)
        setCards(cardDeleted)
    }
    useIonViewWillEnter(()=>{
        setCards(cards)
    },[])

    return(
        <>
            <IonPage>
                <HeaderDefault>
                    <ButtonArrow onClick={() => {
                            history.push('/Questionarios')
                            menuController.enable(true);
                            setChecked(false)
                            setShownTimer(false)
                        }}/>
                </HeaderDefault>
                <IonContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <IonItem className="item-input-title">
                            <IonInput  value={textTitle} type="text" required className="input-title" ref={register({required:true})} onIonChange={e => setTextTitle(e.detail.value!)} placeholder="Insira o título do Questionário"></IonInput>
                        </IonItem>
                        <IonCard color='light' className='card-buttons'>
                            <IonButton onClick={()=> setShowModal2(true)}  style={{marginBottom:'1.5rem', marginTop:'0.5rem'}} className='buttons-dark' color='dark'>Criar flashcards</IonButton>
                            <IonButton onClick={()=> setShowModal(true)}  style={{marginBottom:'0.5rem'}} className='buttons-dark' color='dark'>Adicionar flashcards</IonButton>
                        </IonCard>
                            <IonModal onDidDismiss={()=> setShowModal2(false)} isOpen={showModal2} cssClass='modal-choose'>
                                <IonButton color='light' className="btn-choose" onClick={() => {
                                    setShowModal2(false)                                        
                                    history.push('/CriarDissertativaQuest')                        
                                    }}>Dissertativa</IonButton>
                                <IonLabel className="label-modal">ou</IonLabel>
                                <IonButton color='light' className="btn-choose" onClick={() => {
                                    setShowModal2(false)   
                                    history.push('/CriarAlternativaQuest')
                                    }}>Alternativa</IonButton>
                            </IonModal>
                            <IonModal isOpen={showModal} cssClass='ios modal-list' onDidDismiss={()=> setShowModal(false)}>
                                <IonRow className='ion-justify-content-center'>
                                    <IonLabel className='title-select'>Selecione um flashcard</IonLabel>
                                </IonRow>
                                <IonRow>
                                    <SearchBar placeholder='Buscar' color='light' mode='md' className="ios search-bar-modal"
                                        value={searchText}
                                        onIonChange={e => setSearchText(e.detail.value!)}>
                                        <div className='line'></div>
                                    </SearchBar>
                                </IonRow>
                                <IonGrid className='back-list'>
                                        <IonRow>
                                            <IonLabel className='list-quest'>Título Flashcard</IonLabel>
                                        </IonRow>
                                    {listCards.map((card:FlashCard, index)=>{
                                        return(
                                            <IonLabel key={index} className='list-quest'>{card.title}</IonLabel>
                                        )
                                    })}
                                </IonGrid>
                            </IonModal>
                            <IonModal backdropDismiss={false} isOpen={showModalCreate} cssClass='ios modal-criar'>
                                <IonCardTitle className="div-modal-alternativa">
                                    <IonText className="modal-text" color="dark">
                                        <IonLabel>Deseja criar mais um Questionário ?</IonLabel>
                                    </IonText>
                                    <IonCardSubtitle className="btn-modalDefault">
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
                            <RowTimer 
                            onIonChange={(e) => setChecked(e.detail.checked)}
                            onClick={() => {
                                setShownTimer(!shownTimer)
                                setTime('')
                            }}
                            checked={checked}
                            style={{}}
                            >
                                {shownTimer && <Timer  value={time} onChange={(event) => setTime(event.target.value!)} />}
                            </RowTimer>
                            <ContainerList style={{height:'11.5rem', marginTop:'2rem'}}  title='Flash cards'>
                                <IonRow>
                                    <IonGrid  className='back-list-remove'>
                                        <IonRow className='ion-justify-content-center row-label-remove'>Remover</IonRow>
                                        <IonRow>
                                            <IonCol color='dark' className="flash-cards" style={{height:'auto', width:'10rem'}}>Título Flashcards</IonCol>
                                            <IonFabButton  className='remove-btn' color='light'><IonIcon color='danger' icon={remove}></IonIcon></IonFabButton>
                                        </IonRow>
                                        {cards.map((card:FlashCard, index)=>{
                                            return(
                                                <IonRow  key={index} className='ion-justify-content-center'>
                                                    <IonCol key={card.id} color='dark' className="flash-cards" style={{height:'auto', width:'10rem'}}>{card.title}</IonCol>
                                                    <IonFabButton  className='remove-btn' color='light'><IonIcon color='danger' icon={remove}></IonIcon></IonFabButton>
                                                </IonRow>
                                            )
                                        })}
                                    </IonGrid>
                                </IonRow>
                            </ContainerList>
                            <RowBtnCreate style={{marginTop: '1.7rem' }} >Criar</RowBtnCreate>
                    </form>
                </IonContent>
            </IonPage>
        </>
    )
}

export default EditQuest;