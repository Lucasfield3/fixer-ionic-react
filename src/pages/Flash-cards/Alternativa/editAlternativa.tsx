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
    IonCard, 
    IonCardContent,
    IonTextarea, 
    IonCardHeader, 
    IonToggle, 
    IonCol,  
    IonGrid, 
    IonPopover,  
    IonCardSubtitle, 
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
import { createFlashCard, Payload, Alternative, NewAlternative, FlashCard, putFlashCard, getRightAnswer } from '../../../services/flashCard.service';
import { getPayload} from '../../../services/Authentication.service';
import Limitedalternativa from '../../../components/CardMessages/msg_limite_alternativa';
import { getUser } from '../../../services/User.service';



const EditAlternativa: React.FC = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory()
    const [textTitle, setTextTitle] = useState<string>('')
    const [textAreaQuestion, setTextAreaQuestion] = useState<string>('')
    const [textMat, setTextMat] = useState<string>('')
    const [enunciated, setEnunciated] = useState<string>('')
    const [textAreaAlternative, setTextAreaAlternative] = useState<string>('')
    const [timer, setTimer] = useState<{}>(<Timer />)
    const [checked, setChecked] = useState<boolean>(false);
    const [shownTimer, setShownTimer] = useState<boolean>(false);
    const [showPopover, setShowPopover] = useState<boolean>(false);
    const [showPopLimit, setShowPopLimit] = useState<boolean>(false);
    const [shownPopsave, setShownPopsave]= useState<boolean>(false);
    const [textPop, setTextPop] = useState<string>('')
    const [showModal, setShowModal] = useState(false)
    const [showModal2, setShowModal2] = useState(false)
    const [textRightAnswer, setTextRightAnswer] = useState<string>('')
    const [idFlashCard, setIdFlashCard] = useState<string>('')
    //let newAlternative:NewAlternative[] = []
    const [answer, setAnswer] = useState<string>('')
    const [themes, setThemes] = useState<string[]>([]);
    const [alternatives, setAlternatives] = useState<NewAlternative[]>([]);
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
                    <IonItem style={{ borderRadius: '6px' }} className="item-input-dissertativa">
                        <IonInput maxlength={100} value={textTitle} type="text" required className="input-dissertativa" onIonChange={e => setTextTitle(e.detail.value!)} placeholder="Insira o título do Flashcard"></IonInput>
                    </IonItem>

                    <IonCard className='card-dissertativa' color='light'>
                        <IonCardHeader style={{ padding: 0 }}>
                            <IonRow className='ios ion-justify-content-space-between row-header'>
                                <IonButton onClick={() => setShowPopover(true)} className="ios btn-tema-dissertativa">Tema</IonButton>
                                <IonPopover
                                    isOpen={showPopover}
                                    cssClass='temas-custom-edit'
                                    onDidDismiss={e => setShowPopover(false)}
                                >
                                    <IonRow style={{ marginTop: '0.9rem' }} className='ion-justify-content-center'>
                                        <IonLabel style={{ fontWeight: 'bold', fontSize: '18px' }} color='dark'>Adicione um tema</IonLabel>
                                    </IonRow>
                                    <IonGrid className='back-temas'>
                                        <IonRow className='ion-justify-content-center'>
                                            <IonInput maxlength={100} className='ios add-temas' placeholder='Tema' color='dark' onIonChange={e => setTextPop(e.detail.value!)} value={textPop} type='text'></IonInput>
                                            <IonFabButton className='add-btn' onClick={() => {
                                                AddTema()
                                                setTextPop('')
                                            }} color='light'><IonIcon color='success' icon={add}></IonIcon></IonFabButton>
                                        </IonRow>
                                        {themes.map((theme, index)=> (
                                            <IonRow key={index} style={{ cursor: 'default', marginTop: '1rem' }} className='ion-justify-content-center'>
                                                <IonCol key={index} className='ios temas-inputs' color='dark'>{theme}</IonCol>
                                        <IonFabButton onClick={() => DeleteTema(theme)} className='remove-btn' color='light'><IonIcon color='danger' icon={remove}></IonIcon></IonFabButton>
                                            </IonRow>
                                        ))}
                                    </IonGrid>
                                    <IonRow style={{ marginTop: '-0.9rem' }} className='ion-justify-content-center row-btn'>
                                        <IonButton className='btn-save' color='light' onClick={() => popOverSave()}>Salvar</IonButton>
                                        <IonButton onClick={() => {
                                            setShowPopover(false)
                                            setThemes([])
                                            setTextPop('')
                                        }} color='light' className='btn-cancel'>Limpar</IonButton>
                                    </IonRow>
                                </IonPopover>
                                <IonPopover
                                    isOpen={shownPopsave}
                                    cssClass='my-custom-class save'
                                    onDidDismiss={() => {
                                        setShowPopover(false)
                                        setShowPopover(false)
                                    }}
                                >
                                    <IonRow className='ion-justify-content-center ion-text-align-center'>
                                        <IonLabel style={{ fontWeight: 'bold', fontSize: '18px', lineHeight: '8rem' }} color='success'>Temas salvos!</IonLabel>
                                    </IonRow>
                                </IonPopover>

                                <IonInput maxlength={100} value={textMat} className="input-tema" placeholder="Insira a matéria" onIonChange={e => setTextMat(e.detail.value!)}></IonInput>
                            </IonRow>
                        </IonCardHeader>
                        <IonCardContent className="content-background">
                            <IonRow className="ios row-dissertativa">
                                <IonTextarea
                                    maxlength={240}
                                    overflow-scroll="true"
                                    rows={5}
                                    cols={20}
                                    required
                                    className='ios question'
                                    color='dark'
                                    onIonChange={e => {
                                        setTextAreaQuestion(e.detail.value!)
                                    }}
                                    value={textAreaQuestion}
                                    placeholder="Digite ou cole o enunciado do flash-card">
                                </IonTextarea>
                            </IonRow>
                        </IonCardContent>
                        <IonRow className='row-footer' color='light'></IonRow>
                    </IonCard >

                    <IonModal backdropDismiss={false} isOpen={showModal} cssClass='modal-criar'>
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
                        <IonLabel className='tooltip-text'>Opcional</IonLabel>                    
                    </IonRow>
                    <IonRow className='ios row-timer-alternativa'>
                        {shownTimer && timer}
                    </IonRow>
                    <Limitedalternativa 
                    onClick={()=> setShowPopLimit(false)} 
                    isOpen={showPopLimit} 
                    onDidDismiss={()=>setShowPopLimit(false)} />
                    <IonRow style={{ marginTop: '1.7rem' }} className='ios ion-justify-content-center'>
                        <IonButton id='create-button' className="ios btn-criar" onClick={() => {
                            handleSaveButton()
                            }} >Salvar</IonButton>
                    </IonRow>
                </IonContent>

            </IonPage>
        </>
    );

}

const StyledTimer = styled(IonCol)`
    display:flex;
    flex-direction:row;
    width:auto;
    height:2rem;
    align-items: center;
    position:absolute;
`;
const Timertext = styled(IonInput)`
    text-align:center;
    color:var(--ion-color-dark);
    border-radius:16px;
    background:var(--ion-color-light);
    font-weight:bold;
    width: 3rem;
    height: -webkit-fill-available;
    --padding-start: 3px;
    --padding-end: 3px;
`;
const Timer: React.FC = () => {

    return (
        <>
            <StyledTimer>
                <IonIcon className='icon-styled' icon={timerOutline} />
                <Timertext placeholder='00:00'></Timertext>
            </StyledTimer>
        </>
    );
}


export default EditAlternativa;