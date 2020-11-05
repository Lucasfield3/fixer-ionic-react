import React, { useEffect, useState } from 'react';
import {
    IonButton,
    IonPage,
    IonRow,
    IonFabButton,
    IonHeader,
    IonLabel,
    IonContent, IonCard, IonCardContent, IonTextarea, IonCardHeader, IonCol,  IonGrid, IonPopover, IonProgressBar, IonToolbar, IonIcon
} from '@ionic/react'
import './styles.css'
import backAnswer from '../../Assets/images/back.svg';
import nextAnswer from '../../Assets/images/next.svg';
import { arrowForward } from 'ionicons/icons';
import ReactCardFlip from 'react-card-flip';
import CardGreen from '../CardGreen/cardGreen';
import SairTelaResposta from '../CardMessages/msg_sair_tela_resposta';
import { useHistory } from 'react-router';



const AnswerAlternativa: React.FC = () => {

    const history = useHistory()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    //const history = useHistory()
    //onst [textTitle, setTextTitle] = useState<string>('')
    //const [textMat, setTextMat] = useState<string>('')
    //const [textAreaQuestion, setTextAreaQuestion] = useState<string>('')
    //const [textAreaAnswer, setTextAreaAnswer] = useState<string>('')
    //const [shownTimer, setShownTimer] = useState<boolean>(false);
    const [showPopover, setShowPopover] = useState<boolean>(false);
    const [shownPopsave, setShownPopsave] = useState<boolean>(false);
    const [shownPopsair, setShownPopsair] = useState<boolean>(false);
    const [textPop, setTextPop] = useState<string>('')
    //const [textRightAnswer, setTextRightAnswer] = useState<string>('')
    //const [textAreaAlternative, setTextAreaAlternative] = useState<string>('')
    const [isFlipped, setIsflipped] = useState(false);
    const [isActive, setActive] = useState(false);
    const [className, setClassName] = useState({
        id:-1,
        active:false
    })
    const answer =
    {
        id: 0,
        textAreaAlternative: ''
    }
    const temas = {
        id: -1,
        textPop: ''
    }
    const letras = ['a', 'b', 'c', 'd', 'e']
    //const [letra, setLetra] = useState([letras])
    const [items, setItems] = useState([temas]);
    const [alternatives, setAlternatives] = useState([answer]);
    const popOverSave = () => {
        setShownPopsave(true);
        setTimeout(() => {
            setShownPopsave(false);
            setShowPopover(false);
        }, 1000)
    }
    const AddTema = () => {

        if (textPop !== '') {
            setItems([...items, {
                id: items.length,
                textPop: textPop
            }
            ])
        }
    }

    useEffect(() => {

        setAlternatives([...alternatives, {
            id:1,
            textAreaAlternative:'alternativas'
        }])

    }, [])

    const handleSelectAlternative = (alternative:number)=>{  
        alternatives.forEach(()=>{
            setClassName({
                id:alternative,
                active:!className.active
            })   
        })
      
    }

    return (
        <>
            <IonPage>
                <IonHeader className='custom-header'>
                <IonToolbar>
                    <IonFabButton onClick={()=>setShownPopsair(true)} className='btnSair-answer' color='light' slot='end' size='small'>
                        Sair
                    </IonFabButton>
                </IonToolbar>
                    <IonRow className='row-level-progress'>
                        <IonRow className='ion-justify-content-center'>
                            <IonLabel className="label-lvl">LV</IonLabel>
                        </IonRow>
                        <IonRow style={{height:'1rem'}} className='ion-justify-content-center row-progress'>                       
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
                    }}
                    onClickNao={()=> setShownPopsair(false)} 
                    onDidDismiss={()=> setShownPopsair(false)}

                    />
                    <IonRow className='row-timer-alternativa'>
                        <IonCol  className='timer-flashcard' color='dark'>00:00</IonCol>
                    </IonRow>
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
                                            <IonRow className='ion-justify-content-center'>
                                                <IonCol  className='ios temas-inputs' color='dark'>Engenharia</IonCol>
                                            </IonRow>
                                            {items.map(item => (
                                                <IonRow key={item.id} style={{ cursor: 'default', marginTop: '1rem' }} className='ion-justify-content-center'>
                                                    <IonCol key={item.id} className='ios temas-inputs' placeholder='Temas' color='dark'>{item.textPop}</IonCol>                                               
                                                </IonRow>
                                            ))}
                                        </IonGrid>
                                        <IonRow style={{ marginTop: '-0.9rem' }} className='ion-justify-content-center row-btn'>
                                            <IonButton onClick={() => {
                                                setShowPopover(false)
                                                setTextPop('')
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

                                    <IonCol  className="titulo" >Título do Flashcard</IonCol>
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
                                    </IonTextarea>
                                </IonRow>
                            </IonCardContent>
                            <IonRow className='row-footer' color='light'></IonRow>
                            <IonRow className='ios ion-justify-content-center'>
                                <IonIcon style={{display:className.active && 'block' || 'none'}} onClick={()=> setIsflipped(!isFlipped)} className='ios arrow-foward' color='primary' src={arrowForward}></IonIcon>
                            </IonRow>
                        </IonCard >
                        <CardGreen onClick={()=>setIsflipped(!isFlipped)}/>
                    </ReactCardFlip>


                    <IonGrid className='array-div'>           
                            {alternatives.map((alternative, i)=>(
                                <IonRow key={i} style={{cursor:'default', marginTop:'1rem'}}  className='ion-justify-content-center colunas'>
                                    <IonCol onClick={()=>handleSelectAlternative(i)}  size='1' className={(i === className.id  && className.active) && 'active-letras' || 'letras-alternativas'}> {letras[i]}</IonCol>
                                    <IonCol  onMouseDown={()=>handleSelectAlternative(alternative.id)}  
                                    style={{height:'auto', width:'10rem'}}  
                                    key={alternative.id} 
                                    className={(alternative.id === className.id  && className.active) && 'active' || 'alternativas-respostas'} 
                                    color='dark'>Alternativas</IonCol>
                                </IonRow>
                            ))}                       
                    </IonGrid>
                    <IonRow className='ios ion-justify-content-center row-btn-final'>
                        <IonButton className='ios btn-final' color='light' size='default' >Finalizar</IonButton>
                    </IonRow>
                   
                </IonContent>

            </IonPage>
        </>
    );

}
 export default AnswerAlternativa

//  <IonRow style={{ marginTop: '1.7rem' }} className='ios ion-justify-content-center'>
//  <a href="#" className="ios back-answer">
//      <img className="href-back" src={backAnswer} alt="back" />
//  </a>
//  <IonCard className="ios bar-result-answers" color="light">
//      <IonLabel id="answer-certas-alternativa">Certas: 0 </IonLabel>
//      <IonLabel id="answer-total-alternativa">Total: 0 </IonLabel>
//      <IonLabel id="answer-erradas-alternativa">Erradas: 0 </IonLabel>
//  </IonCard>

//  <a href="#" className="ios back-answer">
//      <img className="href-next" src={nextAnswer} alt="next" />
//  </a>
//</IonRow>