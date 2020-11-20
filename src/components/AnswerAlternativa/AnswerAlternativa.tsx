import React, { useState } from 'react';
import {
    IonButton,
    IonPage,
    IonRow,
    IonFabButton,
    IonHeader,
    IonLabel,
    IonContent, IonCard, IonCardContent, IonTextarea, IonCardHeader, IonCol, IonGrid, IonPopover, IonProgressBar, IonToolbar, IonIcon, useIonViewWillEnter, useIonViewWillLeave, IonLoading
} from '@ionic/react'
import './styles.css'
import { arrowForward, card, time } from 'ionicons/icons';
import ReactCardFlip from 'react-card-flip';
import SairTelaResposta from '../CardMessages/msg_sair_tela_resposta';
import { useHistory } from 'react-router';
import CardStats from '../Card_stats_result/cardStats';
import { Alternative, Checker, FlashCard, getCheck } from '../../services/flashCard.service';
import CardRed from '../cardRed/cardRed';
import CardGreen from '../CardGreen/cardGreen';
import { menuController } from '@ionic/core';
import CardTime from '../CardTime/cardTime';




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
    const [isFlipped, setIsflipped] = useState(false);
    const [alternatives, setAlternatives] = useState<Alternative[]>()
    const [idFlashCard, setIdFlashCard] = useState<string>('')
    const [progress, setProgress] = useState<number>(0)
    const [time, setTime] = useState<number>();
    const [seconds, setSeconds] = useState('')
    const [minutes, setMinutes] = useState('')
    const [cards, setCards] = useState<{}>()
    const card = history.location.state as FlashCard
    const [repeat, setRepeat] = useState({
        count:0
    })
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
    const [cardRed, setCardRed] = useState(<CardRed />)
    const [showLoading, setShowLoading] = useState(true);

    const settingLoading = () => {
        setTimeout(() => {
            setShowLoading(false);
            setIsflipped(!isFlipped)
            disableAlternatives()
        }, 1500);
    }
    const popOverSave = () => {
        setShownPopsave(true);
        setTimeout(() => {
            setShownPopsave(false);
            setShowPopover(false);
        }, 1000)
    }
    useIonViewWillLeave(() => {
        menuController.enable(true)
        

    }, [])
    const handleCount =()=>{
        
        setRepeat(prev=>({count:prev.count + 1}))
        console.log(repeat.count)
    }
    useIonViewWillEnter(() => {
        cronometro()
        console.log(repeat.count)
        setClassName({
            id: -1,
            active: false
        })
        setShowLoading(false)
        setIsflipped(false)
        if (history.location.state) {
            const card = history.location.state as FlashCard
            console.log(card)
            setTextMat(card.subject)
            setThemes(card.themes)
            setTextAreaQuestion(card.enunciated)
            setAlternatives(card.alternatives)
            setIdFlashCard(card.id)
            setTime(card.time!)
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
        if(checker.correct){
            setCards(<CardGreen textRightAnswer={check.answer}/>)
        }else{
            setCards(<CardRed/>)
        }
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
        display: check!.correct && 'none' || 'block'
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
    const cronometro = ()=>{
        const card = history.location.state as FlashCard
        if(card.time !== 0){
            const timeToSeconds = (card.time!)/1000 
            let minutes =  Math.trunc(timeToSeconds/60)
            let seconds = timeToSeconds % 60
            console.log(minutes)
            console.log(seconds)
            var interval = setInterval(()=>{
                if(minutes > 10){
                    setMinutes(('0'+ minutes).toString())            
                }
                if(seconds > 10){
                    setSeconds(('0'+ seconds).toString())
                }
                setMinutes((minutes).toString())
                if(seconds === 0 && minutes !== 0 ){
                    setMinutes((minutes--).toString())
                    setSeconds((seconds = 60).toString())
                }
                setSeconds((seconds--).toString())
                if(seconds === 0 && minutes === 0){
                    clearInterval(interval)
                    setSeconds('0')
                    setMinutes('0')
                    setCards(<CardTime/>)
                    setIsflipped(!isFlipped)
                }
                }, 1000)
                
        }
        
    }
    return (
        <>
            <IonPage>
                <IonHeader className='custom-header'>
                    <IonToolbar>
                        <IonFabButton onClick={() => setShownPopsair(true)} className='btnSair-answer' color='light' slot='end' size='small'>
                            Sair
                    </IonFabButton>
                    </IonToolbar>
                    <IonRow className='row-level-progress'>
                        <IonRow className='ion-justify-content-center'>
                            <IonLabel className="label-lvl">LV</IonLabel>
                        </IonRow>
                        <IonRow style={{ height: '1rem' }} className='ion-justify-content-center row-progress'>
                            <IonLabel className="start-lvl">0</IonLabel>
                            <IonProgressBar className='progress-bar' value={progress}></IonProgressBar>
                            <IonLabel className="start-lvl">1</IonLabel>
                        </IonRow>
                    </IonRow>
                </IonHeader>


                <IonContent>
                    <SairTelaResposta
                        isOpen={shownPopsair}
                        onClickSim={() => {
                            setShownPopsair(false)
                            history.push('/Flash-cards')
                            removeActive()
                            enableAlternatives()
                            handleCount()
                        }}
                        onClickNao={() => setShownPopsair(false)}
                        onDidDismiss={() => setShownPopsair(false)}

                    />
                     
                        <IonCol style={{display: time === 0 && 'none' || 'block'}} className='timer-flashcard' >
                            {parseInt(minutes) < 10 && '0'}{minutes}:{parseInt(seconds) < 10 && '0'}{seconds}
                        </IonCol> 
                    <ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal' flipSpeedBackToFront={1.1} flipSpeedFrontToBack={1.1}>
                        <IonCard  className='card-dissertativa' color='light'>
                            <IonCardHeader style={{ padding: 0 }}>
                                <IonRow className='ios ion-justify-content-space-between row-header'>
                                    <IonButton onClick={() => setShowPopover(true)} className="ios btn-tema-dissertativa">Tema</IonButton>
                                    <IonPopover
                                        isOpen={showPopover}
                                        cssClass='my-custom-class tema'
                                        onDidDismiss={e => setShowPopover(false)}
                                    >
                                        <IonRow style={{ marginTop: '0.9rem' }} className='ion-justify-content-center'>
                                            <IonLabel style={{ fontWeight: 'bold', fontSize: '18px' }} color='dark'>Temas</IonLabel>
                                        </IonRow>
                                        <IonGrid className='back-temas'>
                                            {themes.map((theme: string, index) => (
                                                <IonRow key={index} style={{ cursor: 'default', marginTop: '1rem' }} className='ion-justify-content-center'>
                                                    <IonCol key={index} className='ios temas-inputs' placeholder='Temas' color='dark'>{theme}</IonCol>
                                                </IonRow>
                                            ))}
                                        </IonGrid>
                                        <IonRow style={{ marginTop: '-0.9rem' }} className='ion-justify-content-center row-btn'>
                                            <IonButton onClick={() => {
                                                setShowPopover(false)
                                            }} color='light' className='btn-cancel'>Fechar</IonButton>
                                        </IonRow>
                                    </IonPopover>
                                    <IonPopover
                                        isOpen={shownPopsave}
                                        cssClass='my-custom-class save'
                                        onDidDismiss={() => {
                                            setShowPopover(false)
                                            setShowPopover(false)
                                        }}
                                    >
                                        <IonRow className='ion-justify-content-center ion-text-align-center'>
                                            <IonLabel style={{ fontWeight: 'bold', fontSize: '18px', lineHeight: '8rem' }} color='success'>Temas</IonLabel>
                                        </IonRow>
                                    </IonPopover>

                                    <IonCol className="titulo" >{textMat}</IonCol>
                                </IonRow>
                            </IonCardHeader>
                            <IonCardContent className="content-background">
                                <IonRow className="ios row-dissertativa">
                                    <IonTextarea
                                        overflow-scroll="true"
                                        rows={5}
                                        cols={20}
                                        required
                                        className='ios question'
                                        color='dark'>
                                        {textAreaQuestion}
                                    </IonTextarea>
                                </IonRow>
                            </IonCardContent>
                            <IonRow className='row-footer' color='light'></IonRow>
                            <IonRow className='ios ion-justify-content-center'>
                                <IonIcon style={{ display: className.active && 'block' || 'none', opacity: showLoading == true && 0 }} onClick={() => {
                                    setShowLoading(!showLoading)
                                    handleFlipAnswer()
                                    settingLoading()
                                   
                                }} className='ios arrow-foward' color='primary' src={arrowForward}></IonIcon>
                            </IonRow>
                            <IonLoading
                                showBackdrop={false}
                                cssClass='loading-custom'
                                isOpen={showLoading}
                                duration={600}
                            />
                        </IonCard >
                        {cards}
                        
                    </ReactCardFlip>


                    <IonGrid key={alternatives?.length} style={{ pointerEvent: isFlipped && 'none' || 'auto' }} className='array-div'>
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
                    <IonRow className='ios ion-justify-content-center row-btn-final'>
                        <IonButton disabled={isFlipped == false && true} onClick={() => {
                            setShownPopResult(true)
                            enableAlternatives()
                        }} className='ios btn-final' color='light' size='default' >Finalizar</IonButton>
                    </IonRow>
                    <CardStats
                        backdropDismiss={false}
                        isOpen={shownPopResult}
                        onClickSair={() => {
                            removeActive()
                            setShownPopResult(false)
                            history.push('/Flash-cards')
                            setIsflipped(!isFlipped)
                            handleCount()
                        }}
                        textConquista='Nome conquista'
                        textCorrect='0'
                        textExp='000'
                        textTotal='0'
                    >
                        <Redone style={mystyle} onClick={() => {
                            enableAlternatives()
                            removeActive()
                            setShownPopResult(false)
                            setIsflipped(false)
                            history.push('/AnswerAlternativa')
                        }} />
                    </CardStats>
                </IonContent>

            </IonPage>
        </>
    );

}
const Redone: React.FC<{ onClick: () => void; style: React.CSSProperties }> = props => {

    return (
        <>
            <IonButton color='light' onClick={props.onClick} style={props.style} className="ios btn_stats_refazer">
                Refazer
            </IonButton>
        </>
    );
}
export default AnswerAlternativa

