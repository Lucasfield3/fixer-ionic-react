import React, { ChangeEvent, useState } from 'react';
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
    IonTextarea, 
    useIonViewWillEnter,
    useIonViewWillLeave
} from '@ionic/react'
import './style.css'
import { add, remove } from 'ionicons/icons';
import { useHistory } from 'react-router';
import { menuController } from '@ionic/core';
import { FlashCard, getAllFlashCards, NewAlternative, NewFlashCard, Payload } from '../../services/flashCard.service';
import { ButtonArrow,  CardQuestion,  ContainerList, GridAlternatives, HeaderDefault, RowBtnCreate, RowTimer, SearchBar, Timer } from '../styles/Page-default/Page-default-styled';
import { Controller, useForm } from 'react-hook-form';
import { createQuest, FlashCardFromQuest, Questionnaires } from '../../services/Questionnaires.service';
import { getPayload } from '../../services/Authentication.service';


const CriarQuestionario:React.FC = ()=>{

    const [textTitle, setTextTitle] = useState<string>('')
    const [showModal2, setShowModal2] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showModalCreate, setShowModalCreate] = useState(false)
    const [showModalAlternative, setShowModalAlternative] = useState(false)
    const [cards, setCards] = useState<NewFlashCard[]>([]);
    const [listCards, setListCards] = useState<FlashCard[]>([]);
    const [searchText, setSearchText] = useState('');
    const [time, setTime] = useState<string>(':');
    const [shownTimer, setShownTimer] = useState<boolean>(false);
    const [checked, setChecked] = useState<boolean>(false);
    const [timeModalAlt, setTimeModalAlt] = useState<string>(':');
    const [shownTimerModalAlt, setShownTimerModalAlt] = useState<boolean>(false);
    const [checkedModalAlt, setCheckedModalAlt] = useState<boolean>(false);
    const [showPopover, setShowPopover] = useState<boolean>(false);
    const [showPopLimit, setShowPopLimit] = useState<boolean>(false);
    const [shownPopsave, setShownPopsave] = useState<boolean>(false);
    const [textRightAnswer, setTextRightAnswer] = useState<string>('')
    const [enunciated, setEnunciated] = useState<string>('')
    const [subject, setSubject] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [checkStyle, setCheckStyle] = useState<boolean>()
    const [idFlashCard, setIdFlashCard] = useState<string>('')
    let tema = {
        id:0,
        textPop:''
    };
    const [themes, setThemes] = useState([tema]);
    let newAlternative:NewAlternative= {
        answer:''
    }
    const [alternatives, setAlternatives] = useState<NewAlternative[]>([newAlternative]);
    const history = useHistory()

   

    const DeleteCard = (id:number)=>{
        const cardDeleted = cards.filter( card=> parseInt(card.id!) !== id)
        setCards(cardDeleted)
    }

    useIonViewWillEnter(()=>{
        setCards([])
    },[])
    useIonViewWillLeave(()=>{
        setCards([])
        
    },[])

    const AddTema = () => {
        const inputValue = getValues(`themes[${tema.id}].textPop`)
        setThemes([...themes, {
            id:themes.length,
            textPop: inputValue
        }
        ])
        if(inputValue == ''){
            setThemes(themes)
        }
        console.log(themes)
    }

    const RemoveTema = (id: number) => {
        const themeToBedeleted = themes.filter(theme => theme.id !== id);
        setThemes(themeToBedeleted)
    }
  

    const popOverSave = () => {
        setShownPopsave(true);
        setTimeout(() => {
            setShownPopsave(false);
            setShowPopover(false);
        }, 1000)
    }

    const AddAlternative = () => {
        const inputValue = getValues(`alternatives[${newAlternative.answer}].answer`)
        setAlternatives([...alternatives, { answer: inputValue }])
        console.log(inputValue)
        if (alternatives.length == 4 || inputValue === '') {
            setAlternatives(alternatives)
        }
    }

    const AddFlashCard = () => {
        const payLoad = getPayload() as Payload
        const themesSend = [] as string[]
        const alternativesSend = [] as NewAlternative[]
        alternatives.map((a) =>{
            alternatives.push({answer:a.answer})
        })
        alternativesSend.push({answer:textRightAnswer})
        themes.map((theme)=>{
            themesSend.push(theme.textPop)
        })
        ShuffleAlternativas(alternativesSend)
        setCards([...cards, { 
            title:title,
            enunciated:enunciated,
            id:idFlashCard,
            subject:subject,
            themes:themesSend,
            alternatives:alternativesSend,
            creator:payLoad.id,
            answerFlashCard:textRightAnswer
        }])
        console.log({title})
    }

    const ShuffleAlternativas = ( alternativesSend: NewAlternative[]) => {

        for(let i =  alternativesSend.length -1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            const temp =  alternativesSend[i];
             alternativesSend[i] =  alternativesSend[j];
             alternativesSend[j] = temp;
        }
        return  alternativesSend;
    }

    const RemoveAlternative = (index:number) =>{
        setAlternatives([...alternatives.slice(0, index), ...alternatives.slice(index + 1)])
    }
    const RemoveFlashCards = (index:number) =>{
        setCards([...cards.slice(0, index), ...cards.slice(index + 1)])
    }

    const ClearInputsModal = ()=>{
        setAlternatives([])
        setEnunciated('')
        setSubject('')
        setTitle('')
        setTextRightAnswer('')
        setThemes([])
        setTimeModalAlt('')
    }
    const ClearInputQuest = ()=>{
        setCards([])
        setValue('title', '')
    }

    const { register, handleSubmit, errors, setValue, getValues, control} = useForm()

    const onSubmit = async (data:Questionnaires) =>{
        const payLoad = getPayload() as Payload
        const flashCardsSend = [] as string[]
        cards.map((card)=>{
            flashCardsSend.push(card.title)
        })
        data.creator.id = payLoad.id
        data.time = convertTime()
        createQuest(data)
    }

    const convertTime = () => {
        const [minutes, seconds] = time.split(':').map(Number)
        const timeInSeconds = (minutes * 60) + seconds
        console.log(time)
        console.log(timeInSeconds * 1000)
        return timeInSeconds * 1000

    }

    

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
                            <IonInput  value={textTitle} type="text" required className="input-title" name='title' ref={register({required:true})} onIonChange={e => setTextTitle(e.detail.value!)} placeholder="Insira o título do Questionário"></IonInput>
                        </IonItem>
                        <IonCard color='light' className='card-buttons'>
                            <IonButton onClick={()=> setShowModal2(true)}  style={{marginBottom:'1.5rem', marginTop:'0.5rem'}} className='buttons-dark' color='dark'>Criar flashcards</IonButton>
                            <IonButton onClick={()=> setShowModal(true)}  style={{marginBottom:'0.5rem'}} className='buttons-dark' color='dark'>Adicionar flashcards</IonButton>
                        </IonCard>
                            <IonModal onDidDismiss={()=> setShowModal2(false)} isOpen={showModal2} cssClass='modal-choose'>
                                <IonButton color='light' className="btn-choose" onClick={() => {
                                    setShowModal2(false)  
                                    setShowModalCreate(false)                                      
                                    ClearInputsModal()                       
                                    }}>Dissertativa</IonButton>
                                <IonLabel className="label-modal">ou</IonLabel>
                                <IonButton color='light' className="btn-choose" onClick={() => {
                                    setShowModal2(false)  
                                    setShowModalCreate(false)    
                                    setShowModalAlternative(true)
                                    ClearInputsModal()   
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

                            <IonModal  isOpen={showModalCreate} cssClass='ios modal-criar'>
                                <IonCardTitle className="div-modal-alternativa">
                                    <IonText className="modal-text" color="dark">
                                        <IonLabel>Deseja criar mais um Questionário ?</IonLabel>
                                    </IonText>
                                    <IonCardSubtitle className="btn-modalDefault">
                                        <IonButton color='light' className="btn-sim" onClick={() => {
                                            setShowModalCreate(false)
                                            ClearInputQuest()
                                            }}>Sim</IonButton>
                                        <IonButton color='light' className="btn-nao" onClick={() => {
                                            setShowModalAlternative(false)
                                            ClearInputQuest()
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
                                            {/* <IonCol color='dark' className="flash-cards" style={{height:'auto', width:'10rem'}}>Título Flashcards</IonCol>
                                            <IonFabButton  className='remove-btn' color='light'><IonIcon color='danger' icon={remove}></IonIcon></IonFabButton> */}
                                        </IonRow>
                                        {cards.map((card:NewFlashCard, index)=>{
                                            return(
                                                <IonRow style={{marginBottom:'0.5rem'}} key={index} className='ion-justify-content-center'>
                                                    <IonCol key={card.id} color='dark' className="flash-cards" style={{height:'auto', width:'10rem'}}>{card.title}</IonCol>
                                                    <IonFabButton onClick={()=>RemoveFlashCards(index)} className='remove-btn' color='light'><IonIcon color='danger' icon={remove}></IonIcon></IonFabButton>
                                                </IonRow>
                                            )
                                        })}
                                    </IonGrid>
                                </IonRow>
                            </ContainerList>
                            <RowBtnCreate onClick={()=> null} style={{marginTop: '1.7rem' }}>Criar</RowBtnCreate>
                    </form>
                    <IonModal backdropDismiss={false} onDidDismiss={()=> {
                                setShowModalAlternative(false)
                                ClearInputsModal()
                                }} isOpen={showModalAlternative} cssClass='ios modal-alternativa'>
                                <CardQuestion
                                    onIonChange={(event:CustomEvent)=>setTitle(event.detail.value)}
                                    onClickTheme={() => setShowPopover(true)}
                                    isOpenThemes={showPopover}
                                    onDidDismissTheme={e => setShowPopover(false)}
                                    onClickSaveBtn={() => popOverSave()}
                                    onClickCleanBtn={() => {
                                        setShowPopover(false)
                                        setThemes([])
                                    }}
                                    isOpenSaveTheme={shownPopsave}
                                    onDidDismissSave={() => {
                                        setShowPopover(false)
                                        setShowPopover(false)
                                    }}
                                    refEnunciated={register({required:true})}
                                    refSub={register({required:false})}
                                    refTitle={register({required:true})}
                                    titleForQuest={title}
                                    subjectForQuest={subject}
                                    enunciatedForQuest={enunciated}
                                >
                                    <IonRow className='ion-justify-content-center'>
                                        <IonInput maxlength={100} className='ios add-temas' placeholder='Tema' color='dark' name={`themes[${tema.id}].textPop`} ref={register({required:false})}   type='text'></IonInput>
                                        <IonFabButton className='add-btn' onClick={() => {
                                            AddTema()
                                            setValue(`themes[${tema.id}].textPop`, '')
                                        }} color='light'><IonIcon color='success' icon={add}></IonIcon></IonFabButton>
                                    </IonRow>
                                    {themes.map((theme, index) => (
                                            <IonRow key={index} style={{ cursor: 'default', marginTop: '1rem'}} className='ion-justify-content-center'>
                                                <Controller as={<IonInput key={index} className='ios temas-inputs'  disabled  color='dark'></IonInput>} 
                                                name={`themes[${index}].textPop`}
                                                control={control}
                                                defaultValue={theme.textPop}
                                                />
                                                <IonFabButton onClick={() => RemoveTema(theme.id)} className='remove-btn' color='light'><IonIcon color='danger' icon={remove} ></IonIcon></IonFabButton>
                                            </IonRow>
                                        ))}
                                </CardQuestion>

                                <GridAlternatives
                                styleGrid={{width:'97%', overflowY:'auto'}}                         
                                style={{height: textRightAnswer == '' && '4rem' || 'auto'}}
                                refAlternatives={register({required:true})}
                                refAnswer={register({required:true})}
                                autoGrow={textRightAnswer == '' && false || true}
                                nameAnswerFlashCard='answerFlashCard'
                                >
                                    <IonRow  className='ion-justify-content-center'>
                                        <IonTextarea  className='ios add-alternativas'  
                                        placeholder='Insira a/as alternativas' 
                                        color='dark' ref={register({required:false})} 
                                        name={`alternatives[${newAlternative.answer}].answer`}>                         
                                        </IonTextarea>
                                        <IonFabButton id='add-alternative' className='add-btn'  onClick={()=>{
                                            AddAlternative()
                                            console.log(newAlternative.answer)
                                            setValue(`alternatives[${newAlternative.answer}].answer`, '')
                                        }} color='light'><IonIcon color='success' icon={add}></IonIcon></IonFabButton>
                                    </IonRow>
                                    {alternatives.map((alternative:NewAlternative, index)=>(
                                        <IonRow key={index} style={{cursor:'default', marginTop:'1rem'}}  className='ion-justify-content-center colunas'>
                                            <Controller as={<IonInput style={{height:'auto', width:'10rem'}} disabled key={index} className='alternativas' color='dark'  placeholder='alternativas'></IonInput>} 
                                            name={`alternatives[${alternative.answer}].answer`}
                                            defaultValue={alternative.answer}
                                            control={control}
                                            />
                                            <IonFabButton  onClick={()=>RemoveAlternative(index)} className='remove-btn'  color='light'><IonIcon color='danger' icon={remove} ></IonIcon></IonFabButton>              
                                        </IonRow>
                                    ))}       
                                </GridAlternatives>
                                <RowTimer 
                                onIonChange={(e) => setCheckedModalAlt(e.detail.checked)}
                                onClick={() => {
                                    setShownTimerModalAlt(!shownTimerModalAlt)
                                    setTimeModalAlt('')
                                }}
                                checked={checkedModalAlt}
                                style={{marginTop: '-0.8rem'}}
                                >
                                    {shownTimerModalAlt && <Timer  value={timeModalAlt} onChange={(event) => setTimeModalAlt(event.target.value!)} />}
                                </RowTimer>
                                <RowBtnCreate onClick={()=> {
                                    AddFlashCard()
                                    ClearInputsModal()
                                    setShowModalAlternative(false)
                                    }} style={{marginTop:'-11.3rem'}}>Criar</RowBtnCreate>
                            </IonModal>
                </IonContent>
            </IonPage>
        </>
    )
}

export default CriarQuestionario;