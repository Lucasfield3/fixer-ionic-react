import React, { useState } from 'react';
import {
    IonButton,
    IonPage,
    IonRow,
    IonFabButton,
    IonIcon,
    IonLabel,
    IonContent, 
    IonCol,  
    useIonViewWillLeave,
    IonCardTitle,
    IonModal,
    IonText,
    useIonViewWillEnter
} from '@ionic/react'
import { remove } from 'ionicons/icons';
import { menuController } from '@ionic/core';
import { useHistory } from 'react-router';
import { getPayload } from '../../../services/Authentication.service';
import { Payload, putFlashCard, FlashCard, getRightAnswer } from '../../../services/flashCard.service';
import { ButtonArrow, HeaderDefault, CardQuestion, RowTimer, RowBtnCreate, Timer, AreaDissertativeAnswer } from '../../styles/Page-default/Page-default-styled';


const EditDissertativa: React.FC = () => {


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory()
    const [textTitle, setTextTitle] = useState<string>('')
    const [textMat, setTextMat] = useState<string>('')
    const [enunciated, setEnunciated] = useState<string>('')
    const [textRightAnswer, setTextRightAnswer] = useState<string>('')
    const [textAreaQuestion, setTextAreaQuestion] = useState<string>('')
    const [checked, setChecked] = useState<boolean>(false);
    const [shownTimer, setShownTimer] = useState<boolean>(false);
    const [showPopover, setShowPopover] = useState<boolean>(false);
    const [shownPopsave, setShownPopsave]= useState<boolean>(false);
    const [showModal, setShowModal] = useState(false)
    const [showModal2, setShowModal2] = useState(false)
    const [textPop, setTextPop] = useState<string>('')
    const [idFlashCard, setIdFlashCard] = useState<string>('')
    const [themes, setThemes] = useState<string[]>([]);
    const [time, setTime] = useState<string>(':');
    const [showPopLimit, setShowPopLimit] = useState<boolean>(false);
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
                <HeaderDefault>
                    <ButtonArrow onClick={() => {
                        history.push('/Flash-cards')
                        menuController.enable(true);
                        setThemes([])
                        setChecked(false)
                        setShownTimer(false)
                        }}/>
                </HeaderDefault>
                
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

                    <AreaDissertativeAnswer
                    onIonChange={e => setTextRightAnswer(e.detail.value!)}
                    value={textRightAnswer}
                    />

                    <RowTimer 
                    onIonChange={(e) => setChecked(e.detail.checked)}
                    onClick={() => {
                        setShownTimer(!shownTimer)
                        setTime('')
                    }}
                    checked={checked}
                    >
                        {shownTimer && <Timer value={time} onChange={(event) => setTime(event.target.value!)} />}
                    </RowTimer>
                   <RowBtnCreate onClick={()=> handleSaveButton()}>Salvar</RowBtnCreate>
                </IonContent>

            </IonPage>
        </>
    );

}


export default EditDissertativa;


