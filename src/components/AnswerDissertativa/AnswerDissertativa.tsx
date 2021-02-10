import React, {useState, useRef} from 'react';
import {
    IonButton,
    IonPage,
    IonRow,
    IonFabButton,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonLabel,
    IonContent, 
    IonInput, 
    IonCard, 
    IonCardContent,
    IonTextarea, 
    IonCardHeader, 
    IonCol, 
    IonGrid, 
    IonPopover, 
    IonProgressBar, 
    useIonViewWillLeave, 
    useIonViewWillEnter, 
    IonLoading
} from '@ionic/react'
import { timerOutline, arrowForward } from 'ionicons/icons';
import './styles.css'
import { menuController } from '@ionic/core';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import CardStats from '../Card_stats_result/cardStats';
import ReactCardFlip from 'react-card-flip';
import CardGreen from '../CardGreen/cardGreen';
import SairTelaResposta from '../CardMessages/msg_sair_tela_resposta';
import { Checker, FlashCard, getCheck } from '../../services/flashCard.service';
import CardRed from '../cardRed/cardRed';
import { AreaFlip, HeaderAnswerDefault } from '../../pages/styles/Page-default/Page-default-styled';




const AnswerDissertativa: React.FC = () => {


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory()
    const [textMat, setTextMat] = useState<string>('')
    const [textAreaQuestion, setTextAreaQuestion] = useState<string>('')
    const [textAreaAnswer, setTextAreaAnswer] = useState<string>('')
    const [showPopover, setShowPopover] = useState<boolean>(false);
    const [shownPopsair, setShownPopsair] = useState<boolean>(false);
    const [shownPopsave, setShownPopsave] = useState<boolean>(false);
    const [textPop, setTextPop] = useState<string>('')
    const [shownPopResult, setShownPopResult] = useState<boolean>(false);
    const [isFlipped, setIsflipped] = useState(false);
    const [showLoading, setShowLoading] = useState(true);
    const [shownIcon, setShownIcon] = useState(false)
    const [idFlashCard, setIdFlashCard] = useState<string>('')
    const [cardRed, setCardRed] = useState(<CardRed />)
    const [themes, setThemes] = useState<string[]>([]);
    const [title, setTitle] = useState('')
    const [check, setCheck] = useState<Checker>({
        answer: 'resposta-certa',
        correct: false
    })
    const [buttonFinal, setButtoFinal] = useState<{}>()
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
            setTextMat(card.subject)
            setThemes(card.themes)
            setTextAreaQuestion(card.enunciated)
            setIdFlashCard(card.id)
            setTitle(card.title)
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
    const [cards, setCards] = useState<{}>()
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
            setTextAreaAnswer('')
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
    return (
        <>
            <IonPage>

            <HeaderAnswerDefault onClickPopSair={()=>setShownPopsair(true)} valueprogressBar={progress} title={title}/>

                <IonContent>
                <SairTelaResposta
                        isOpen={shownPopsair}
                        onClickSim={() => {
                            setShownPopsair(false)
                            history.push('/Flash-cards')                        
                            enableAnswer()
                            setTextAreaAnswer('')
                        }}
                        onClickNao={() => setShownPopsair(false)}
                        onDidDismiss={() => setShownPopsair(false)}

                    />
              <AreaFlip
                   isFlipped={isFlipped}
                   onClickPopTheme={() => setShowPopover(true)}
                   isOpen={showPopover}
                   onDidDismissPopTheme={e => setShowPopover(false)}
                   onClickClosePop={()=> setShowPopover(false)}
                   textMat={textMat}
                   textAreaQuestion={textAreaQuestion}
                   style={{ display: shownIcon && 'block' || 'none', opacity: showLoading == true && 0 }}
                   onClickArrowFlip={() => {
                    setShowLoading(true)
                    handleFlipAnswer()
                    settingLoading()
                    disableAnswer()
                    setShownButton(!shownButton)
                }}
                    isOpenLoadig={showLoading}
                   >
                    {themes.map((theme: string, index) => (
                        <IonRow key={index} style={{ cursor: 'default', marginTop: '1rem' }} className='ion-justify-content-center'>
                            <IonCol key={index} className='ios temas-inputs' placeholder='Temas' color='dark'>{theme}</IonCol>
                        </IonRow>
                    ))}
                    {check!.correct && <CardGreen textRightAnswer={check.answer} /> || cardRed}
                   </AreaFlip>


                    <IonCard className='card-dissertativa-secundary' color='light'>
                        <IonCardHeader style={{ padding: 0 }}>
                            <IonRow color='light' className='row-header-resposta'></IonRow>
                        </IonCardHeader>
                        <IonCardContent style={{ height: '9rem' }} className="content-background">
                            <IonRow className="ios row-enunciated">
                                <IonTextarea
                                    overflow-scroll="true"
                                    className='ios answer'
                                    required
                                    value={textAreaAnswer}
                                    rows={4}
                                    cols={20}
                                    color='dark'
                                    onIonChange={event => changeText(event)}
                                    placeholder="Digite ou cole a resposta">
                                </IonTextarea>
                            </IonRow>
                        </IonCardContent>
                        <IonRow color='light' className='row-footer-resposta'></IonRow>
                    </IonCard >
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
                            setTextAreaAnswer('')
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
                            history.push('/AnswerDissertativa')
                        }} />

                    </CardStats>
  
                </IonContent>

            </IonPage>
        </>
    );

}

const StyledTimer = styled(IonCol)`
    display:flex;
    flex-direction:row;
    width:auto;
    height:2rem;
    align-items: center;
    position:absolute;
`;
const Timertext = styled(IonInput)`
    text-align:center;
    color:var(--ion-color-dark);
    border-radius:16px;
    background:var(--ion-color-light);
    font-weight:bold;
    width: 3rem;
    height: -webkit-fill-available;
    --padding-start: 3px;
    --padding-end: 3px;
`;
const Timer: React.FC = () => {

    return (
        <>
            <StyledTimer>
                <IonIcon className='icon-styled' icon={timerOutline} />
                <Timertext placeholder='00:00'></Timertext>
            </StyledTimer>
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
export default AnswerDissertativa;
/**   <IonRow style={{ marginTop: '1.7rem' }} className='ios ion-justify-content-center'>
                        <a href="#" className="ios back-answer">
                            <img className="href-back" src={backAnswer} alt="back" />
                        </a>
                        <IonCard className="ios bar-result-answers" color="light">
                            <IonLabel id="answer-certas-dissertativa">Certas: 0 </IonLabel>
                            <IonLabel id="answer-total-dissertativa">Total: 0 </IonLabel>
                            <IonLabel id="answer-erradas-dissertativa">Erradas: 0 </IonLabel>
                        </IonCard>

                        <a href="#" className="ios back-answer">
                            <img className="href-next" src={nextAnswer} alt="next" />
                        </a>
                    </IonRow> */