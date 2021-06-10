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
    IonLoading
} from '@ionic/react'
import { add,  remove } from 'ionicons/icons';
import { menuController } from '@ionic/core';
import { useHistory } from 'react-router';
import { getPayload } from '../../../services/Authentication.service';
import { Payload, putFlashCard, FlashCard, getRightAnswer, NewFlashCard } from '../../../services/flashCard.service';
import { ButtonArrow, HeaderDefault, CardQuestion, Timer,  CreateAreaDissertativeAnswer, RowTimer, ModalErrorDefault, ModalDefault } from '../../styles/Page-default/Page-default-styled';
import { Controller, useForm } from 'react-hook-form';



const EditDissertativa: React.FC = () => {


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory()
    const [checked, setChecked] = useState<boolean>(false);
    const [shownTimer, setShownTimer] = useState<boolean>(false);
    const [showPopover, setShowPopover] = useState<boolean>(false);
    const [shownPopsave, setShownPopsave]= useState<boolean>(false);
    const [showModal, setShowModal] = useState(false)
    const [showModalExit, setShowModalExit] = useState(false)
    const [idFlashCard, setIdFlashCard] = useState<string>('')
    const [showLoading, setShowLoading] = useState(true);
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

     async function getAnswer(id:string){
        const rightAnswer = await getRightAnswer(id) as string
        setValue('answerFlashCard', rightAnswer)
    }

    useIonViewWillEnter(() => {  
        disableButton()
        if (history.location.state) {
            const card = history.location.state as FlashCard
            console.log(card)
            setValue('title', card.title)
            setValue('subject', card.subject)
            setValue('enunciated', card.enunciated)
            setIdFlashCard(card.id!)
            setTime(card.time)
            getAnswer(card.id!)
            setTemasAt(card.themes)
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

    }, [])

    useIonViewWillLeave(()=>{
        menuController.enable(true)
    }, [])
   
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

    const convertTime = () => {
        const [minutes, seconds] = newTime.split(':').map(Number)
        const newTimeInSeconds = (minutes * 60) + seconds
        return newTimeInSeconds * 1000

    }

    const { register, handleSubmit, errors, setValue, getValues, control} = useForm()

    var checkExit = false
    const enableButton = () => {
        const btnFinal = document.querySelector('.btn-final-edit-diss') as HTMLIonButtonElement
        btnFinal.removeAttribute("disabled") 
        return checkExit = true 
    }

    const disableButton = () => {
        const btnFinal = document.querySelector('.btn-final-edit-diss') as HTMLIonButtonElement
        btnFinal.setAttribute('disabled', 'disabled')
        
    }

    const onSubmit = async (data:NewFlashCard)=>{
        const payload = getPayload() as Payload
        let temasSend:string[] = []
        temasAt.map((textPop)=>{
            temasSend.push(textPop)
        })
        data.themes = temasSend
        data.creator = payload.id
        data.id = idFlashCard
        data.alternatives = []
        if(convertTime()! < 10000 && checked == true && 
                timeUnconverted(time!) == "00:00" || 
                convertTime() == 0 && checked == true && 
                timeUnconverted(time!) == "00:00" && 
                checked == true){

            setIsOpen(true)

        }else {
            data.time = convertTime()
            await putFlashCard(data)
            console.log(data)
            setShowModal(true)
        }
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

   const [isOpen, setIsOpen] = useState(false)

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
        }  
    }


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


   interface CompareValues {
    title:string,
    subject:string,
    enunciated:string,
    themes:string[],
    answerFlashCard:string,
    timeString?:string
    toggle?:boolean
}
const [toggleChek, setToggleChek] = useState<boolean>()

   const CompareOldAndCurrenttValues = async()=>{
    if(history.location.state){
        const card = history.location.state as FlashCard
        const rightAnswer = getFilterAnswer(card.id!)
            try{
                rightAnswer.then(function(answer){
                    const defaultValues:CompareValues = {
                        title:card.title,
                        subject:card.subject,
                        enunciated:card.enunciated,                   
                        themes:card.themes,
                        answerFlashCard:answer.toString(),
                        timeString:timeUnconverted(time!),
                        toggle:toggleChek == undefined && false || toggleChek
                    }
                    console.log(defaultValues)
                    const currentValues:CompareValues = {
                        title:valueInputs('title'),
                        subject:valueInputs('subject'),
                        enunciated:valueInputs('enunciated'),                 
                        themes:temasAt == [''] && card.themes || temasAt,
                        answerFlashCard:valueInputs('answerFlashCard'),
                        timeString:checkTime(),
                        toggle:checked
                    }
                    console.log(currentValues)
                    if(JSON.stringify(currentValues) === JSON.stringify(defaultValues)) {
                        console.log('ingual')
                        disableButton()
                    }else if(JSON.stringify(currentValues) !== JSON.stringify(defaultValues)){
                        console.log('diferente')
                        enableButton()
                    }
                })
            }catch(e){
                console.log(e)   
            }
             
    }else{
        console.log('nada aqui')
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
                            onDidDismissTheme={e => setShowPopover(false)}
                            onClickSaveBtn={() => popOverSave()}
                            onClickCleanBtn={() => {
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
                                setValue(`themes[${temas.textPop}].textPop`, '')
                                CompareOldAndCurrenttValues()
                            }} color='light'><IonIcon color='success' icon={add}></IonIcon></IonFabButton>
                        </IonRow>
                        {temasAt.map((tema, index) => (
                                <IonRow key={index - 1} style={{ cursor: 'default', marginTop: '1rem'}} className='ion-justify-content-center'>
                                    <Controller as={<IonInput key={index} className='ios temas-inputs'  color='dark'></IonInput>} 
                                    name={`themes[${index}].textPop`}
                                    control={control}
                                    defaultValue={tema}
                                    />
                                    <IonFabButton onClick={() => {
                                        RemoveTema(tema)
                                        CompareOldAndCurrenttValues()
                                        }} className='remove-btn' color='light'><IonIcon color='danger' icon={remove} ></IonIcon></IonFabButton>
                                </IonRow>
                            ))
                        
                            }
                        </CardQuestion>

                    <CreateAreaDissertativeAnswer         
                        refAnswer={register({required:true})}
                        onIonChange={(e)=>{
                            CompareOldAndCurrenttValues()
                            valueInputs('answerFlashCard') == '' ? setShowLoading(true) : setShowLoading(false)
                        }}
                    />

                   <RowTimer 
                    onIonChange={(e) => setChecked(e.detail.checked)}
                    onClick={() => {
                        setShownTimer(!shownTimer)
                        setNewTime('00:00')
                        setTime(0)
                    }}
                    checked={checked}
                    style={{}}
                    >
                        {shownTimer && <Timer value={timeUnconverted(time!)} onChange={(event) => setNewTime(event.target.value!)} />}
                    </RowTimer>

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
                         <IonLoading
                        showBackdrop={true}
                        cssClass='loading-edit'
                        isOpen={showLoading}
                        duration={1000}
                        />
                    <IonRow slot='start' className='ios ion-justify-content-center row-btn-final'>
                        <IonButton  type='submit' onClick={() => Errors()} style={{marginTop: '1.7rem' }} className='ios btn-final-edit-diss' color='light' size='default' >Salvar</IonButton>
                    </IonRow>
                </form>
                </IonContent>

            </IonPage>
        </>
    );

}


export default EditDissertativa;


