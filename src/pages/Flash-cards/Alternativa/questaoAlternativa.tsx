import React, { ChangeEvent, useEffect, useState } from 'react';
import {
    IonButton,
    IonPage,
    IonRow,
    IonFabButton,
    IonIcon,
    IonHeader,
    IonMenuButton,
    IonToolbar,
    IonLabel,
    IonContent, 
    IonItem, 
    IonInput, 
    IonCard, 
    IonCardContent,
    IonTextarea, 
    IonCardHeader, 
    IonToggle, 
    IonCol,  
    IonGrid, 
    IonPopover,  
    IonCardSubtitle, 
    IonCardTitle,
    IonModal, 
    IonText,
    useIonViewWillLeave,
    useIonViewWillEnter,
} from '@ionic/react'
import { add, arrowUndoSharp, timerOutline, remove } from 'ionicons/icons';
import './style.css'
import { menuController } from '@ionic/core';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { createFlashCard, Payload, Alternative, NewAlternative } from '../../../services/flashCard.service';
import { getPayload} from '../../../services/Authentication.service';
import Limitedalternativa from '../../../components/CardMessages/msg_limite_alternativa';
import TimeField from 'react-simple-timefield';



const QuestaoAlternativa: React.FC = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory()
    const [textTitle, setTextTitle] = useState<string>('')
    const [textMat, setTextMat] = useState<string>('')
    const [enunciated, setEnunciated] = useState<string>('')
    const [textAreaAlternative, setTextAreaAlternative] = useState<string>('')  
    const [checked, setChecked] = useState<boolean>(false);
    const [shownTimer, setShownTimer] = useState<boolean>(false);
    const [showPopover, setShowPopover] = useState<boolean>(false);
    const [showPopLimit, setShowPopLimit] = useState<boolean>(false);
    const [shownPopsave, setShownPopsave]= useState<boolean>(false);
    const [textPop, setTextPop] = useState<string>('')
    const [showModal, setShowModal] = useState(false)
    const [showModal2, setShowModal2] = useState(false)
    const [textRightAnswer, setTextRightAnswer] = useState<string>('')
    const [time, setTime] = useState<string>(':');
    const [timer, setTimer] = useState<{}>()
    const temas = {
        id: 0,
        textPop: ''
    }
    const [answer, setAnswer] = useState<string>('')
    const [themes, setThemes] = useState([temas]);
    const [alternatives, setAlternatives] = useState<NewAlternative[]>([]);
    const popOverSave = () => {
        setShownPopsave(true);
        setTimeout(() => {
            setShownPopsave(false);
            setShowPopover(false);
        }, 1000)
    }
    const onTimeChange = (time:string)=>{
        console.log(time)
        setTime(time)
    }
    const AddTema = () => {
        if (textPop !== '') {
            setThemes([...themes, {
                id: themes.length + 1,
                textPop: textPop
            }
            ])
        }
    }
    const AddAlternative = () => {
        setAlternatives([...alternatives, {answer:answer}])
        console.log(alternatives)
        if(alternatives.length == 4){
            setAlternatives(alternatives)
      
        }
        setAnswer('')
    }



    const DeleteAlternatives = (answer:string) => {
        let alternativeToBedeleted = alternatives.filter(alternative => alternative.answer !== answer);
        setAlternatives(alternativeToBedeleted)
        console.log(alternativeToBedeleted)
    }

    const DeleteTema = (id: number) => {
        const themeToBedeleted = themes.filter(theme => theme.id !== id);
        setThemes(themeToBedeleted)
    }
    useIonViewWillEnter(()=>{
        setThemes([])
        setAlternatives([])
    },[])
    useIonViewWillLeave(()=>{
        menuController.enable(true)
        CleanInputs()
        setChecked(false)      
    }, [])
    const CleanInputs = () => {
        setTextPop('')
        setTextAreaAlternative('')
        setEnunciated('')
        setTextRightAnswer('')
        setTextMat('')
        setTextTitle('')
        setAlternatives([])
        setThemes([])
        setTime('')
    }
    const convertTime = ()=>{
        const[minutes, seconds] = time.split(':').map(Number)
        const timeInSeconds = (minutes * 60) + seconds
        console.log(time)
        console.log(timeInSeconds * 1000)
        return timeInSeconds * 1000

    }
    const handleCreateButton = async ()=>{
        const payLoad = getPayload() as Payload
        let alternativesSend:NewAlternative[] = []
        let temasSend:string[] = []
        themes.map((a)=>{
            temasSend.push(a.textPop)
        })
        alternatives?.map((a)=>{
            alternativesSend.push({answer:a.answer})
        })
        alternativesSend.push({answer:textRightAnswer})
        if(enunciated !== '' && textRightAnswer !== '' && alternatives!.length > 0){
            try{
                await createFlashCard({
                    creator:payLoad.id,
                    enunciated:enunciated,
                    answerFlashCard:textRightAnswer,
                    subject:textMat,
                    alternatives:alternativesSend,
                    title:textTitle,
                    themes:temasSend,
                    time:convertTime()
                })
            }catch(err){
                console.log(err)
            }
            setShowModal(true)
        }else if(alternatives?.length == 0){
            setShowPopLimit(true)
        }

    }

    return (
        <>
            <IonPage>
                <IonHeader className='custom-header'>
                    <IonToolbar>
                        <IonRow className='row-label'>
                            <IonLabel className="label-menu-fixer-dissertativa">FIXER</IonLabel>
                        </IonRow>
                        <IonFabButton
                            onClick={() => {
                                history.push('/Flash-cards')
                                menuController.enable(true);
                                setThemes([])                              
                                setChecked(false)
                                setShownTimer(false)
                            }}
                            slot='start'
                            className="icon-fab-button light"

                            size="small"
                            color="light">
                            <IonIcon icon={arrowUndoSharp} />
                            <IonButton slot='start'>
                                <IonMenuButton></IonMenuButton>
                            </IonButton>
                        </IonFabButton>
                    </IonToolbar>
                </IonHeader>


                <IonContent>
                    <IonItem style={{ borderRadius: '6px' }} className="item-input-dissertativa">
                        <IonInput maxlength={100} value={textTitle} type="text" required className="input-dissertativa" onIonChange={e => setTextTitle(e.detail.value!)} placeholder="Insira o título do Flashcard"></IonInput>
                    </IonItem>

                    <IonCard className='card-dissertativa' color='light'>
                        <IonCardHeader style={{ padding: 0 }}>
                            <IonRow className='ios ion-justify-content-space-between row-header'>
                                <IonButton onClick={() => setShowPopover(true)} className="ios btn-tema-dissertativa">Tema</IonButton>
                                <IonPopover
                                    isOpen={showPopover}
                                    cssClass='temas-custom'
                                    onDidDismiss={e => setShowPopover(false)}
                                >
                                    <IonRow style={{ marginTop: '0.9rem' }} className='ion-justify-content-center'>
                                        <IonLabel style={{ fontWeight: 'bold', fontSize: '18px' }} color='dark'>Adicione um tema</IonLabel>
                                    </IonRow>
                                    <IonGrid className='back-temas'>
                                        <IonRow className='ion-justify-content-center'>
                                            <IonInput maxlength={100} className='ios add-temas' placeholder='Tema' color='dark' onIonChange={e => setTextPop(e.detail.value!)} value={textPop} type='text'></IonInput>
                                            <IonFabButton className='add-btn' onClick={() => {
                                                AddTema()
                                                setTextPop('')
                                            }} color='light'><IonIcon color='success' icon={add}></IonIcon></IonFabButton>
                                        </IonRow>
                                        {themes.map(theme => (
                                            <IonRow key={theme.id} style={{ cursor: 'default', marginTop: '1rem' }} className='ion-justify-content-center'>
                                                <IonCol key={theme.id} className='ios temas-inputs' color='dark'>{theme.textPop}</IonCol>
                                        <IonFabButton onClick={() => DeleteTema(theme.id)} className='remove-btn' color='light'><IonIcon color='danger' icon={remove}></IonIcon></IonFabButton>
                                            </IonRow>
                                        ))}
                                    </IonGrid>
                                    <IonRow style={{ marginTop: '-0.9rem' }} className='ion-justify-content-center row-btn'>
                                        <IonButton className='btn-save' color='light' onClick={() => popOverSave()}>Salvar</IonButton>
                                        <IonButton onClick={() => {
                                            setShowPopover(false)
                                            setThemes([])
                                            setTextPop('')
                                        }} color='light' className='btn-cancel'>Limpar</IonButton>
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
                                        <IonLabel style={{ fontWeight: 'bold', fontSize: '18px', lineHeight: '8rem' }} color='success'>Temas salvos!</IonLabel>
                                    </IonRow>
                                </IonPopover>

                                <IonInput maxlength={100} value={textMat} className="input-tema" placeholder="Insira a matéria" onIonChange={e => setTextMat(e.detail.value!)}></IonInput>
                            </IonRow>
                        </IonCardHeader>
                        <IonCardContent className="content-background">
                            <IonRow className="ios row-dissertativa">
                                <IonTextarea
                                    autoCapitalize='on'
                                    maxlength={240}
                                    overflow-scroll="true"
                                    rows={5}
                                    cols={20}
                                    required
                                    className='ios question'
                                    color='dark'
                                    onIonChange={e => {
                                        setEnunciated(e.detail.value!)
                                    }}
                                    value={enunciated}
                                    placeholder="Digite ou cole o enunciado do flash-card">
                                </IonTextarea>
                            </IonRow>
                        </IonCardContent>
                        <IonRow className='row-footer' color='light'></IonRow>
                    </IonCard >

                    <IonModal backdropDismiss={false} isOpen={showModal} cssClass='modal-criar'>
                        <IonCardTitle className="div-modal-alternativa">
                            <IonText className="modal-text" color="dark">
                                <IonLabel>Deseja criar mais um flashcard ?</IonLabel>
                            </IonText>
                            <IonCardSubtitle className="header-btn">
                                <IonButton color='light' className="btn-sim" onClick={() => {
                                    setShowModal2(true)
                                    }}>Sim</IonButton>
                                <IonButton color='light' className="btn-nao" onClick={() => {
                                    setShowModal(false)
                                    history.push('Flash-cards')
                                    menuController.enable(true)
                                    }}>Não</IonButton>
                            </IonCardSubtitle>
                        </IonCardTitle>
                    </IonModal>


                    <IonModal backdropDismiss={false} isOpen={showModal2} cssClass='modal-choose'>
                        <IonButton color='light' className="btn-dissertativa" onClick={() => {
                            setShowModal2(false)
                            setShowModal(false) 
                            CleanInputs()                        
                            history.push('/questaoDissertativa')                        
                            }}>Dissertativa</IonButton>
                        <IonLabel className="label-modal">ou</IonLabel>
                        <IonButton color='light' className="btn-alternativa" onClick={() => {
                            setShowModal2(false)
                            setShowModal(false)   
                            CleanInputs()
                            history.push('/questaoAlternativa')
                            }}>Alternativa</IonButton>
                    </IonModal>


                    <IonGrid className='array-div'>
                    <IonRow style={{marginBottom:'1rem'}} className='ion-justify-content-center'>
                                <IonTextarea 
                                maxlength={240}
                                autoGrow={textRightAnswer == '' && false || true} 
                                style={{height: textRightAnswer == '' && '4rem' || 'auto'}} 
                                className='ios alternativa-correta' 
                                placeholder='Insira a alternativa correta' 
                                color='dark' 
                                onIonChange={e => {
                                    setTextRightAnswer(e.detail.value!)
                                }} 
                                value={textRightAnswer}
                                >    
                                </IonTextarea>
                    </IonRow>
                        <IonRow  className='ion-justify-content-center'>
                                <IonTextarea autoGrow={true} className='ios add-alternativas'  placeholder='Insira a/as alternativas' color='dark'  onIonChange={e => setAnswer(e.detail.value!)} value={answer}></IonTextarea>
                                <IonFabButton id='add-alternative' className='add-btn'  onClick={()=> {            
                                    AddAlternative()                                 
                                    }} color='light'><IonIcon color='success' icon={add}></IonIcon></IonFabButton>
                        </IonRow>                       
                            {alternatives.map((alternative:Alternative, index)=>(
                                <IonRow key={index} style={{cursor:'default', marginTop:'1rem'}}  className='ion-justify-content-center colunas'>
                                    <IonCol style={{height:'auto', width:'10rem'}} key={index} className='alternativas' color='dark' placeholder='alternativas'>{alternative.answer}</IonCol>
                                    <IonFabButton  onClick={()=>DeleteAlternatives(alternative.answer)} className='remove-btn'  color='light'><IonIcon color='danger' icon={remove}></IonIcon></IonFabButton>
                                </IonRow>
                            ))}                       
                    </IonGrid>
                       
                    <IonRow className='row-toggle'>                                            
                        <IonLabel color='dark' className='label-timer' >Tempo</IonLabel>                        
                        <IonToggle checked={checked} onIonChange={(e)=>setChecked(e.detail.checked)} className='ios toggle' onClick={()=>{
                            setShownTimer(!shownTimer)
                            setTime('')
                            }}/>                   
                    </IonRow>
                    <IonRow className='ios row-timer-alternativa'>
                        {shownTimer && <Timer value={time} onChange={(event)=> setTime(event.target.value!)}/>}
                    </IonRow>
                    <Limitedalternativa 
                    onClick={()=> setShowPopLimit(false)} 
                    isOpen={showPopLimit} 
                    onDidDismiss={()=>setShowPopLimit(false)} />
                    <IonRow style={{ marginTop: '1.7rem' }} className='ios ion-justify-content-center'>
                        <IonButton id='create-button' className="ios btn-criar" onClick={() => {
                            handleCreateButton()
                            }} >Criar</IonButton>
                    </IonRow>
                </IonContent>

            </IonPage>
        </>
    );

}

export const StyledTimer = styled(IonCol)`
    display:flex;
    flex-direction:row;
    width:auto;
    height:2rem;
    align-items: center;
    position:absolute;
`;
const Timer: React.FC<{value:string; onChange:(event: ChangeEvent<HTMLInputElement>)=>void}> = props => {

    return (
        <>
            <StyledTimer >
                <IonIcon className='icon-styled' icon={timerOutline} />
                    <TimeField colon=':' value={props.value} onChange={props.onChange}  input={<input className='input-time'></input>} ></TimeField> 
            </StyledTimer>
        </>
    );
}


export default QuestaoAlternativa;