import React, {useState} from 'react';
import {
    IonButton,
    IonPage,
    IonRow,
    IonContent, 
    IonCol, 
    useIonViewWillLeave, 
    useIonViewWillEnter,
    IonInput, 
} from '@ionic/react'
import { menuController } from '@ionic/core';
import { useHistory } from 'react-router';
import CardStats from '../Card_stats_result/cardStats';
import CardGreen from '../CardGreen/cardGreen';
import { Checker, FlashCard, getCheck } from '../../services/flashCard.service';
import CardRed from '../cardRed/cardRed';
import { AreaDissertativeAnswer, AreaFlip, HeaderAnswerDefault, ModalDefault, Redone } from '../../pages/styles/Page-default/Page-default-styled';
import { Controller, useForm } from 'react-hook-form';
import { useStateWithCallbackInstant } from 'use-state-with-callback';




const AnswerDissertativa: React.FC = () => {


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory()
    const [textAreaAnswer, setTextAreaAnswer] = useStateWithCallbackInstant<string>('', ()=>{
        if(getValues('answerFlashCard') == '' || textAreaAnswer ==''){
            disableButtonFinal()
        }else{
            enableButtonFinal()
        }
    })
    const [showPopover, setShowPopover] = useState<boolean>(false);
    const [shownPopsair, setShownPopsair] = useState<boolean>(false);
    const [shownPopResult, setShownPopResult] = useState<boolean>(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const [showLoading, setShowLoading] = useState(true);
    const [shownIcon, setShownIcon] = useState(false)
    const [idFlashCard, setIdFlashCard] = useState<string>('')
    const [cardRed] = useState(<CardRed />)
    const [themes, setThemes] = useState<string[]>([]);
    const [time] = useState<number>();
    const [seconds] = useState('')
    const [minutes] = useState('')
    const [check, setCheck] = useState<Checker>({
        answer: 'resposta-certa',
        correct: false
    })
    const [buttonAnswer] = useState<{}>(<IonButton disabled onClick={() => {
        setShownIcon(true)
        disableAnswer()
    }} className='ios btn-final-answer' color='light' size='default' >Submeter Resposta</IonButton>)
    const [shownButton, setShownButton] = useState(false)
    const settingLoading = () => {
        setTimeout(() => {
            setShowLoading(false);
            setIsFlipped(!isFlipped)
            enableButtonFinal()
            disableAnswer()
        }, 1500);
    }
    useIonViewWillLeave(()=>{
        menuController.enable(true);
        
    },[])
    const getValuesCards = async()=>{
        if (history.location.state) {
            try{
                const card = history.location.state as FlashCard
                setValue('subject' ,card.subject)
                setThemes(card.themes)
                setValue('enunciated' ,card.enunciated)
                setIdFlashCard(card.id!)
                setValue('title' ,card.title)
            }catch(e){
                console.log(e)
            }
           
        }else{
            console.log('nada aqui')
        }
    }
    useIonViewWillEnter(() => {
        enableAnswer()
        setShownIcon(false)
        setShownButton(!shownButton)
        setShowLoading(false)
        setIsFlipped(false)
        getValuesCards()
    }, [])
    const enableButtonFinal = () => {
        const btnFinal = document.querySelector('.btn-final-answer') as HTMLIonButtonElement
        btnFinal.removeAttribute("disabled")
    }
    const disableButtonFinal = () => {
        const btnFinal = document.querySelector('.btn-final-answer') as HTMLIonButtonElement
        btnFinal.setAttribute('disabled', 'disabled')
    }
    const disableAnswer = () => {
        const eventAlternativas = document.querySelector('.card-dissertativa-secundary') as HTMLIonCardElement
        eventAlternativas.style.pointerEvents = 'none'
    }
    const enableAnswer = () => {
        const eventAlternativas = document.querySelector('.card-dissertativa-secundary') as HTMLIonCardElement
        eventAlternativas.style.pointerEvents = 'auto'
    }
    const mystyle = {
        display: check.correct! && 'none' || 'block'
    }
    const handleFlipAnswer = async () => {
        let checker = await getCheck(idFlashCard, textAreaAnswer!)
        setCheck(checker)
        ProgressBar(checker)
        disableAnswer()
    }
    
    
    const [progress, setProgress] = useState<number>(0)
    const ProgressBar = (validator:Checker)=>{
        var progressNumber:string
        if(validator.correct == true && (1 - progress) == 0.20 ){
            setProgress(1)
        }
        if(validator.correct == true && (1 - progress) < 0.20 ){
            setProgress(1)
            if(progress == 1){
                progressNumber = ((1 - progress) + (0.20 - (1 - progress))).toFixed(2)
            setProgress(parseFloat(progressNumber))
            }          
        }else if(validator.correct == true && (1 - progress) > 0.20 ){
            progressNumber = (progress + 0.20).toFixed(2)
            setProgress(parseFloat(progressNumber))
        }else if(validator.correct == false && progress == 0){
            setProgress(0)  
        }else if(validator.correct == false && progress >= 0.20 || progress <= 0.20){
            progressNumber = (progress - 0.10).toFixed(2)
            setProgress(parseFloat(progressNumber))
        }
     }


     const {register, setValue, getValues, control} = useForm()
     const [actualLevel, setActualLevel] = useState(0)
     const [nextLevel, setNextLevel] = useState(1)  
 
      const DinamicLevel = ()=>{
         var nextLevelNumber:number = actualLevel + 1
         if(progress >= 0.9){
             nextLevelNumber ++
             setActualLevel(actualLevel + 1)
             setNextLevel(nextLevelNumber)
         }
         if(progress == 0 && actualLevel !== 0){
             setActualLevel(actualLevel - 1)
             setNextLevel(actualLevel - 1)
         }
 
      }

    return (
        <>
            <IonPage>

            <HeaderAnswerDefault actualLevel={actualLevel} nextLevel={nextLevel} onClickPopSair={()=>setShownPopsair(true)} valueprogressBar={progress} refTitle={register({required:true})} defaultValueTitle={getValues('title')}/>

                <IonContent>
                <ModalDefault
                        isOpen={shownPopsair}
                        onClickYes={() => {
                            setShownPopsair(false)
                            history.push('/Flash-cards')
                            enableAnswer()
                            setValue('answerFlashCard', '')
                        }}
                        onClickNo={() => setShownPopsair(false)}
                        msg='Deseja mesmo sair?'
                        cssClass='ios modalSair'
                    />
                <IonCol style={{display: time === 0 && 'none' || 'block'}} className='timer-flashcard' >
                    {parseInt(minutes) < 10 && '0'}{minutes}:{parseInt(seconds) < 10 && '0'}{seconds}
                </IonCol>
                <AreaFlip
                   isFlipped={isFlipped}
                   onClickPopTheme={() => setShowPopover(true)}
                   isOpen={showPopover}
                   onDidDismissPopTheme={e => setShowPopover(false)}
                   onClickClosePop={()=> setShowPopover(false)}
                   refEnunciated={register({required:true})}
                   defaultValueEnunciated={getValues('enunciated')}
                   refSubj={register({required:true})}
                   defaultValueSubj={getValues('subject')}
                   style={{ display: shownIcon && 'block' || 'none', opacity: showLoading == true && 0 }}
                   onClickArrowFlip={() => {
                    setShowLoading(true)
                    handleFlipAnswer()
                    settingLoading()
                    disableAnswer()
                    setShownButton(!shownButton)
                    }}
                    isOpenLoadig={showLoading}
                    card={check!.correct && <CardGreen textRightAnswer={check.answer} /> || cardRed}
                   >
                    {themes.map((theme: string, index) => (
                         <IonRow key={index - 1} style={{ cursor: 'default', marginTop: '1rem'}} className='ion-justify-content-center'>
                         <Controller as={<IonInput key={index} className='ios temas-inputs'  color='dark'></IonInput>} 
                         name={`themes[${index}].textPop`}
                         control={control}
                         defaultValue={theme}
                         />
                     </IonRow>
                    ))}
                   </AreaFlip>

                   <AreaDissertativeAnswer
                    onIonChange={(event) => {
                        setTextAreaAnswer(event.detail.value!)

                    }}
                    refAnswer={register({required:true})}
                    />
                    
                    <IonRow className='ios ion-justify-content-center row-btn-final'>
                        {shownButton && buttonAnswer || <IonButton onClick={() => setShownPopResult(true)} className='ios btn-final-answer' color='light' size='default' >Finalizar</IonButton>}
                    </IonRow>
                    <CardStats
                        backdropDismiss={false}
                        isOpen={shownPopResult}
                        onClickSair={() => {
                            setShownPopResult(false)
                            history.push('/Flash-cards')
                            setIsFlipped(!isFlipped)
                            setValue('answerFlashCard', '')
                        }}
                        textConquista=''
                        textCorrect=''
                        textExp=''
                        textTotal=''
                        condition={check!.correct}
                    >
                       {check!.correct && '' || <Redone style={mystyle} onClick={() => {
                             enableAnswer()
                             setShownIcon(false)
                             setShownPopResult(false)
                             setIsFlipped(false)
                             setShownButton(!shownButton)
                        }} />}
                    </CardStats>
  
                </IonContent>

            </IonPage>
        </>
    );

}

export default AnswerDissertativa;
