import React, { useState } from 'react';
import {
    IonPage,
    IonRow,
    IonContent, 
    IonCol, 
    IonGrid, 
    useIonViewWillEnter, 
    useIonViewWillLeave
} from '@ionic/react'
import './styles.css'
import { useHistory } from 'react-router';
import CardStats from '../Card_stats_result/cardStats';
import { Alternative, Checker, FlashCard, getCheck } from '../../services/flashCard.service';
import CardRed from '../cardRed/cardRed';
import CardGreen from '../CardGreen/cardGreen';
import { menuController } from '@ionic/core';
import CardTime from '../CardTime/cardTime';
import { AreaFlip, FinalBtn, HeaderAnswerDefault, ModalDefault, Redone } from '../../pages/styles/Page-default/Page-default-styled';




const AnswerAlternativa: React.FC = () => {

    const history = useHistory()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [textMat, setTextMat] = useState<string>('')
    const [textAreaQuestion, setTextAreaQuestion] = useState<string>('')
    const [showPopover, setShowPopover] = useState<boolean>(false);
    const [shownPopsave, setShownPopsave] = useState<boolean>(false);
    const [shownPopsair, setShownPopsair] = useState<boolean>(false);
    const [shownPopResult, setShownPopResult] = useState<boolean>(false);
    const [shownIcon, setShownIcon] = useState(false)
    const [isFlipped, setIsFlipped] = useState<boolean>(false);
    const [alternatives, setAlternatives] = useState<Alternative[]>()
    const [idFlashCard, setIdFlashCard] = useState<string>('')
    const [progress, setProgress] = useState<number>(0)
    const [time, setTime] = useState<number>();
    const [seconds, setSeconds] = useState('')
    const [minutes, setMinutes] = useState('')
    const [cards, setCards] = useState<{}>()
    const [title, setTitle] = useState('')
    const [cardRed, setCardRed] = useState(<CardRed/>)
    const card = history.location.state as FlashCard
    const [check, setCheck] = useState<Checker>({
        answer: 'resposta-certa',
        correct: false
    })

  
    const [activeAlternative, setActiveAlternative] = useState<Alternative>({
        id: '123',
        answer: 'alternativa-ativada'
    })
    const [className, setClassName] = useState({
        id: -1,
        active: false,
    })
    const letras = ['a', 'b', 'c', 'd', 'e']
    const [themes, setThemes] = useState<string[]>([]);
    const [showLoading, setShowLoading] = useState(true);

    const settingLoading = () => {
        setTimeout(() => {
            setShowLoading(false);
            setIsFlipped(true)
        }, 1500);
    }
    useIonViewWillLeave(() => {
        menuController.enable(true)
    }, [])
    useIonViewWillEnter(() => {
        
        enableAlternatives()
        setClassName({
            id: -1,
            active: false
        })
        setShowLoading(false)
        setIsFlipped(false)
        if (history.location.state) {
            const card = history.location.state as FlashCard
            console.log(card)
            setTextMat(card.subject)
            setThemes(card.themes)
            setTextAreaQuestion(card.enunciated)
            setAlternatives(card.alternatives)
            setIdFlashCard(card.id)
            setTime(card.time!)
            setTitle(card.title)
        } else {
            console.log('Não tem nada');
        }
    }, [])
    const removeActive = () => {
        setClassName({
            id: -1,
            active: false
        })
    }

    const handleSelectAlternative = (alternative: Alternative, index: number) => {
        alternatives?.forEach(() => {
            setClassName({
                id: index,
                active: !className.active
            })
        })
        setShownIcon(true)
        setActiveAlternative(alternative)

    }
    const enableButton = () => {
        const btnFinal = document.querySelector('.btn-final') as HTMLIonButtonElement
        btnFinal.removeAttribute("disabled")
    }
    const handleFlipAnswer = async () => {
        let checker = await getCheck(idFlashCard, activeAlternative.answer)
        console.log(checker)
        ProgressBar(checker)
        setCheck(checker)
        disableAlternatives()

    }

    const disableAlternatives = () => {
        const eventAlternativas = document.querySelector('.array-div') as HTMLIonGridElement
        eventAlternativas.style.pointerEvents = 'none'
    }
    const enableAlternatives = () => {
        const eventAlternativas = document.querySelector('.array-div') as HTMLIonGridElement
        eventAlternativas.style.pointerEvents = 'auto'
    }
    const mystyle = {
        display: check!.correct && 'none' || 'block',
    }
    const ProgressBar = (validator:Checker)=>{
       if(validator.correct == true && progress >= 0){
            setProgress(progress + 0.30) 
       }else if(validator.correct == false && progress == 0){
            setProgress(0)  
       }else if(validator.correct == false && progress >= 0.30 || progress <= 0.30){
            setProgress(progress - 0.15)
       }
    }
    var i = 0
    var interValIntern = 0
    function cronometro(){
        const cardTime = <CardTime/>
        const card = history.location.state as FlashCard
        if(card.time !== 0){
                const timeToSeconds = (card.time!)/1000 
                let minutesVar =  Math.trunc(timeToSeconds/60)
                let secondsVar = timeToSeconds % 60
                    console.log(interValIntern)
                    interValIntern  = setInterval(()=>{
                        console.log(i++)
                        setMinutes((minutesVar).toString())
                            if(secondsVar === 0 && minutesVar !== 0 ){
                                setMinutes((minutesVar--).toString())
                                setSeconds((secondsVar = 60).toString())
                            }
                            if(i === 1){
                                clearInterval(interValIntern)
                                console.log(i)
                            }else{
                                setSeconds((secondsVar--).toString()) 
                                console.log(i)
                            }
           
                            if(secondsVar === -1 && minutesVar === 0){
                                clearInterval(interValIntern)
                                setSeconds((secondsVar + 1).toString())
                                setMinutes((minutesVar).toString())
                                setCards(cardTime)
                                setIsFlipped(true)
                                console.log(isFlipped)
                            }                            
                        }, 1000)

                
        }      
    }


 
    return (
        <>
            <IonPage>

               <HeaderAnswerDefault onClickPopSair={()=>setShownPopsair(true)} valueprogressBar={progress} title={title}/>

                <IonContent>
                    <ModalDefault
                        isOpen={shownPopsair}
                        onClickYes={() => {
                            setShownPopsair(false)
                            history.push('/Flash-cards')
                            removeActive()
                            enableAlternatives()
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
                   textMat={textMat}
                   textAreaQuestion={textAreaQuestion}
                   style={{ display: className.active && 'block' || 'none', opacity: showLoading == true && 0 }}
                   onClickArrowFlip={() => {
                    setShowLoading(!showLoading)
                    handleFlipAnswer()
                    settingLoading()
                    }}
                    isOpenLoadig={showLoading}
                    card={check!.correct && <CardGreen textRightAnswer={check.answer} /> || cardRed}
                   >
                    {themes.map((theme: string, index) => (
                        <IonRow key={index} style={{ cursor: 'default', marginTop: '1rem' }} className='ion-justify-content-center'>
                            <IonCol key={index} className='ios temas-inputs' placeholder='Temas' color='dark'>{theme}</IonCol>
                        </IonRow>
                    ))}
                   </AreaFlip>


                    <IonGrid key={alternatives?.length} style={{ pointerEvent: isFlipped && 'unset' || 'auto' }} className='array-div'>
                        {alternatives?.map((alternative: Alternative, i) => (
                            
                            <IonRow key={i + 1} style={{ cursor: 'default', marginTop: '1rem' }} className='ion-justify-content-center colunas'>
                                <IonCol key={i} onClick={() => handleSelectAlternative(alternative, i)} size='1' className={(i === className.id && className.active) && 'active-letras' || 'letras-alternativas'}> {letras[i]}</IonCol>
                                <IonCol onClick={() => handleSelectAlternative(alternative, i)}
                                    style={{ height: 'auto', width: '10rem' }}
                                    key={alternative.id}
                                    className={(i === className.id && className.active) && 'active' || 'alternativas-respostas'}
                                    color='dark'>{alternative.answer}</IonCol>
                            </IonRow>
                        ))}
                    </IonGrid>
                    <FinalBtn
                    onClick={() => {
                        if(check!.correct){
                            removeActive()
                            setShownPopResult(false)
                            history.push('/Flash-cards')
                            setIsFlipped(!isFlipped)
                        }else{
                            setShownPopResult(true)
                        }
                    }}
                    disabled={isFlipped == false && true}
                    />
                    <CardStats
                        backdropDismiss={false}
                        isOpen={shownPopResult}
                        onClickSair={() => {
                            removeActive()
                            setShownPopResult(false)
                            history.push('/Flash-cards')
                            setIsFlipped(true)
                        }}
                        textConquista=''
                        textCorrect=''
                        textExp=''
                        textTotal=''
                    >
                        <Redone style={mystyle} onClick={() => {
                            enableAlternatives()
                            removeActive()
                            setShownPopResult(false)
                            setIsFlipped(false)
                        }} />
                    </CardStats>
                </IonContent>

            </IonPage>
        </>
    );

}
export default AnswerAlternativa

