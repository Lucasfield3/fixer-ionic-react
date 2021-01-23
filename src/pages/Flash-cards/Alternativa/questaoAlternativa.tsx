import React, { useState } from 'react';
import {
    IonButton,
    IonPage,
    IonRow,
    IonFabButton,
    IonIcon,
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
    useIonViewWillEnter,
} from '@ionic/react'
import { add, remove } from 'ionicons/icons';
import './style.css'
import { menuController } from '@ionic/core';
import { useHistory } from 'react-router';
import { createFlashCard, Payload, Alternative, NewAlternative } from '../../../services/flashCard.service';
import { getPayload } from '../../../services/Authentication.service';
import Limitedalternativa from '../../../components/CardMessages/msg_limite_alternativa';
import { ButtonArrow, CardQuestion, HeaderDefault, Timer } from '../../styles/Page-default/Page-default-styled';



const QuestaoAlternativa: React.FC = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory()
    const [textTitle, setTextTitle] = useState<string>('')
    const [textMat, setTextMat] = useState<string>('')
    const [enunciated, setEnunciated] = useState<string>('')
    const [textAreaAlternative, setTextAreaAlternative] = useState<string>('')
    const [checked, setChecked] = useState<boolean>(false);
    const [shownTimer, setShownTimer] = useState<boolean>(false);
    const [showPopover, setShowPopover] = useState<boolean>(false);
    const [showPopLimit, setShowPopLimit] = useState<boolean>(false);
    const [shownPopsave, setShownPopsave] = useState<boolean>(false);
    const [textPop, setTextPop] = useState<string>('')
    const [showModal, setShowModal] = useState(false)
    const [showModal2, setShowModal2] = useState(false)
    const [textRightAnswer, setTextRightAnswer] = useState<string>('')
    const [time, setTime] = useState<string>(':');
    const [timer, setTimer] = useState<{}>()
    const temas = {
        id: 0,
        textPop: ''
    }
    const [answer, setAnswer] = useState<string>('')
    const [themes, setThemes] = useState([temas]);
    const [alternatives, setAlternatives] = useState<NewAlternative[]>([]);
    const popOverSave = () => {
        setShownPopsave(true);
        setTimeout(() => {
            setShownPopsave(false);
            setShowPopover(false);
        }, 1000)
    }
    const onTimeChange = (time: string) => {
        console.log(time)
        setTime(time)
    }
    const AddTema = () => {
        if (textPop !== '') {
            setThemes([...themes, {
                id: themes.length + 1,
                textPop: textPop
            }
            ])
        }
    }
    const AddAlternative = () => {
        setAlternatives([...alternatives, { answer: answer }])
        console.log(alternatives)
        if (alternatives.length == 4) {
            setAlternatives(alternatives)

        }
        setAnswer('')
    }



    const DeleteAlternatives = (answer: string) => {
        let alternativeToBedeleted = alternatives.filter(alternative => alternative.answer !== answer);
        setAlternatives(alternativeToBedeleted)
        console.log(alternativeToBedeleted)
    }

    const DeleteTema = (id: number) => {
        const themeToBedeleted = themes.filter(theme => theme.id !== id);
        setThemes(themeToBedeleted)
    }
    useIonViewWillEnter(() => {
        setThemes([])
        setAlternatives([])
    }, [])
    useIonViewWillLeave(() => {
        menuController.enable(true)
        CleanInputs()
        setChecked(false)
    }, [])
    const CleanInputs = () => {
        setTextPop('')
        setTextAreaAlternative('')
        setEnunciated('')
        setTextRightAnswer('')
        setTextMat('')
        setTextTitle('')
        setAlternatives([])
        setThemes([])
        setTime('')
    }
    const convertTime = () => {
        const [minutes, seconds] = time.split(':').map(Number)
        const timeInSeconds = (minutes * 60) + seconds
        console.log(time)
        console.log(timeInSeconds * 1000)
        return timeInSeconds * 1000

    }
    const handleCreateButton = async () => {
        const payLoad = getPayload() as Payload
        let alternativesSend: NewAlternative[] = []
        let temasSend: string[] = []
        themes.map((a) => {
            temasSend.push(a.textPop)
        })
        alternatives?.map((a) => {
            alternativesSend.push({ answer: a.answer })
        })
        alternativesSend.push({ answer: textRightAnswer })
        if (enunciated !== '' && textRightAnswer !== '' && alternatives!.length > 0) {
            try {
                await createFlashCard({
                    creator: payLoad.id,
                    enunciated: enunciated,
                    answerFlashCard: textRightAnswer,
                    subject: textMat,
                    alternatives: alternativesSend,
                    title: textTitle,
                    themes: temasSend,
                    time: convertTime()
                })
            } catch (err) {
                console.log(err)
            }
            setShowModal(true)
        } else if (alternatives?.length == 0) {
            setShowPopLimit(true)
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
                        <IonRow key={theme.id} style={{ cursor: 'default', marginTop: '1rem' }} className='ion-justify-content-center'>
                        <IonCol key={theme.id} className='ios temas-inputs' color='dark'>{theme.textPop}</IonCol>
                            <IonFabButton onClick={() => DeleteTema(theme.id)} className='remove-btn' color='light'><IonIcon color='danger' icon={remove}></IonIcon></IonFabButton>
                        </IonRow>
                    ))}
                   </CardQuestion>

                    <IonModal backdropDismiss={false} isOpen={showModal} cssClass='modal-criar'>
                        <IonCardTitle className="div-modal-alternativa">
                            <IonText className="modal-text" color="dark">
                                <IonLabel>Deseja criar mais um flashcard ?</IonLabel>
                            </IonText>
                            <IonCardSubtitle className="header-btn">
                                <IonButton color='light' className="btn-sim" onClick={() => {
                                    setShowModal2(true)
                                }}>Sim</IonButton>
                                <IonButton color='light' className="btn-nao" onClick={() => {
                                    setShowModal(false)
                                    history.push('Flash-cards')
                                    menuController.enable(true)
                                }}>Não</IonButton>
                            </IonCardSubtitle>
                        </IonCardTitle>
                    </IonModal>


                    <IonModal backdropDismiss={false} isOpen={showModal2} cssClass='modal-choose'>
                        <IonButton color='light' className="btn-choose" onClick={() => {
                            setShowModal2(false)
                            setShowModal(false)
                            CleanInputs()
                            history.push('/questaoDissertativa')
                        }}>Dissertativa</IonButton>
                        <IonLabel className="label-modal">ou</IonLabel>
                        <IonButton color='light' className="btn-choose" onClick={() => {
                            setShowModal2(false)
                            setShowModal(false)
                            CleanInputs()
                            history.push('/questaoAlternativa')
                        }}>Alternativa</IonButton>
                    </IonModal>


                    <IonGrid className='array-div'>
                        <IonRow style={{ marginBottom: '1rem' }} className='ion-justify-content-center'>
                            <IonTextarea
                                maxlength={240}
                                autoGrow={textRightAnswer == '' && false || true}
                                style={{ height: textRightAnswer == '' && '4rem' || 'auto' }}
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
                        <IonRow className='ion-justify-content-center'>
                            <IonTextarea autoGrow={true} className='ios add-alternativas' placeholder='Insira a/as alternativas' color='dark' onIonChange={e => setAnswer(e.detail.value!)} value={answer}></IonTextarea>
                            <IonFabButton id='add-alternative' className='add-btn' onClick={() => {
                                AddAlternative()
                            }} color='light'><IonIcon color='success' icon={add}></IonIcon></IonFabButton>
                        </IonRow>
                        {alternatives.map((alternative: Alternative, index) => (
                            <IonRow key={index} style={{ cursor: 'default', marginTop: '1rem' }} className='ion-justify-content-center colunas'>
                                <IonCol style={{ height: 'auto', width: '10rem' }} key={index} className='alternativas' color='dark' placeholder='alternativas'>{alternative.answer}</IonCol>
                                <IonFabButton onClick={() => DeleteAlternatives(alternative.answer)} className='remove-btn' color='light'><IonIcon color='danger' icon={remove}></IonIcon></IonFabButton>
                            </IonRow>
                        ))}
                    </IonGrid>

                    <IonRow className='row-toggle'>
                        <IonLabel color='dark' className='label-timer' >Tempo</IonLabel>
                        <IonToggle checked={checked} onIonChange={(e) => setChecked(e.detail.checked)} className='ios toggle' onClick={() => {
                            setShownTimer(!shownTimer)
                            setTime('')
                        }} />
                    </IonRow>
                    <IonRow className='ios row-timer-alternativa'>
                        {shownTimer && <Timer value={time} onChange={(event) => setTime(event.target.value!)} />}
                    </IonRow> 
                    <Limitedalternativa
                        onClick={() => setShowPopLimit(false)}
                        isOpen={showPopLimit}
                        onDidDismiss={() => setShowPopLimit(false)} />
                    <IonRow style={{ marginTop: '1.7rem' }} className='ios ion-justify-content-center'>
                        <IonButton id='create-button' className="ios btn-criar" onClick={() => {
                            handleCreateButton()
                        }} >Criar</IonButton>
                    </IonRow>
                </IonContent>

            </IonPage>
        </>
    );

}

export default QuestaoAlternativa;