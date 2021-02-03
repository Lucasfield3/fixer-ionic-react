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
    useIonViewWillLeave,
    IonCardSubtitle,
    IonCardTitle,
    IonModal,
    IonText,
    useIonViewWillEnter
} from '@ionic/react'
import { add,  arrowUndoSharp, timerOutline, remove } from 'ionicons/icons';
import './style.css'
import { menuController } from '@ionic/core';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { getPayload } from '../../../services/Authentication.service';
import { Payload, putFlashCard, FlashCard, getRightAnswer } from '../../../services/flashCard.service';
import { getUser } from '../../../services/User.service';




const EditDissertativa: React.FC = () => {


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory()
    const [textTitle, setTextTitle] = useState<string>('')
    const [textMat, setTextMat] = useState<string>('')
    const [enunciated, setEnunciated] = useState<string>('')
    const [textRightAnswer, setTextRightAnswer] = useState<string>('')
    const [textAreaQuestion, setTextAreaQuestion] = useState<string>('')
    const [timer, setTimer] = useState<{}>(<Timer/>)
    const [checked, setChecked] = useState<boolean>(false);
    const [shownTimer, setShownTimer] = useState<boolean>(false);
    const [showPopover, setShowPopover] = useState<boolean>(false);
    const [shownPopsave, setShownPopsave]= useState<boolean>(false);
    const [showModal, setShowModal] = useState(false)
    const [showModal2, setShowModal2] = useState(false)
    const [textPop, setTextPop] = useState<string>('')
    const [idFlashCard, setIdFlashCard] = useState<string>('')
    const [themes, setThemes] = useState<string[]>([]);
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
    const DeleteTema = (id:string) => {
        const themeDeleted =  themes.filter((theme)=> id !== theme)
        setThemes(themeDeleted)
     }
     async function getAnswer(id:string){
        const rightAnswer = await getRightAnswer(id) as string
        console.log(rightAnswer)
        setTextRightAnswer(rightAnswer)
    }
    useIonViewWillEnter(() => {
        if (history.location.state) {
            const card = history.location.state as FlashCard
            console.log(card)
            setTextTitle(card.title)
            setTextMat(card.subject)
            setThemes(card.themes)
            setTextAreaQuestion(card.enunciated)
            setIdFlashCard(card.id)
            getAnswer(card.id)
        } else {
            console.log('Não tem nada');
        }

    }, [])
    useIonViewWillLeave(()=>{
        menuController.enable(true)
    }, [])
    const handleSaveButton = async ()=>{     
        const payLoad = getPayload() as Payload
        let temasSend:string[] = []
        themes.map((t:string)=>{
            temasSend.push(t)
        })
        if(textAreaQuestion !== '' && textRightAnswer !== ''){
            try{
                await putFlashCard({
                    creator:payLoad.id,
                    enunciated:textAreaQuestion,
                    subject:textMat,
                    alternatives:[],
                    title:textTitle,
                    themes:temasSend,
                    id:idFlashCard,
                    answerFlashCard:textRightAnswer
                })
            }catch(err){
                console.log(err)
            }      
            setShowModal(true)
        }
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
                    <IonItem style={{borderRadius:'6px'}} className="item-input-dissertativa">
                        <IonInput  value={textTitle} type="text" required className="input-dissertativa"  onIonChange={e => setTextTitle(e.detail.value!)} placeholder="Insira o título do Flashcard"></IonInput>
                    </IonItem>

                    <IonCard className='card-flip' color='light'>
                        <IonCardHeader style={{ padding: 0 }}>
                            <IonRow className='ios ion-justify-content-space-between row-header'>
                                <IonButton onClick={() => setShowPopover(true)} className="ios btn-tema-dissertativa">Tema</IonButton>
                                <IonPopover
                                    isOpen={showPopover}
                                    cssClass='ios my-custom-class temas-custom'
                                    onDidDismiss={e => setShowPopover(false)}
                                >
                                    <IonRow style={{ marginTop: '0.9rem' }} className='ion-justify-content-center'>
                                        <IonLabel style={{ fontWeight: 'bold', fontSize: '18px' }} color='dark'>Adicione um tema</IonLabel>
                                    </IonRow>
                                    <IonGrid className='back-temas'>
                                        <IonRow className='ion-justify-content-center'>
                                            <IonInput className='ios add-temas' placeholder='Tema' color='dark' onIonChange={e => setTextPop(e.detail.value!)} value={textPop} type='text'></IonInput>
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

                    <IonCard className='card-dissertativa-secundary' color='light'>
                        <IonCardHeader style={{ padding: 0 }}>
                            <IonRow color='light' className='row-header-resposta'></IonRow>
                        </IonCardHeader>
                        <IonCardContent style={{ height: '9rem' }} className="content-background">
                            <IonRow className="ios row-dissertativa">
                                <IonTextarea
                                    maxlength={240}
                                    overflow-scroll="true"
                                    className='ios answer'
                                    required
                                    value={textRightAnswer}
                                    rows={4}
                                    cols={20}
                                    color='dark'
                                    onIonChange={e => setTextRightAnswer(e.detail.value!)}
                                    placeholder="Digite ou cole a resposta">
                                </IonTextarea>
                            </IonRow>
                        </IonCardContent>
                        <IonRow color='light' className='row-footer-resposta'></IonRow>
                    </IonCard >

                    <IonRow className='row-toggle'>
                        <IonLabel color='dark' className='label-timer' >Tempo</IonLabel>
                        <IonToggle checked={checked} onIonChange={(e) => setChecked(e.detail.checked)} className='ios toggle' onClick={() => setShownTimer(!shownTimer)} />
                        <IonLabel className='tooltip-text'>Opcional</IonLabel>
                    </IonRow>
                    <IonRow className='ios row-timer-dissertativa'>
                        {shownTimer && timer}
                    </IonRow>
                
                    <IonRow style={{ marginTop: '1.7rem' }} className='ios ion-justify-content-center'>
                        <IonButton onClick={()=> handleSaveButton()} className="ios btn-criar">Salvar</IonButton>
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

export default EditDissertativa;


