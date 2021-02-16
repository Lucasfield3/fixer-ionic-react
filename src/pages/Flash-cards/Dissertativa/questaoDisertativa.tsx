import React, { useEffect, useState } from 'react';
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
import { Payload, Alternative, createFlashCard } from '../../../services/flashCard.service';
import { AreaDissertativeAnswer, ButtonArrow, CardQuestion, HeaderDefault, ModalChoose, ModalDefault, RowBtnCreate, RowTimer, Timer } from '../../styles/Page-default/Page-default-styled';




const QuestaoDissertativa: React.FC = () => {


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory()
    const [textTitle, setTextTitle] = useState<string>('')
    const [textMat, setTextMat] = useState<string>('')
    const [enunciated, setEnunciated] = useState<string>('')
    const [textRightAnswer, setTextRightAnswer] = useState<string>('')
    const [checked, setChecked] = useState<boolean>(false);
    const [shownTimer, setShownTimer] = useState<boolean>(false);
    const [showPopover, setShowPopover] = useState<boolean>(false);
    const [shownPopsave, setShownPopsave]= useState<boolean>(false);
    const [showModal, setShowModal] = useState(false)
    const [showModal2, setShowModal2] = useState(false)
    const [textPop, setTextPop] = useState<string>('')
    const [time, setTime] = useState<string>(':');
    const temas = {
        id: -1,
        textPop: ''
    }
    const [themes, setThemes] = useState([temas]);
    const popOverSave = () => {
        setShownPopsave(true);
        setTimeout(() => {
            setShownPopsave(false);
            setShowPopover(false);
        }, 1000)
    }
    const AddTema = () => {

        if (textPop !== '') {
            setThemes([...themes, {
                id: themes.length,
                textPop: textPop
            }
            ])
        }
    }
    const DeleteTema = (id: number) => {
        const themeToBedeleted = themes.filter(theme => theme.id !== id);
        setThemes(themeToBedeleted)
    }

    useIonViewWillEnter(() => {

        setThemes([])

    }, [])
    const CleanInputs = ()=>{
        setTextPop('')
        setTextRightAnswer('')
        setEnunciated('')
        setTextMat('')
        setTextTitle('')
    }
    useIonViewWillLeave(()=>{
        CleanInputs()
        menuController.enable(true)
    }, [])
    const handleCreateButton = async ()=>{     
        const payLoad = getPayload() as Payload
        let temasSend:string[] = []
        themes.map((a)=>{
            temasSend.push(a.textPop)
        })
        if(enunciated !== '' && textRightAnswer !== ''){
            try{
                await createFlashCard({
                    creator:payLoad.id,
                    enunciated:enunciated,
                    answerFlashCard:textRightAnswer,
                    subject:textMat,
                    alternatives:[],
                    title:textTitle,
                    themes:temasSend
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
                        setEnunciated(e.detail.value!)
                    }}
                    valueEnunciated={enunciated}
                   >
                   {themes.map(theme => (
                        <IonRow key={theme.id} style={{ cursor: 'default', marginTop: '1rem'}} className='ion-justify-content-center'>
                        <IonCol key={theme.id} className='ios temas-inputs' color='dark'>{theme.textPop}</IonCol>
                            <IonFabButton onClick={() => DeleteTema(theme.id)} className='remove-btn' color='light'><IonIcon color='danger' icon={remove}></IonIcon></IonFabButton>
                        </IonRow>
                    ))}
                   </CardQuestion>
                   <ModalDefault
                    isOpen={showModal}
                    onClickNo={() => {
                        setShowModal(false)
                        history.push('Flash-cards')
                        menuController.enable(true)
                    }}
                    onClickYes={() => {
                        setShowModal2(true)
                    }}
                    msg='Deseja criar mais um flashcard?'
                    cssClass='ios modal-criar'
                    />
                    <ModalChoose
                        isOpen={showModal2}
                        onClickAlt={() => {
                            setShowModal2(false)
                            setShowModal(false)
                            CleanInputs()
                            history.push('/questaoAlternativa')
                        }}
                        onClickDiss={() => {
                            setShowModal2(false)
                            setShowModal(false)
                            CleanInputs()
                            history.push('/questaoDissertativa')
                        }}
                    />

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
                    <RowBtnCreate onClick={()=> handleCreateButton()}>Criar</RowBtnCreate>
                </IonContent>

            </IonPage>
        </>
    );

}

export default QuestaoDissertativa;


