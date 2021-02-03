import React, { useState } from 'react';
import {
    IonButton,
    IonPage,
    IonRow,
    IonFabButton,
    IonIcon,
    IonHeader,
    IonMenuButton,
    IonToolbar,
    IonLabel,
    IonContent, 
    IonItem, 
    IonInput, 
    IonTextarea, 
    IonToggle, 
    IonCol,  
    IonGrid, 
    IonCardTitle,
    IonModal, 
    IonText,
    useIonViewWillLeave,
    useIonViewWillEnter
} from '@ionic/react'
import { add, arrowUndoSharp, timerOutline, remove } from 'ionicons/icons';
import './style.css'
import { menuController } from '@ionic/core';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import {  Payload, Alternative, NewAlternative, FlashCard, putFlashCard, getRightAnswer } from '../../../services/flashCard.service';
import { getPayload} from '../../../services/Authentication.service';
import Limitedalternativa from '../../../components/CardMessages/msg_limite_alternativa';
import { CardQuestion, RowBtnCreate, Timer } from '../../styles/Page-default/Page-default-styled';



const EditAlternativa: React.FC = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory()
    const [textTitle, setTextTitle] = useState<string>('')
    const [textAreaQuestion, setTextAreaQuestion] = useState<string>('')
    const [textMat, setTextMat] = useState<string>('')
    const [enunciated, setEnunciated] = useState<string>('')
    const [checked, setChecked] = useState<boolean>(false);
    const [shownTimer, setShownTimer] = useState<boolean>(false);
    const [showPopover, setShowPopover] = useState<boolean>(false);
    const [showPopLimit, setShowPopLimit] = useState<boolean>(false);
    const [shownPopsave, setShownPopsave]= useState<boolean>(false);
    const [textPop, setTextPop] = useState<string>('')
    const [showModal, setShowModal] = useState(false)
    const [textRightAnswer, setTextRightAnswer] = useState<string>('')
    const [idFlashCard, setIdFlashCard] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')
    const [themes, setThemes] = useState<string[]>([]);
    const [alternatives, setAlternatives] = useState<NewAlternative[]>([]);
    const [time, setTime] = useState<string>(':');
    const popOverSave = () => {
        setShownPopsave(true);
        setTimeout(() => {
            setShownPopsave(false);
            setShowPopover(false);
        }, 1000)
    }

    const AddTema = () => {
        if (textPop !== '') {
            setThemes([...themes, textPop])
        }
    }
    const AddAlternative = () => {
        setAlternatives([...alternatives, {answer:answer}])
        if(alternatives.length == 4){
            setAlternatives(alternatives)
      
        }
        setAnswer('')
    }



    const DeleteAlternatives = (answer:string) => {
        let alternativeToBedeleted = alternatives.filter(alternative => alternative.answer !== answer);
        setAlternatives(alternativeToBedeleted)
    }
    const removeRightAnswerOfAlternative = (answer:string) =>{ 
        const card = history.location.state as FlashCard         
        console.log(card.alternatives!)
        let alternativeDeleted = card.alternatives!.filter(alternative => alternative.answer !== answer)
        setAlternatives(alternativeDeleted)

    }
    const DeleteTema = (id:string) => {
       const themeDeleted =  themes.filter((theme)=> id !== theme)
       setThemes(themeDeleted)
    }
    async function getAnswer(id:string){
        const rightAnswer = await getRightAnswer(id) as string     
        setTextRightAnswer(rightAnswer)
        removeRightAnswerOfAlternative(rightAnswer)
    }
    useIonViewWillEnter(()=>{
        if (history.location.state) {
            const card = history.location.state as FlashCard
            console.log(card)
            setTextTitle(card.title)
            setTextMat(card.subject)
            setThemes(card.themes)
            setTextAreaQuestion(card.enunciated)
            setAlternatives(card.alternatives!)
            setIdFlashCard(card.id)
            getAnswer(card.id)
        } else {
            console.log('Não tem nada');
        }
    },[])
    useIonViewWillLeave(()=>{
        menuController.enable(true)   
    }, [])
    
    const handleSaveButton = async ()=>{
        const payLoad = getPayload() as Payload
        let alternativesSend:NewAlternative[] = []
        let temasSend:string[] = []
        themes.map((t:string)=>{
            temasSend.push(t)
        })
        alternatives?.map((a)=>{
            alternativesSend.push({answer:a.answer})
        })
        alternativesSend.push({answer:textRightAnswer})
        if(textAreaQuestion !== '' && textTitle !== ''){
            await putFlashCard(
               { creator:payLoad.id,
                enunciated:textAreaQuestion,
                subject:textMat,
                alternatives:alternativesSend,
                title:textTitle,
                themes:temasSend,
                id:idFlashCard,
                answerFlashCard:textRightAnswer
                }
            )

        }
            setShowModal(true)

    }

    return (
        <>
            <IonPage>
                <IonHeader className='custom-header'>
                    <IonToolbar>
                        <IonRow className='row-label'>
                            <IonLabel className="label-menu-fixer">FIXER</IonLabel>
                        </IonRow>
                        <IonFabButton
                            onClick={() => {
                                history.push('/Flash-cards')
                                menuController.enable(true);
                                setThemes([])                              
                                setChecked(false)
                                setShownTimer(false)
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
                    <CardQuestion
                    onIonChangeTitle={e => setTextTitle(e.detail.value!)}
                    valueTitle={textTitle}
                    onClickTheme={() => setShowPopover(true)}
                    isOpenThemes={showPopover}
                    onDidDismissTheme={e => setShowPopover(false)}
                    onIonChangeTheme={e => setTextPop(e.detail.value!)}
                    valueTextPop={textPop}
                    onClickAddTheme={() => {
                        AddTema()
                        setTextPop('')
                    }}
                    onClickSaveBtn={() => popOverSave()}
                    onClickCleanBtn={() => {
                        setShowPopover(false)
                        setThemes([])
                        setTextPop('')
                    }}
                    isOpenSaveTheme={shownPopsave}
                    onDidDismissSave={() => {
                        setShowPopover(false)
                        setShowPopover(false)
                    }}
                    valueSubj={textMat}
                    onIonChangeSubj={e => setTextMat(e.detail.value!)}
                    onIonChangeQuestion={e => {
                        setTextAreaQuestion(e.detail.value!)
                    }}
                    valueEnunciated={textAreaQuestion}
                   >
                     {themes.map((theme, index)=> (
                        <IonRow key={index} style={{ cursor: 'default', marginTop: '1rem' }} className='ion-justify-content-center'>
                            <IonCol key={index} className='ios temas-inputs' color='dark'>{theme}</IonCol>
                            <IonFabButton onClick={() => DeleteTema(theme)} className='remove-btn' color='light'><IonIcon color='danger' icon={remove}></IonIcon></IonFabButton>
                        </IonRow>
                    ))}
                   </CardQuestion>

                    <IonModal backdropDismiss={false} isOpen={showModal} cssClass='ios modal-criar'>
                        <IonCardTitle className="div-modal-alternativa">
                            <IonText className="modal-text" color="dark">
                                <IonLabel>Alterações salvas</IonLabel>
                            </IonText>
                            <IonRow className='ion-justify-content-center'>
                                <IonButton color='light' className="btn-edit" onClick={() => {
                                setShowModal(false)                        
                                history.push('/Flash-cards')                        
                                }}>Ok</IonButton>
                            </IonRow>
                        </IonCardTitle>
                    </IonModal>

                    <IonGrid className='array-div'>
                        <IonRow style={{marginBottom:'1rem'}} className='ion-justify-content-center'>
                                    <IonTextarea 
                                    maxlength={240}
                                    autoGrow={textRightAnswer == '' && false || true} 
                                    style={{height: textRightAnswer == '' && '4rem' || 'auto'}} 
                                    className='ios alternativa-correta' 
                                    placeholder='Insira a alternativa correta' 
                                    color='dark' 
                                    onIonChange={e => {
                                        setTextRightAnswer(e.detail.value!)
                                    }} 
                                    value={textRightAnswer}
                                    >
                                    </IonTextarea>
                        </IonRow>
                        <IonRow  className='ion-justify-content-center'>
                                <IonTextarea autoGrow={true} className='ios add-alternativas'  placeholder='Insira a/as alternativas' color='dark'  onIonChange={e => setAnswer(e.detail.value!)} value={answer}></IonTextarea>
                                <IonFabButton id='add-alternative' className='add-btn'  onClick={()=> {            
                                    AddAlternative()                                 
                                    }} color='light'><IonIcon color='success' icon={add}></IonIcon></IonFabButton>
                        </IonRow>                       
                            {alternatives.map((alternative:Alternative, index)=>(
                                <IonRow key={index} style={{cursor:'default', marginTop:'1rem'}}  className='ion-justify-content-center colunas'>
                                    <IonCol style={{height:'auto', width:'10rem'}} key={index} className='alternativas' color='dark' placeholder='alternativas'>{alternative.answer}</IonCol>
                                    <IonFabButton  onClick={()=>DeleteAlternatives(alternative.answer)} className='remove-btn'  color='light'><IonIcon color='danger' icon={remove}></IonIcon></IonFabButton>
                                </IonRow>
                            ))}                       
                    </IonGrid>
                       
                    <IonRow className='row-toggle'>                                            
                        <IonLabel color='dark' className='label-timer' >Tempo</IonLabel>                        
                        <IonToggle checked={checked} onIonChange={(e)=>setChecked(e.detail.checked)} className='ios toggle' onClick={()=>setShownTimer(!shownTimer)}/>                 
                    </IonRow>
                    <IonRow className='ios row-timer'>
                    {shownTimer && <Timer value={time} onChange={(event) => setTime(event.target.value!)} />}
                    </IonRow>
                    <Limitedalternativa 
                    onClick={()=> setShowPopLimit(false)} 
                    isOpen={showPopLimit} 
                    onDidDismiss={()=>setShowPopLimit(false)} />
                   <RowBtnCreate onClick={()=> handleSaveButton()}>Salvar</RowBtnCreate>
                </IonContent>

            </IonPage>
        </>
    );

}

export default EditAlternativa;