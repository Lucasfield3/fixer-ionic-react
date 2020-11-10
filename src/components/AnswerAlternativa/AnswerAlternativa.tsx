import React, { useState } from 'react';
import {
    IonButton,
    IonPage,
    IonRow,
    IonFabButton,
    IonHeader,
    IonLabel,
    IonContent, IonCard, IonCardContent, IonTextarea, IonCardHeader, IonCol,  IonGrid, IonPopover, IonProgressBar, IonToolbar, IonIcon, useIonViewWillEnter, useIonViewWillLeave
} from '@ionic/react'
import './styles.css'
import { arrowForward } from 'ionicons/icons';
import ReactCardFlip from 'react-card-flip';
import SairTelaResposta from '../CardMessages/msg_sair_tela_resposta';
import { useHistory } from 'react-router';
import CardStats from '../Card_stats_result/cardStats';
import { Alternative, Checker, FlashCard, getCheck } from '../../services/flashCard.service';
import CardRed from '../cardRed/cardRed';
import CardGreen from '../CardGreen/cardGreen';



const AnswerAlternativa: React.FC = () => {

    const history = useHistory()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [textTitle, setTextTitle] = useState<string>('')
    const [textMat, setTextMat] = useState<string>('')
    const [textAreaQuestion, setTextAreaQuestion] = useState<string>('')
    //const [textAreaAnswer, setTextAreaAnswer] = useState<string>('')
    //const [shownTimer, setShownTimer] = useState<boolean>(false);
    const [showPopover, setShowPopover] = useState<boolean>(false);
    const [shownPopsave, setShownPopsave] = useState<boolean>(false);
    const [shownPopsair, setShownPopsair] = useState<boolean>(false);
    const [shownPopResult, setShownPopResult] = useState<boolean>(false);
    const [shownIcon, setShownIcon] = useState(false)
    

    //const [textRightAnswer, setTextRightAnswer] = useState<string>('')
    //const [textAreaAlternative, setTextAreaAlternative] = useState<string>('')
    const [isFlipped, setIsflipped] = useState(false);
    const [alternatives, setAlternatives] = useState<Alternative[]>()
    const [idFlashCard, setIdFlashCard] = useState<string>('')
    const [check, setCheck] = useState<Checker>({
        answer:'resposta-certa',
        correct:false
    })
    const [activeAlternative, setActiveAlternative] = useState<Alternative>({
        id:'123',
        answer:'alternativa-ativada'
    })
    const [className, setClassName] = useState({
        id:-1,
        active:false,
    })
    const letras = ['a', 'b', 'c', 'd', 'e']
    //const [letra, setLetra] = useState([letras])
    const [themes, setThemes] = useState<string[]>([]);
    const[cardGreen, setCardGreen] = useState()
    const[cardRed, setCardRed] = useState(<CardRed/>)
    const [redone, setRedone] = useState<{}>()
    const popOverSave = () => {
        setShownPopsave(true);
        setTimeout(() => {
            setShownPopsave(false);
            setShowPopover(false);
        }, 1000)
    }

    useIonViewWillEnter(() => {
        setClassName({
            id:-1,
            active:false
        })
        setIsflipped(false)
        if(history.location.state){
            const card = history.location.state as FlashCard
            console.log(card) 
            setTextMat(card.subject)
            setThemes(card.themes)
            setTextAreaQuestion(card.enunciated)
            setAlternatives(card.alternatives)
            setIdFlashCard(card.id)
        }else {
            console.log('Não tem nada');
          }
    }, [])
    const removeActive = ()=>{
        setClassName({
            id:-1,
            active:false
        })
    }
    useIonViewWillLeave(()=>{
       
    },[])

    const handleSelectAlternative = (alternative:Alternative, index:number)=>{ 
        alternatives?.forEach(()=>{
            setClassName({
                id:index,
                active:!className.active
            })   
        })
        setShownIcon(true)
        setActiveAlternative(alternative)
        
    }
    const handleFlipAnswer = async ()=>{
        const btnFinal = document.querySelector('.btn-final') as HTMLIonButtonElement 
        let checker = await getCheck(idFlashCard, activeAlternative.answer)
        console.log(checker)  
        setCheck(checker)
            btnFinal.removeAttribute("disabled")
            disableAlternatives()    
           

    }
   
     const disableAlternatives = ()=>{
        const eventAlternativas = document.querySelector('.array-div') as HTMLIonGridElement
        eventAlternativas.style.pointerEvents = 'none'      
     }
     const enableAlternatives = ()=>{
        const eventAlternativas = document.querySelector('.array-div') as HTMLIonGridElement
        eventAlternativas.style.pointerEvents = 'auto'      
     }
     const mystyle = {
        display:check!.correct && 'none' || 'block'
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
                            <IonProgressBar className='progress-bar' value={0.5}></IonProgressBar>
                            <IonLabel className="start-lvl">1</IonLabel>
                        </IonRow>
                    </IonRow>
                </IonHeader>


                <IonContent>
                    <SairTelaResposta 
                    isOpen={shownPopsair} 
                    onClickSim={()=> {
                        setShownPopsair(false)
                        history.push('/Flash-cards')
                        removeActive()
                        enableAlternatives()
                    }}
                    onClickNao={()=> setShownPopsair(false)}
                    onDidDismiss={()=> setShownPopsair(false)}

                    />                  
                        <IonCol  className='timer-flashcard' color='dark'>00:00</IonCol>
                    <ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal' flipSpeedBackToFront={1.1} flipSpeedFrontToBack={1.1}>
                        <IonCard className='card-dissertativa' color='light'>
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
                                            {themes.map((theme:string, index)=> (
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

                                    <IonCol  className="titulo" >{textMat}</IonCol>
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
                                <IonIcon style={{display:className.active && 'block' || 'none'}} onClick={()=> {
                                    setIsflipped(!isFlipped)
                                    handleFlipAnswer()
                                    }} className='ios arrow-foward' color='primary' src={arrowForward}></IonIcon>
                            </IonRow>
                        </IonCard >
                        {check!.correct && <CardGreen textRightAnswer={check.answer}/> || cardRed}

                    </ReactCardFlip>


                    <IonGrid key={alternatives?.length} style={{pointerEvent:isFlipped && 'none' || 'auto'}} className='array-div'>           
                            {alternatives?.map((alternative:Alternative, i)=>(
                                <IonRow key={i + 1} style={{cursor:'default', marginTop:'1rem'}}  className='ion-justify-content-center colunas'>
                                    <IonCol  key={i}  onClick={()=>handleSelectAlternative(alternative ,i)}  size='1' className={(i === className.id  && className.active) && 'active-letras' || 'letras-alternativas'}> {letras[i]}</IonCol>
                                    <IonCol onClick={()=>handleSelectAlternative(alternative  ,i)}  
                                    style={{height:'auto', width:'10rem'}}  
                                    key={alternative.id} 
                                    className={(i === className.id  && className.active) && 'active' || 'alternativas-respostas'} 
                                    color='dark'>{alternative.answer}</IonCol>
                                </IonRow>
                            ))}                       
                    </IonGrid>
                    <IonRow className='ios ion-justify-content-center row-btn-final'>
                        <IonButton disabled onClick={()=>{
                            setShownPopResult(true)
                            enableAlternatives()
                            }} className='ios btn-final' color='light' size='default' >Finalizar</IonButton>
                    </IonRow>
                   <CardStats                
                    backdropDismiss={false}
                    isOpen={shownPopResult}
                    onClickSair={()=>{
                        removeActive()
                        setShownPopResult(false)
                        history.push('/Flash-cards')
                        setIsflipped(!isFlipped)
                    }}
                    textConquista='Nome conquista'
                    textCorrect='0'
                    textExp='000'
                    textTotal='0'
                   >
                       <Redone style={mystyle} onClick={()=>{
                           enableAlternatives()
                            removeActive()
                            setShownPopResult(false)
                            setIsflipped(false)
                            history.push('/AnswerAlternativa')
                        }}/>
                   </CardStats>
                </IonContent>

            </IonPage>
        </>
    );

}
const Redone:React.FC<{onClick:()=>void;style:React.CSSProperties}> = props =>{

    return(
        <>
        <IonButton color='light'onClick={props.onClick} style={props.style} className="ios btn_stats_refazer">
            Refazer
        </IonButton>
        </>
    );
  }
 export default AnswerAlternativa

