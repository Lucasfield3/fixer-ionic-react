import React, { useState } from 'react';
import {
    IonButton,
    IonPage,
    IonRow,
    IonFabButton,
    IonIcon,
    IonLabel,
    IonContent, 
    useIonViewWillLeave,
    IonCardTitle,
    IonModal,
    IonText,
    useIonViewWillEnter,
    IonInput
} from '@ionic/react'
import { add, remove } from 'ionicons/icons';
import { menuController } from '@ionic/core';
import { useHistory } from 'react-router';
import { getPayload } from '../../../services/Authentication.service';
import { Payload, putFlashCard, FlashCard, getRightAnswer, NewFlashCard } from '../../../services/flashCard.service';
import { ButtonArrow, HeaderDefault, CardQuestion, RowBtnCreate, Timer,  CreateAreaDissertativeAnswer, RowTimer } from '../../styles/Page-default/Page-default-styled';
import { Controller, useForm } from 'react-hook-form';
import Limitedalternativa from '../../../components/CardMessages/msg_limite_alternativa';

const EditDissertativa: React.FC = () => {


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory()
    const [textTitle, setTextTitle] = useState<string>('')
    const [textRightAnswer, setTextRightAnswer] = useState<string>('')
    const [textAreaQuestion, setTextAreaQuestion] = useState<string>('')
    const [checked, setChecked] = useState<boolean>(false);
    const [shownTimer, setShownTimer] = useState<boolean>(false);
    const [showPopover, setShowPopover] = useState<boolean>(false);
    const [shownPopsave, setShownPopsave]= useState<boolean>(false);
    const [showModal, setShowModal] = useState(false)
    const [idFlashCard, setIdFlashCard] = useState<string>('')
    const [showPopLimit, setShowPopLimit] = useState<boolean>(false);
    let temas = {
        id:0,
        textPop:''
    }
    const [themes, setThemes] = useState<string[]>([temas.textPop]);
    const [time, setTime] = useState<number>();
    const [newTime, setNewTime] = useState<string>(':');
    const popOverSave = () => {
        setShownPopsave(true);
        setTimeout(() => {
            setShownPopsave(false);
            setShowPopover(false);
        }, 1000)
    }
    const AddTema = () => {
        const inputValue = getValues(`themes[${temas.textPop}].textPop`)
        setThemes([...themes, inputValue
        ])
        if(inputValue == ''){
            setThemes(themes)
        }
        console.log(themes)
    }
    const RemoveTema = (textPop: string) => {
        const themeToBedeleted = themes.filter((theme) => textPop !== theme);
        setThemes(themeToBedeleted)
    }
     async function getAnswer(id:string){
        const rightAnswer = await getRightAnswer(id) as string
        console.log(rightAnswer)
        setValue('answerFlashCard', rightAnswer)
    }
    useIonViewWillEnter(() => {
        if (history.location.state) {
            const card = history.location.state as FlashCard
            console.log(card)
            setValue('title', card.title)
            setValue('subject', card.subject)
            setValue('enunciated', card.enunciated)
            setIdFlashCard(card.id!)
            setTime(card.time)
            getAnswer(card.id!)
            setThemes(card.themes)
            
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
                    //subject:textMat,
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

    const timeUnconverted = (time:number) =>{
        console.log(time)
        const timeMinutsUnconverted = Math.trunc((time!/1000)/60) //minutos
        console.log(timeMinutsUnconverted)
        const timeSecondsUnconverted = ((time!/1000) % 60 )//segundos
        console.log(timeSecondsUnconverted)

        if(timeMinutsUnconverted < 10 && timeSecondsUnconverted < 10){

            const timeUnconverted = `0${timeMinutsUnconverted}:0${timeSecondsUnconverted}`
 
            return timeUnconverted
        }else if(timeMinutsUnconverted < 10){
            const timeUnconverted = `0${timeMinutsUnconverted}:${timeSecondsUnconverted}`
            
            return timeUnconverted
        }else if(timeSecondsUnconverted < 10){
            const timeUnconverted = `${timeMinutsUnconverted}:0${timeSecondsUnconverted}`
            
            return timeUnconverted
        }else{
            const timeUnconverted = `${timeMinutsUnconverted}:${timeSecondsUnconverted}`

            return timeUnconverted
        }
        

    }

    const convertTime = () => {
        const [minutes, seconds] = newTime.split(':').map(Number)
        const newTimeInSeconds = (minutes * 60) + seconds
        console.log(newTime)
        console.log(newTimeInSeconds * 1000)
        return newTimeInSeconds * 1000

    }

    const { register, handleSubmit, errors, setValue, getValues, control, watch} = useForm()

    const onSubmit = async (data:NewFlashCard)=>{
        const payload = getPayload() as Payload
        let temasSend:string[] = []
        themes.map((textPop)=>{
            temasSend.push(textPop)
        })
        data.time = convertTime()
        data.themes = temasSend
        data.creator = payload.id
        data.id = idFlashCard
        data.alternatives = []
        await putFlashCard(data)
        setShowModal(true)
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

                <form onSubmit={handleSubmit(onSubmit)}>

                <CardQuestion
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
                        >
                        <IonRow className='ion-justify-content-center'>
                            <IonInput maxlength={100} className='ios add-temas' placeholder='Tema' color='dark' name={`themes[${temas.textPop}].textPop`} ref={register({required:false})}   type='text'></IonInput>
                            <IonFabButton className='add-btn' onClick={() => {
                                AddTema()
                                console.log(getValues(`themes[${temas.textPop}].textPop`))
                                setValue(`themes[${temas.textPop}].textPop`, '')
                            }} color='light'><IonIcon color='success' icon={add}></IonIcon></IonFabButton>
                        </IonRow>
                        {themes.map((theme, index) => (
                                <IonRow key={index - 1} style={{ cursor: 'default', marginTop: '1rem'}} className='ion-justify-content-center'>
                                    <Controller as={<IonInput key={index} className='ios temas-inputs'  color='dark'></IonInput>} 
                                    name={`themes[${index}].textPop`}
                                    control={control}
                                    defaultValue={theme}
                                    />
                                    <IonFabButton onClick={() => RemoveTema(theme)} className='remove-btn' color='light'><IonIcon color='danger' icon={remove} ></IonIcon></IonFabButton>
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

                    <CreateAreaDissertativeAnswer         
                        refAnswer={register({required:true})}
                    />

                   <RowTimer 
                    onIonChange={(e) => setChecked(e.detail.checked)}
                    onClick={() => {
                        setShownTimer(!shownTimer)
                        setNewTime('')
                    }}
                    checked={checked}
                    style={{}}
                    >
                        {shownTimer && <Timer  value={timeUnconverted(time!)} onChange={(event) => setNewTime(event.target.value!)} />}
                    </RowTimer>
                    <Limitedalternativa 
                        onClick={()=> setShowPopLimit(false)} 
                        isOpen={showPopLimit} 
                        onDidDismiss={()=>setShowPopLimit(false)} />
                   <RowBtnCreate onClick={()=> null} style={{marginTop: '1.7rem' }}>Salvar</RowBtnCreate>
                </form>
                </IonContent>

            </IonPage>
        </>
    );

}


export default EditDissertativa;


