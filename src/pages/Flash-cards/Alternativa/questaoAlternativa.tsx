import React, { useState } from 'react';
import {
    IonPage,
    IonRow,
    IonFabButton,
    IonIcon,
    IonContent,
    IonCol,
    useIonViewWillLeave,
    useIonViewWillEnter,
} from '@ionic/react'
import { remove } from 'ionicons/icons';
import './style.css'
import { menuController } from '@ionic/core';
import { useHistory } from 'react-router';
import { createFlashCard, Payload,  NewAlternative } from '../../../services/flashCard.service';
import { getPayload } from '../../../services/Authentication.service';
import Limitedalternativa from '../../../components/CardMessages/msg_limite_alternativa';
import { ButtonArrow, CardQuestion, GridAlternatives, HeaderDefault, ModalChoose, ModalDefault, RowBtnCreate, RowTimer, Timer } from '../../styles/Page-default/Page-default-styled';
import { Alternative } from '../../../services/Questionarios.service';



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
        if (alternatives.length == 4 || answer === '') {
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
        ShuffleAlternativas(alternativesSend)
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
    const ShuffleAlternativas = ( alternativesSend: NewAlternative[]) => {

        for(let i =  alternativesSend.length -1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            const temp =  alternativesSend[i];
             alternativesSend[i] =  alternativesSend[j];
             alternativesSend[j] = temp;
        }
        return  alternativesSend;
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


                        <GridAlternatives
                        onClick={()=>AddAlternative() }
                        style={{height: textRightAnswer == '' && '4rem' || 'auto'}}
                        onIonChangeRight={e => setTextRightAnswer(e.detail.value!)}
                        valueTextRighAnswer={textRightAnswer}
                        onIonChangeAnswer={e => setAnswer(e.detail.value!)}
                        valueAnswer={answer}
                        autoGrow={textRightAnswer == '' && false || true}
                        >
                            {alternatives.map((alternative:Alternative, index)=>(
                                <IonRow key={index} style={{cursor:'default', marginTop:'1rem'}}  className='ion-justify-content-center colunas'>
                                    <IonCol style={{height:'auto', width:'10rem'}} key={index} className='alternativas' color='dark' placeholder='alternativas'>{alternative.answer}</IonCol>
                                    <IonFabButton  onClick={()=>DeleteAlternatives(alternative.answer)} className='remove-btn'  color='light'><IonIcon color='danger' icon={remove}></IonIcon></IonFabButton>
                                </IonRow>
                            ))}       
                        </GridAlternatives>
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
                    <Limitedalternativa
                        onClick={() => setShowPopLimit(false)}
                        isOpen={showPopLimit}
                        onDidDismiss={() => setShowPopLimit(false)} />
                    <RowBtnCreate onClick={()=> handleCreateButton()}>Criar</RowBtnCreate>
                </IonContent>

            </IonPage>
        </>
    );

}

export default QuestaoAlternativa;