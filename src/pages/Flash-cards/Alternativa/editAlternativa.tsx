import React, { useState } from 'react';
import useStateWithCallback from 'use-state-with-callback';
import {
    IonButton,
    IonPage,
    IonRow,
    IonFabButton,
    IonIcon,
    IonContent, 
    useIonViewWillLeave,
    useIonViewWillEnter,
    IonInput,
    IonTextarea
} from '@ionic/react'
import { add, remove} from 'ionicons/icons';
import { menuController } from '@ionic/core';
import { useHistory } from 'react-router';
import {  Payload, NewAlternative, FlashCard, putFlashCard, getRightAnswer, NewFlashCard } from '../../../services/flashCard.service';
import { getPayload} from '../../../services/Authentication.service';
import { ButtonArrow, CardQuestion, GridAlternatives, HeaderDefault, ModalDefault, ModalErrorDefault, RowTimer, Timer } from '../../styles/Page-default/Page-default-styled';
import { Controller, useForm } from 'react-hook-form';




const EditAlternativa: React.FC = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory()
    const [checked, setChecked] = useState<boolean>(false);
    const [shownTimer, setShownTimer] = useState<boolean>(false);
    const [showPopover, setShowPopover] = useState<boolean>(false);
    const [shownPopsave, setShownPopsave]= useState<boolean>(false);
    const [showModal, setShowModal] = useState(false)
    const [showModalExit, setShowModalExit] = useState(false)
    const [idFlashCard, setIdFlashCard] = useState<string>('')
    const [answer] = useState<string>('')

    const [alternatives, setAlternatives] = useState<NewAlternative[]>([]);
    let temas = {
        id:0,
        textPop:''
    }
    const [temasAt, setTemasAt] = useStateWithCallback<string[]>([], ()=>{
        CompareOldAndCurrenttValues()
    });
    const [time, setTime] = useState<number>();
    const [newTime, setNewTime] = useStateWithCallback<string>(':', () => {
        CompareOldAndCurrenttValues()
    });

    const popOverSave = () => {
        setShownPopsave(true);
        setTimeout(() => {
            setShownPopsave(false);
            setShowPopover(false);
        }, 1000)
    }

    const AddTema = () => {
        const inputValue = getValues(`themes[${temas.textPop}].textPop`) as string
        setTemasAt([...temasAt, inputValue])
        if(inputValue == ''){
            setTemasAt(temasAt)
        }
    }
    const RemoveTema = (textPop: string) => {
        const themeToBedeleted = temasAt.filter((theme) => textPop !== theme);
        setTemasAt(themeToBedeleted)
    }
    const AddAlternative = () => {
        const inputValue = getValues(`alternatives[${{answer}}].answer`)  
        setAlternatives([...alternatives, {answer:inputValue}])
        if (alternatives.length == 4 || inputValue == '') {
            setAlternatives(alternatives)   
        }else {
            alternatives.push({answer:inputValue})
        }
       
    }

    const RemoveAlternative = (answer:string, index:number) =>{
        const alternativeToBeDeleted = alternatives.filter((a) => answer !== a.answer)
        alternatives.splice(index, 1)
        setAlternatives(alternativeToBeDeleted)
    }

    const { register, handleSubmit, errors, setValue, getValues, control} = useForm()

    const removeRightAnswerOfAlternative = (answer:string) =>{ 
        const card = history.location.state as FlashCard         
        let alternativeDeleted = card.alternatives!.filter(alternative => alternative.answer !== answer)
        setAlternatives(alternativeDeleted)
    }

    async function getAnswer(id:string){
        const rightAnswer = await getRightAnswer(id) as string     
        setValue('answerFlashCard', rightAnswer)
        removeRightAnswerOfAlternative(rightAnswer)
    }
 const [toggleChek, setToggleChek] = useState<boolean>()

    useIonViewWillEnter(()=>{
        disableButton()
        if (history.location.state) {
            const card = history.location.state as FlashCard
            setValue('title', card.title)
            setValue('subject', card.subject)
            setValue('enunciated', card.enunciated)
            setIdFlashCard(card.id!)
            setTime(card.time!)
            getAnswer(card.id!)
            setTemasAt(card.themes) 
            console.log(card) 
            if(timeUnconverted(time!) == "00:00" || card.time == 0){ 
                setChecked(false)
                setShownTimer(false)
                setToggleChek(false)   
            }else{
                setChecked(true)
                setShownTimer(true)
                setToggleChek(true)
            }
           
        } else {
            console.log('Não tem nada');
        }
         
    },[])
    useIonViewWillLeave(()=>{
        menuController.enable(true)   
    }, [])
    

    const convertTime = () => {
        const [minutes, seconds] = newTime!.split(':').map(Number)
        const newTimeInSeconds = (minutes * 60) + seconds
        return newTimeInSeconds * 1000
    }
  
    const timeUnconverted = (time:number) =>{ 
      
        const timeMinutsUnconverted = Math.trunc((time!/1000)/60) //minutos
        const timeSecondsUnconverted = ((time!/1000) % 60 )//segundos

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

    var checkExit = false
    const enableButton = () => {
        const btnFinal = document.querySelector('.btn-final') as HTMLIonButtonElement
        btnFinal.removeAttribute("disabled")
        return checkExit = true
    }
    const disableButton = () => {
        const btnFinal = document.querySelector('.btn-final') as HTMLIonButtonElement
        btnFinal.setAttribute('disabled', 'disabled')
        
    }

 

    const onSubmit = async(data:NewFlashCard) =>{
        const payLoad = getPayload() as Payload
        let alternativesSend:NewAlternative[] = []
        let temasSend:string[] = []
        temasAt.map((textPop)=>{
            temasSend.push(textPop)
        })
        alternatives?.map((a)=>{
            alternativesSend.push({answer:a.answer})
        })
        const rightAnswer = getValues('answerFlashCard')
        alternativesSend.push({answer:rightAnswer})   
        data.themes = temasSend
        data.alternatives = alternativesSend
        data.creator = payLoad.id
        data.id = idFlashCard

        ShuffleAlternativas(alternativesSend)
        if(alternatives.length == 0){
            setIsOpen(true)
        }else if(convertTime()! < 10000 && checked == true && 
                timeUnconverted(time!) == "00:00" || 
                convertTime() == 0 && checked == true && 
                timeUnconverted(time!) == "00:00" && 
                checked == true){

            console.log(convertTime())
            console.log(timeUnconverted(time!))
            console.log(newTime)
            setIsOpen(true)

        }else {
            data.time = convertTime()
            await putFlashCard(data)
            console.log(data)
            setShowModal(true)
        }
        
    }
   
    

    const [isOpen, setIsOpen] = useState(false)
    const [isOpenLimit, setIsOpenLimit] = useState(false)

    const MsgsAndErrors = ()=>{
        if( errors.title && errors.subject  && errors.enunciated  && errors.answerFlashCard ||
            errors.title && errors.subject  && errors.enunciated ||
            errors.title && errors.subject  && errors.answerFlashCard ||
            errors.title && errors.subject ||
            errors.title && errors.enunciated ||
            errors.title && errors.answerFlashCard ||
           errors.subject  && errors.enunciated ||
           errors.subject  && errors.answerFlashCard ||
           errors.enunciated  && errors.answerFlashCard ){
            return 'Campos inválidos.'
        }else if(errors.enunciated){
            return 'Enunciado inválido.'
        }else if(errors.title){
            return 'Título inválido.'
        }else if(errors.answerFlashCard){
            return 'Resposta inválida.'
        }else if(errors.subject){
            return 'Matéria inválida.'
        }else if(alternatives.length == 0){
            return 'Numero insuficiênte de alternativas.'
        }else if(convertTime()! < 10000  && convertTime()! > 0 && checked == true){
            console.log(convertTime())
            return 'Tempo muito curto.' 
        }else if(convertTime() == 0 && checked == true && timeUnconverted(time!) == "00:00" && checked == true){
            return 'Tempo zerado, desabilite o tempo ou mude o tempo.' 
        }
       
         
       
    }

    const valueInputs = (value:string)=>{
        const inputValue = getValues(value)
        return inputValue
    }

    async function getFilterAnswer(id:string){
        const rightAnswer = await getRightAnswer(id) as string  
        return rightAnswer
    }

   

const Errors =()=>{

    if( errors.title && errors.subject  && errors.enunciated  && errors.answerFlashCard ||
        errors.title && errors.subject  && errors.enunciated ||
        errors.title && errors.subject  && errors.answerFlashCard ||
        errors.title && errors.subject ||
        errors.title && errors.enunciated ||
        errors.title && errors.answerFlashCard ||
       errors.subject  && errors.enunciated ||
       errors.subject  && errors.answerFlashCard ||
       errors.enunciated  && errors.answerFlashCard ){
           setIsOpen(true)
       }else if(errors.enunciated){
        setIsOpen(true)
        }else if(errors.title){
            setIsOpen(true)
        }else if(errors.answerFlashCard){
            setIsOpen(true)
        }else if(errors.subject){
            setIsOpen(true)
        }else if(alternatives.length == 0){
            setIsOpen(true)
        }
        
        
}

   interface CompareValues {
       title:string,
       subject:string,
       enunciated:string,
       alternatives:NewAlternative[],
       themes?:string[],
       answerFlashCard:string,
       timeString?:string
       toggle?:boolean
   }

   const checkTime =()=>{

        if(timeUnconverted(time!) !== "00:00" || time !== undefined ){
            if(newTime == ':' || newTime == '' || newTime == undefined || newTime == "00:00") {

                return timeUnconverted(time!)
            }else {
                return newTime
            }

        }else{
            if(newTime == ':' || newTime == '' || newTime == '0') {

                return timeUnconverted(time!)
            }else{

                return newTime
            }
        }
       
   }
  
    const CompareOldAndCurrenttValues = ()=>{
        if(history.location.state){
            const card = history.location.state as FlashCard
            const rightAnswer = getFilterAnswer(card.id!)
            rightAnswer.then(function(answer){
                let alternativeDeleted:NewAlternative[] = []          
                alternativeDeleted = card.alternatives!.filter(alternative => alternative.answer !== answer)
                const defaultValues:CompareValues = {
                    title:card.title,
                    subject:card.subject,
                    enunciated:card.enunciated,
                    alternatives:alternativeDeleted,                    
                    themes:card.themes,
                    answerFlashCard:answer,
                    timeString:timeUnconverted(time!),
                    toggle:toggleChek
                }

                const currentValues:CompareValues = {
                    title:valueInputs('title'),
                    subject:valueInputs('subject'),
                    enunciated:valueInputs('enunciated'),
                    alternatives:alternatives.length == 0 && alternativeDeleted || alternatives,                    
                    themes:temasAt == [''] && card.themes || temasAt,
                    answerFlashCard:valueInputs('answerFlashCard'),
                    timeString:checkTime(),
                    toggle:checked
                }
                if(JSON.stringify(currentValues) === JSON.stringify(defaultValues)) {

                    disableButton()
                }else{

                    enableButton()
                }
            })
        }else{
            console.log('nada aqui')
            disableButton()
        }   
        
    }

    
    return (
        <>
            <IonPage>
            <HeaderDefault>
                <ButtonArrow onClick={() => {
                    if(checkExit == true) {
                        setShowModalExit(true)
                    }else{
                        history.push('Flash-cards')
                        menuController.enable(true)
                        setChecked(false)
                        setShownTimer(false)
                    }
                   
                    }}/>
            </HeaderDefault>

            <IonContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardQuestion
                            onClickTheme={() => setShowPopover(true)}
                            isOpenThemes={showPopover}
                            onDidDismissTheme={() => setShowPopover(false)}
                            onClickSaveBtn={() => popOverSave()}
                            onClickCleanBtn={() => {
                                setShowPopover(false)
                                setTemasAt([])                             
                                CompareOldAndCurrenttValues()
                            }}
                            isOpenSaveTheme={shownPopsave}
                            onDidDismissSave={() => {
                                setShowPopover(false)
                                setShowPopover(false)
                            }}
                            refEnunciated={register({required:true, minLength:10})}
                            refSub={register({required:true, minLength:5, maxLength:50})}
                            refTitle={register({required:true, minLength:5, maxLength:50})}
                            onChangeEnun={()=> CompareOldAndCurrenttValues()}
                            onChangeSubj={()=> CompareOldAndCurrenttValues()}
                            onChangeTitle={()=> CompareOldAndCurrenttValues()}
                        >
                        <IonRow className='ion-justify-content-center'>
                            <IonInput maxlength={100} className='ios add-temas' placeholder='Tema' color='dark' name={`themes[${temas.textPop}].textPop`} ref={register({required:false})}   type='text'></IonInput>
                            <IonFabButton className='add-btn' onClick={() => {
                                AddTema()
                                console.log(getValues(`themes[${temas.textPop}].textPop`))
                                setValue(`themes[${temas.textPop}].textPop`, '')
                                CompareOldAndCurrenttValues()
                            }} color='light'><IonIcon color='success' icon={add}></IonIcon></IonFabButton>
                        </IonRow>
                        {temasAt.map((theme, index) => (
                                <IonRow key={index - 1} style={{ cursor: 'default', marginTop: '1rem'}} className='ion-justify-content-center'>
                                    <Controller as={<IonInput  key={index}  className='ios temas-inputs'  color='dark'></IonInput>} 
                                    name={`themes[${index}].textPop`}
                                    control={control}
                                    defaultValue={theme}
                                    />
                                    <IonFabButton onClick={() => {
                                        RemoveTema(theme)
                                        CompareOldAndCurrenttValues()
                                        }} className='remove-btn' color='light'><IonIcon color='danger' icon={remove} ></IonIcon></IonFabButton>
                                </IonRow>
                            ))}
                        </CardQuestion>


                        <ModalErrorDefault
                        backdropDismiss={false}
                        isOpen={showModal}
                        cssClass='ios modal-criar'
                        onClick={() => {
                            setShowModal(false)                        
                            history.push('/Flash-cards')                        
                        }}
                        msg='Alterações Salvas!'
                        onDidDismiss={()=>{}}
                        color='dark'
                        />
                        <ModalErrorDefault 
                        cssClass='ios modal-error-flash' 
                        backdropDismiss={true} 
                        msg={MsgsAndErrors()!} 
                        color='danger' 
                        onDidDismiss={()=> setIsOpen(false)} 
                        isOpen={isOpen} 
                        onClick={()=> {
                            setIsOpen(false)
                        }}/>
                        <ModalErrorDefault 
                        cssClass='ios modal-error-flash' 
                        backdropDismiss={true} 
                        msg={'Você atingiu o número máximo de alternativas.'} 
                        color='danger' 
                        onDidDismiss={()=> setIsOpenLimit(false)} 
                        isOpen={isOpenLimit} 
                        onClick={()=> {
                            setIsOpenLimit(false)
                        }}/>
                        <ModalDefault
                        isOpen={showModalExit}
                        onClickNo={() => {                        
                            setShowModalExit(false)
                        }}
                        onClickYes={() => {
                            setShowModalExit(false)
                            history.push('Flash-cards')
                            menuController.enable(true)
                            setChecked(false)
                            setShownTimer(false)
                        }}
                        msg='Tem certeza que deseja sair sem salvar?'
                        cssClass='ios modal-criar'
                        />

                        <GridAlternatives
                                onIonChange={()=> CompareOldAndCurrenttValues()}
                                styleGrid={{}}                         
                                style={{}}
                                refAlternatives={register({required:true})}
                                refAnswer={register({required:true})}
                                autoGrow={valueInputs('answerFlashCard') == '' && false || true}
                                nameAnswerFlashCard='answerFlashCard'
                                >
                                    <IonRow  className='ion-justify-content-center'>
                                        <IonTextarea  className='ios add-alternativas'  
                                        placeholder='Insira a/as alternativas' 
                                        color='dark' ref={register({required:false})} 
                                        name={`alternatives[${{answer}}].answer`}
                                        >                         
                                        </IonTextarea>
                                        <IonFabButton id='add-alternative' className='add-btn'  onClick={()=>{
                                            if(alternatives.length == 4)   setIsOpenLimit(true)
                                            AddAlternative()
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
                                            <IonFabButton  onClick={()=>{
                                                RemoveAlternative(alternative.answer, index)
                                                CompareOldAndCurrenttValues()
                                                }} className='remove-btn'  color='light'><IonIcon color='danger' icon={remove} ></IonIcon></IonFabButton>              
                                        </IonRow>
                                    ))}       
                                </GridAlternatives>
                        
                                <RowTimer 
                                onIonChange={(e) => {
                                    setChecked(e.detail.checked)
                                }}
                                onClick={() => {
                                    setShownTimer(!shownTimer)
                                    setNewTime('00:00')
                                    setTime(0)
                                }}
                                checked={checked}
                                style={{}}
                                >
                                    {shownTimer && <Timer  value={timeUnconverted(time!)} onChange={(event) => setNewTime(event.target.value)}  />}
                                </RowTimer>
                    <IonRow slot='start' className='ios ion-justify-content-center row-btn-final'>
                        <IonButton  type='submit' onClick={() => Errors()} style={{marginTop: '1.7rem' }} className='ios btn-final' color='light' size='default' >Salvar</IonButton>
                    </IonRow>

                </form>
                </IonContent>

            </IonPage>
        </>
    );

}

export default EditAlternativa;