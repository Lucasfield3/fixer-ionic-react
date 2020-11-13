import React, { useState } from 'react';
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
    useIonViewWillLeave,
    IonCardSubtitle,
    IonCardTitle,
    IonModal,
    IonText,
    useIonViewWillEnter
} from '@ionic/react'
import { add,  arrowUndoSharp, timerOutline, remove } from 'ionicons/icons';
import './style.css'
import { menuController } from '@ionic/core';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { getPayload } from '../../../services/Authentication.service';
import { Payload,  createFlashCard } from '../../../services/flashCard.service';




const EditDissertativa: React.FC = () => {


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory()
    const [textTitle, setTextTitle] = useState<string>('')
    const [textMat, setTextMat] = useState<string>('')
    const [enunciated, setEnunciated] = useState<string>('')
    const [textRightAnswer, setTextRightAnswer] = useState<string>('')
    const [timer, setTimer] = useState<{}>(<Timer/>)
    const [checked, setChecked] = useState<boolean>(false);
    const [shownTimer, setShownTimer] = useState<boolean>(false);
    const [showPopover, setShowPopover] = useState<boolean>(false);
    const [shownPopsave, setShownPopsave]= useState<boolean>(false);
    const [showModal, setShowModal] = useState(false)
    const [showModal2, setShowModal2] = useState(false)
    const [textPop, setTextPop] = useState<string>('')
    
    const temas = {
        id: -1,
        textPop: ''
    }
    const [items, setItems] = useState([temas]);
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
    const DeleteTema = (id: number) => {
        const itemToBedeleted = items.filter(item => item.id !== id);
        setItems(itemToBedeleted)
    }

    useIonViewWillEnter(() => {

        setItems([])

    }, [])
    const CleanInputs = ()=>{
        setTextPop('')
        setTextRightAnswer('')
        setEnunciated('')
        setTextMat('')
        setTextTitle('')
    }
    useIonViewWillLeave(()=>{
        CleanInputs()
        menuController.enable(true)
    }, [])
    const handleCreateButton = async ()=>{     
        const payLoad = getPayload() as Payload
        let temasSend:string[] = []
        items.map((a)=>{
            temasSend.push(a.textPop)
        })
        if(enunciated !== '' && textRightAnswer !== ''){
            try{
                await createFlashCard({
                    creator:payLoad.id,
                    enunciated:enunciated,
                    answerFlashCard:textRightAnswer,
                    subject:textMat,
                    alternatives:[],
                    title:textTitle,
                    themes:temasSend
                })
            }catch(err){
                console.log(err)
            }
           
            setShowModal(true)
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
                                setItems([])
                                CleanInputs()
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
                    <IonItem style={{borderRadius:'6px'}} className="item-input-dissertativa">
                        <IonInput  value={textTitle} type="text" required className="input-dissertativa"  onIonChange={e => setTextTitle(e.detail.value!)} placeholder="Insira o título do Flashcard"></IonInput>
                    </IonItem>

                    <IonCard className='card-dissertativa' color='light'>
                        <IonCardHeader style={{ padding: 0 }}>
                            <IonRow className='ios ion-justify-content-space-between row-header'>
                                <IonButton onClick={() => setShowPopover(true)} className="ios btn-tema-dissertativa">Tema</IonButton>
                                <IonPopover
                                    isOpen={showPopover}
                                    cssClass='my-custom-class temas-custom'
                                    onDidDismiss={e => setShowPopover(false)}
                                >
                                    <IonRow style={{ marginTop: '0.9rem' }} className='ion-justify-content-center'>
                                        <IonLabel style={{ fontWeight: 'bold', fontSize: '18px' }} color='dark'>Adicione um tema</IonLabel>
                                    </IonRow>
                                    <IonGrid className='back-temas'>
                                        <IonRow className='ion-justify-content-center'>
                                            <IonInput className='ios add-temas' placeholder='Tema' color='dark' onIonChange={e => setTextPop(e.detail.value!)} value={textPop} type='text'></IonInput>
                                            <IonFabButton className='add-btn' onClick={() => {
                                                AddTema()
                                                setTextPop('')
                                            }} color='light'><IonIcon color='success' icon={add}></IonIcon></IonFabButton>
                                        </IonRow>
                                        {items.map(item => (
                                            <IonRow key={item.id} style={{ cursor: 'default', marginTop: '1rem' }} className='ion-justify-content-center'>
                                                <IonCol key={item.id} className='ios temas-inputs' color='dark'>{item.textPop}</IonCol>
                                                <IonFabButton onClick={() => DeleteTema(item.id)} className='remove-btn' color='light'><IonIcon color='danger' icon={remove}></IonIcon></IonFabButton>
                                            </IonRow>
                                        ))}
                                    </IonGrid>
                                    <IonRow style={{ marginTop: '-0.9rem' }} className='ion-justify-content-center row-btn'>
                                        <IonButton className='btn-save' color='light' onClick={() => popOverSave()}>Salvar</IonButton>
                                        <IonButton onClick={() => {
                                            setShowPopover(false)
                                            setItems([])
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

                                <IonInput value={textMat} className="input-tema" placeholder="Insira a matéria" onIonChange={e => setTextMat(e.detail.value!)}>{textMat}</IonInput>
                            </IonRow>
                        </IonCardHeader>
                        <IonCardContent className="content-background">
                            <IonRow className="ios row-dissertativa">
                                <IonTextarea
                                    maxlength={240}
                                    overflow-scroll="true"
                                    rows={5}
                                    cols={20}
                                    required
                                    className='ios question'
                                    color='dark'
                                    onIonChange={e => setEnunciated(e.detail.value!)}
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

                    <IonCard className='card-dissertativa-secundary' color='light'>
                        <IonCardHeader style={{ padding: 0 }}>
                            <IonRow color='light' className='row-header-resposta'></IonRow>
                        </IonCardHeader>
                        <IonCardContent style={{ height: '9rem' }} className="content-background">
                            <IonRow className="ios row-dissertativa">
                                <IonTextarea
                                    maxlength={240}
                                    overflow-scroll="true"
                                    className='ios answer'
                                    required
                                    value={textRightAnswer}
                                    rows={4}
                                    cols={20}
                                    color='dark'
                                    onIonChange={e => setTextRightAnswer(e.detail.value!)}
                                    placeholder="Digite ou cole a resposta">
                                </IonTextarea>
                            </IonRow>
                        </IonCardContent>
                        <IonRow color='light' className='row-footer-resposta'></IonRow>
                    </IonCard >

                    <IonRow className='row-toggle'>
                        <IonLabel color='dark' className='label-timer' >Tempo</IonLabel>
                        <IonToggle checked={checked} onIonChange={(e) => setChecked(e.detail.checked)} className='ios toggle' onClick={() => setShownTimer(!shownTimer)} />
                        <IonLabel className='tooltip-text'>Opcional</IonLabel>
                    </IonRow>
                    <IonRow className='ios row-timer-dissertativa'>
                        {shownTimer && timer}
                    </IonRow>
                
                    <IonRow style={{ marginTop: '1.7rem' }} className='ios ion-justify-content-center'>
                        <IonButton onClick={()=> handleCreateButton()} className="ios btn-criar">Criar</IonButton>
                    </IonRow>
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

export default EditDissertativa;


