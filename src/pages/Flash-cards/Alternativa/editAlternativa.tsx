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
    IonCardTitle,
    IonModal, 
    IonText,
    useIonViewWillLeave,
    useIonViewWillEnter,
    IonInput,
    IonTextarea
} from '@ionic/react'
import { add, remove } from 'ionicons/icons';
import { menuController } from '@ionic/core';
import { useHistory } from 'react-router';
import {  Payload, Alternative, NewAlternative, FlashCard, putFlashCard, getRightAnswer, NewFlashCard } from '../../../services/flashCard.service';
import { getPayload} from '../../../services/Authentication.service';
import Limitedalternativa from '../../../components/CardMessages/msg_limite_alternativa';
import { ButtonArrow, CardQuestion, GridAlternatives, HeaderDefault, RowBtnCreate, RowTimer, Timer } from '../../styles/Page-default/Page-default-styled';
import { Controller, useForm } from 'react-hook-form';



const EditAlternativa: React.FC = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory()
    const [checked, setChecked] = useState<boolean>(false);
    const [shownTimer, setShownTimer] = useState<boolean>(false);
    const [showPopover, setShowPopover] = useState<boolean>(false);
    const [showPopLimit, setShowPopLimit] = useState<boolean>(false);
    const [shownPopsave, setShownPopsave]= useState<boolean>(false);
    const [showModal, setShowModal] = useState(false)
    const [textRightAnswer, setTextRightAnswer] = useState<string>('')
    const [idFlashCard, setIdFlashCard] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')
    const [alternatives, setAlternatives] = useState<NewAlternative[]>([]);
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
    const AddAlternative = () => {
        const inputValue = getValues(`alternatives[${{answer}}].answer`)
        setAlternatives([...alternatives, { answer: inputValue }])
        console.log(inputValue)
        if (alternatives.length == 4 || inputValue === '') {
            setAlternatives(alternatives)
        }
    }

    const RemoveAlternative = (index:number) =>{
        setAlternatives([...alternatives.slice(0, index), ...alternatives.slice(index + 1)])
    }

    const { register, handleSubmit, errors, setValue, getValues, control, watch} = useForm()

    const multiplesValues = watch();
    const removeRightAnswerOfAlternative = (answer:string) =>{ 
        const card = history.location.state as FlashCard         
        console.log(card.alternatives!)
        let alternativeDeleted = card.alternatives!.filter(alternative => alternative.answer !== answer)
        setAlternatives(alternativeDeleted)
        setThemes(card.themes)
    }

    async function getAnswer(id:string){
        const rightAnswer = await getRightAnswer(id) as string     
        setValue('answerFlashCard', rightAnswer)
        removeRightAnswerOfAlternative(rightAnswer)
    }
    useIonViewWillEnter(()=>{
        if (history.location.state) {
            const card = history.location.state as FlashCard
            console.log(card)
            setValue('title', card.title)
            setValue('subject', card.subject)
            setValue('enunciated', card.enunciated)
            setIdFlashCard(card.id)
            setTime(card.time)
            getAnswer(card.id)
            
        } else {
            console.log('Não tem nada');
        }
         
    },[])
    useIonViewWillLeave(()=>{
        menuController.enable(true)   
    }, [])
    

    const convertTime = () => {
        const [minutes, seconds] = newTime.split(':').map(Number)
        const newTimeInSeconds = (minutes * 60) + seconds
        console.log(newTime)
        console.log(newTimeInSeconds * 1000)
        return newTimeInSeconds * 1000

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

    const ShuffleAlternativas = ( alternativesSend: NewAlternative[]) => {

        for(let i =  alternativesSend.length -1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            const temp =  alternativesSend[i];
             alternativesSend[i] =  alternativesSend[j];
             alternativesSend[j] = temp;
        }
        return  alternativesSend;
    }

    

    const onSubmit = async(data:NewFlashCard) =>{
        const payLoad = getPayload() as Payload
        let alternativesSend:NewAlternative[] = []
        let temasSend:string[] = []
        themes.map((textPop)=>{
            temasSend.push(textPop)
        })
        alternatives?.map((a)=>{
            alternativesSend.push({answer:a.answer})
        })
        const rightAnswer = getValues('answerFlashCard')
        alternativesSend.push({answer:rightAnswer})
        data.time = convertTime()
        data.themes = temasSend
        data.alternatives = alternativesSend
        data.creator = payLoad.id
        data.id = idFlashCard
        ShuffleAlternativas(alternativesSend)
        await putFlashCard(data)
        console.log(data)
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
                            onIonChangeEnunciated={()=>{}}
                            onIonChangeSubject={()=>{}}
                            onIonChangeTitle={()=>{}}
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
                            titleForQuest=''
                            subjectForQuest=''
                            enunciatedForQuest=''
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
                        <GridAlternatives
                                onIonChange={()=>{}}
                                styleGrid={{}}                         
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
                                        name={`alternatives[${{answer}}].answer`}>                         
                                        </IonTextarea>
                                        <IonFabButton id='add-alternative' className='add-btn'  onClick={()=>{
                                            AddAlternative()
                                            console.log({answer})
                                            setValue(`alternatives[${{answer}}].answer`, '')
                                        }} color='light'><IonIcon color='success' icon={add}></IonIcon></IonFabButton>
                                    </IonRow>
                                    {alternatives.map((alternative:NewAlternative, index)=>(
                                        <IonRow key={index} style={{cursor:'default', marginTop:'1rem'}}  className='ion-justify-content-center colunas'>
                                            <Controller as={<IonInput style={{height:'auto', width:'10rem'}} key={index} className='alternativas' color='dark'  placeholder='alternativas'></IonInput>} 
                                            name={`alternatives[${index}].answer`}
                                            defaultValue={alternative.answer}
                                            control={control}
                                            />
                                            <IonFabButton  onClick={()=>RemoveAlternative(index)} className='remove-btn'  color='light'><IonIcon color='danger' icon={remove} ></IonIcon></IonFabButton>              
                                        </IonRow>
                                    ))}       
                                </GridAlternatives>
                        
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
                   <RowBtnCreate onClick={()=> null} style={{marginTop: '1.7rem' }} >Salvar</RowBtnCreate>

                </form>
                </IonContent>

            </IonPage>
        </>
    );

}

export default EditAlternativa;