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




const AnswerDissertativa: React.FC = () => {


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory()
    const [textAreaAnswer, setTextAreaAnswer] = useState<string>('')
    const [showPopover, setShowPopover] = useState<boolean>(false);
    const [shownPopsair, setShownPopsair] = useState<boolean>(false);
    const [shownPopResult, setShownPopResult] = useState<boolean>(false);
    const [isFlipped, setIsflipped] = useState(false);
    const [showLoading, setShowLoading] = useState(true);
    const [shownIcon, setShownIcon] = useState(false)
    const [idFlashCard, setIdFlashCard] = useState<string>('')
    const [cardRed, setCardRed] = useState(<CardRed />)
    const [themes, setThemes] = useState<string[]>([]);
    const [time, setTime] = useState<number>();
    const [seconds, setSeconds] = useState('')
    const [minutes, setMinutes] = useState('')
    const [check, setCheck] = useState<Checker>({
        answer: 'resposta-certa',
        correct: false
    })
    const [buttonAnswer, setButtonAnswer] = useState<{}>(<IonButton disabled onClick={() => {
        setShownIcon(true)
        disableAnswer()
    }} className='ios btn-final' color='light' size='default' >Submeter Resposta</IonButton>)
    const [shownButton, setShownButton] = useState(false)
    const settingLoading = () => {
        setTimeout(() => {
            setShowLoading(false);
            setIsflipped(!isFlipped)
            enableButton()
            disableAnswer()
        }, 1500);
    }
    useIonViewWillLeave(()=>{
        menuController.enable(true);
        
    },[])
    useIonViewWillEnter(() => {
        enableAnswer()
        setShownIcon(false)
        setShownButton(!shownButton)
        setShowLoading(false)
        setIsflipped(false)
        if (history.location.state) {
            const card = history.location.state as FlashCard
            console.log(card)
            setValue('subject' ,card.subject)
            setThemes(card.themes)
            setValue('enunciated' ,card.enunciated)
            setIdFlashCard(card.id)
            setValue('title' ,card.title)
        } else {
            console.log('Não tem nada');
        }
    }, [])
    const enableButton = () => {
        const btnFinal = document.querySelector('.btn-final') as HTMLIonButtonElement
        btnFinal.removeAttribute("disabled")
    }
    const disableButton = () => {
        const btnFinal = document.querySelector('.btn-final') as HTMLIonButtonElement
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
        let checker = await getCheck(idFlashCard, textAreaAnswer)
        console.log(checker)
        setCheck(checker)
        ProgressBar(checker)
        disableAnswer()
    }
    const handleHabilit = ()=>{
        if(check!.correct){
            history.push('Flash-cards')
            setIsflipped(!isFlipped)
            setValue('answerFlashCard', '')
        }else{
            setShownPopResult(true)
        }
    }
    const changeText = (event:CustomEvent)=>{
        setTextAreaAnswer(event.detail.value!)
        if(event.detail.value! !== ''){
            enableButton()
        }else{
            disableButton()
        }

    }
    const [progress, setProgress] = useState<number>(0)
    const ProgressBar = (validator:Checker)=>{
        if(validator.correct == true && progress >= 0){
             setProgress(progress + 0.30) 
        }else if(validator.correct == false && progress == 0){
             setProgress(0)  
        }else if(validator.correct == false && progress >= 0.30 || progress <= 0.30){
             setProgress(progress - 0.15)
        }
     }

     const {register, setValue, getValues, control} = useForm()


    return (
        <>
            <IonPage>

            <HeaderAnswerDefault onClickPopSair={()=>setShownPopsair(true)} valueprogressBar={progress} refTitle={register({required:true})} defaultValueTitle={getValues('title')}/>

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
                    onIonChange={(event:CustomEvent) => changeText(event)}
                    refAnswer={register({required:true})}
                    />
                    
                    <IonRow className='ios ion-justify-content-center row-btn-final'>
                        {shownButton && buttonAnswer || <IonButton onClick={() => handleHabilit()} className='ios btn-final' color='light' size='default' >Finalizar</IonButton>}
                    </IonRow>
                    <CardStats
                        backdropDismiss={false}
                        isOpen={shownPopResult}
                        onClickSair={() => {
                            setShownPopResult(false)
                            history.push('/Flash-cards')
                            setIsflipped(!isFlipped)
                            setValue('answerFlashCard', '')
                        }}
                        textConquista=''
                        textCorrect=''
                        textExp=''
                        textTotal=''
                    >
                    <Redone style={mystyle} onClick={() => {
                            enableAnswer()
                            setShownIcon(false)
                            setShownPopResult(false)
                            setIsflipped(false)
                            setShownButton(!shownButton)
                        }} />

                    </CardStats>
  
                </IonContent>

            </IonPage>
        </>
    );

}

export default AnswerDissertativa;
