import React, { useEffect, useState } from 'react';
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
    IonContent, IonItem, IonInput, IonCard, IonCardContent, IonTextarea, IonCardHeader, IonToggle, IonCol, IonImg, IonGrid, IonPopover, IonButtons, IonTitle, IonCardSubtitle, IonCardTitle, IonModal, IonText
} from '@ionic/react'
import { add, arrowUndoSharp, timerOutline, remove } from 'ionicons/icons';
import './style.css'
import { menuController } from '@ionic/core';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { stringify } from 'querystring';


const QuestaoAlternativa: React.FC = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory()
    const [textTitle, setTextTitle] = useState<string>('')
    const [textMat, setTextMat] = useState<string>('')
    const [textAreaQuestion, setTextAreaQuestion] = useState<string>('')
    const [textAreaAlternative, setTextAreaAlternative] = useState<string>('')
    const [timer, setTimer] = useState<{}>(<Timer />)
    const [checked, setChecked] = useState<boolean>(false);
    const [shownTimer, setShownTimer] = useState<boolean>(false);
    const [showPopover, setShowPopover] = useState<boolean>(false);
    const [shownPopsave, setShownPopsave]= useState<boolean>(false);
    const [textPop, setTextPop] = useState<string>('')
    const [showModal, setShowModal] = useState(false)
    const [showModal2, setShowModal2] = useState(false)
    const [textRightAnswer, setTextRightAnswer] = useState<string>('')

    

  
    const temas = {
        id: 0,
        textPop: ''
    }
    const answer =
    {
        id: 0,
        textAreaAlternative: ''
    }

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
                id: items.length + 1,
                textPop: textPop
            }
            ])
        }
    }
    const AddAlternative = () => {

        if (textAreaAlternative !== '') {
            setAlternatives([...alternatives, {
                id: alternatives.length + 1,
                textAreaAlternative: textAreaAlternative
            }
            ])
        }

        console.log(alternatives)
<<<<<<< HEAD

        if (alternatives.length == 5) {
=======
        
        if(alternatives.length == 4){
>>>>>>> 9b4ea2cfbbbfd56d8d0def67b87808b4e8cb32aa
            setAlternatives(alternatives)

        }


    }



    const DeleteAlternatives = (id: number) => {
        const alternativeToBedeleted = alternatives.filter(alternative => alternative.id !== id);
        setAlternatives(alternativeToBedeleted)


    }

    const DeleteTema = (id: number) => {
        const itemToBedeleted = items.filter(item => item.id !== id);
        setItems(itemToBedeleted)
    }

    useEffect(() => {

        setItems([])
        setAlternatives([])

    }, [])
<<<<<<< HEAD
    const ShowBtn = () => {
        if (alternatives.length > 0) {
            setBtnShow(<ButtonPop showPop={() => {
                setShowPopChoose(true)
            }}>{textBtn}</ButtonPop>)
        }
    }
=======

>>>>>>> 9b4ea2cfbbbfd56d8d0def67b87808b4e8cb32aa
    const CleanInputs = () => {
        setTextPop('')
        setTextAreaAlternative('')
        setTextAreaQuestion('')
        setTextMat('')
        setTextTitle('')
    }

<<<<<<< HEAD
    const PickRightAnswer = () => {
        const alternativas = Array.from(document.getElementsByClassName('alternativas-textarea') as HTMLCollectionOf<HTMLElement>)
        alternativas.length = alternatives.length
        alternativas.forEach(item => {
            item.addEventListener('click', () => {
                item.style.border = '1px #000 solid'
            }, true)
        });
        setShowPopChoose(false)
    }
    const DisableRemove = () => {
        const btnRemove = Array.from(document.getElementsByClassName('remove-btn') as HTMLCollectionOf<HTMLButtonElement>)
        btnRemove.forEach(button => {
            button.disabled = true
        })
    }
    const AbleRemove = () => {
        const btnRemove = Array.from(document.getElementsByClassName('remove-btn') as HTMLCollectionOf<HTMLButtonElement>)
        btnRemove.forEach(button => {
            button.disabled = false
        })
    }
    const AbleAdd = () => {
        const addAlternativas = document.getElementById('add-alternative') as HTMLButtonElement
        return addAlternativas.disabled == false
    }
    const DisableAdd = () => {
        const addAlternativas = document.getElementById('add-alternative') as HTMLButtonElement
        return addAlternativas.disabled == true
    }

=======
>>>>>>> 9b4ea2cfbbbfd56d8d0def67b87808b4e8cb32aa

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
                    <IonItem style={{ borderRadius: '6px' }} className="item-input-dissertativa">
                        <IonInput value={textTitle} type="text" required className="input-dissertativa" onIonChange={e => setTextTitle(e.detail.value!)} placeholder="Insira o título do Flashcard"></IonInput>
                    </IonItem>

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
                                            <IonRow style={{ cursor: 'default', marginTop: '1rem' }} className='ion-justify-content-center'>
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

                                <IonInput value={textMat} className="input-tema" placeholder="Insira a matéria" onIonChange={e => setTextMat(e.detail.value!)}></IonInput>
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
                                    color='dark'
                                    onIonChange={e => setTextAreaQuestion(e.detail.value!)}
                                    value={textAreaQuestion}
                                    placeholder="Digite ou cole o enunciado do flash-card">
                                </IonTextarea>
                            </IonRow>
                        </IonCardContent>
                        <IonRow className='row-footer' color='light'></IonRow>
                    </IonCard >

                    <IonModal isOpen={showModal} cssClass='my-custom-class'>
                        <IonCardTitle className="div-modal-alternativa">
                            <IonText className="modal-text" color="dark">
                                <h4>Deseja criar mais um flashcard ?</h4>
                            </IonText>
                            <IonCardSubtitle className="header-btn">
                                <IonButton className="btn-sim" onClick={() => setShowModal2(true)}>Sim</IonButton>
                                <IonButton className="btn-nao" onClick={() => setShowModal(false)}>Não</IonButton>
                            </IonCardSubtitle>
                        </IonCardTitle>
                    </IonModal>

                    <IonModal isOpen={showModal2} cssClass='my-custom-class'>
                        <IonButton className="btn-dissertativa" onClick={() => setShowModal2(true)}>Dissertativa</IonButton>
                        <IonLabel className="label-modal">ou</IonLabel>
                        <IonButton className="btn-alternativa" onClick={() => setShowModal2(true)}>Alternativa</IonButton>
                    </IonModal>


<<<<<<< HEAD
                    <IonGrid>
                        <IonRow className='ion-justify-content-center'>
                            <IonTextarea autoGrow={true} className='ios add-temas' placeholder='Insira as alternativas' color='dark' onIonChange={e => setTextAreaAlternative(e.detail.value!)} value={textAreaAlternative}></IonTextarea>
                            <IonFabButton id='add-alternative' className='add-btn' onClick={() => {
                                AddAlternative()
                                setTextAreaAlternative('')
                            }} color='light'><IonIcon color='success' icon={add}></IonIcon></IonFabButton>
                        </IonRow>
                        {alternatives.map((alternative, index) => (
                            <IonRow key={index} style={{ cursor: 'default', marginTop: '1rem' }} className='ion-justify-content-center'>
                                <IonCol style={{ height: 'auto', width: '10rem' }} key={alternative.id} onFocus={(e) => {
                                    e.currentTarget.style.border = '2px var(--ion-color-danger) solid'
                                }} className='ios alternativas-textarea' color='dark' placeholder='alternativas'>{alternative.textAreaAlternative}</IonCol>
                                <IonFabButton onClick={() => DeleteAlternatives(alternative.id)} className='remove-btn' color='light'><IonIcon color='danger' icon={remove}></IonIcon></IonFabButton>
                            </IonRow>
                        ))}
                    </IonGrid>
                    {alternatives.length > 1 && btnShow}
                    <PopRightAnswer isOpen={shownPopRight} ablePick={() => {
                        PickRightAnswer()
                        setShownPopRight(false)
                    }} hidePopover={() => setShownPopRight(false)} />
                    <PopChoose hidePopover={() => {
                        setShowPopChoose(false)
                    }}
                        isOpen={showPopChoose}
                        ablePick={() => {
                            setShownPopRight(true)
                            DisableRemove()
                            DisableAdd()
                            setBtnShow('')
                        }}
                        disablePick={() => {
                            setShowPopChoose(false)
                            AbleRemove()
                            AbleAdd()
                        }}
                    >
                    </PopChoose>
                    <IonRow className='row-toggle'>
                        <IonLabel color='dark' className='label-timer' >Tempo</IonLabel>
                        <IonToggle checked={checked} onIonChange={(e) => setChecked(e.detail.checked)} className='ios toggle' onClick={() => setShownTimer(!shownTimer)} />
                        <IonLabel className='tooltip-text'>Opcional</IonLabel>
=======
                    <IonGrid className='array-div'>
                    <IonRow style={{marginBottom:'1rem'}} className='ion-justify-content-center'>
                                <IonTextarea autoGrow={textRightAnswer == '' && false || true} style={{height: textRightAnswer == '' && '4rem' || 'auto'}} className='ios alternativa-correta' placeholder='Insira a alternativa correta' color='dark'  onIonChange={e => setTextRightAnswer(e.detail.value!)} value={textRightAnswer}></IonTextarea>
                    </IonRow>
                        <IonRow  className='ion-justify-content-center'>
                                <IonTextarea autoGrow={true} className='ios add-alternativas'  placeholder='Insira a/as alternativas' color='dark'  onIonChange={e => setTextAreaAlternative(e.detail.value!)} value={textAreaAlternative}></IonTextarea>
                                <IonFabButton id='add-alternative' className='add-btn'  onClick={()=> {
                                    AddAlternative()
                                    setTextAreaAlternative('')
                                    }} color='light'><IonIcon color='success' icon={add}></IonIcon></IonFabButton>
                        </IonRow>                       
                            {alternatives.map((alternative, index)=>(
                                <IonRow key={index} style={{cursor:'default', marginTop:'1rem'}}  className='ion-justify-content-center colunas'>
                                    <IonCol style={{height:'auto', width:'10rem'}} key={alternative.id} className='alternativas' color='dark' placeholder='alternativas'>{alternative.textAreaAlternative}</IonCol>
                                    <IonFabButton  onClick={()=>DeleteAlternatives(alternative.id)} className='remove-btn'  color='light'><IonIcon color='danger' icon={remove}></IonIcon></IonFabButton>
                                </IonRow>
                            ))}                       
                    </IonGrid>
                       
                    <IonRow className='row-toggle'>                                            
                        <IonLabel color='dark' className='label-timer' >Tempo</IonLabel>                        
                        <IonToggle checked={checked} onIonChange={(e)=>setChecked(e.detail.checked)} className='ios toggle' onClick={()=>setShownTimer(!shownTimer)}/>
                        <IonLabel className='tooltip-text'>Opcional</IonLabel>                    
>>>>>>> 9b4ea2cfbbbfd56d8d0def67b87808b4e8cb32aa
                    </IonRow>
                    <IonRow className='ios row-timer'>
                        {shownTimer && timer}
                    </IonRow>

                    <IonRow style={{ marginTop: '1.7rem' }} className='ios ion-justify-content-center'>
                        <IonButton className="ios btn-criar" onClick={() => setShowModal(true)} >Criar</IonButton>
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

<<<<<<< HEAD
const PopChoose: React.FC<{ isOpen: boolean; hidePopover: () => void; disablePick: () => void; ablePick: () => void }> = props => {

    return (
        <>
            <IonPopover
                isOpen={props.isOpen}
                cssClass='my-custom-class quantidade'
                onDidDismiss={props.hidePopover}
            >
                <IonRow className='ion-justify-content-center ion-text-align-center'>
                    <IonLabel style={{ fontWeight: 'bold', fontSize: '16px' }} color='dark'>Tem certeza dessa quantidade?</IonLabel>
                </IonRow>
                <IonRow className='ios ion-justify-content-center'>
                    <IonButton id='sim' className="ios yes" color='success' onClick={props.ablePick} >Sim</IonButton>
                    <IonButton className="ios no" color='danger' onClick={props.disablePick} >Não</IonButton>
                </IonRow>
            </IonPopover>
        </>
    );
}
const ButtonPop: React.FC<{ showPop: () => void }> = props => {

    return (
        <>
            <IonRow className='ios ion-justify-content-center'>
                <IonButton className="ios btn-quantidade" color='light' onClick={props.showPop} >{props.children}</IonButton>
            </IonRow>

        </>
    );
}
const PopRightAnswer: React.FC<{ isOpen: boolean; hidePopover: () => void; ablePick: () => void }> = props => {

    return (
        <>
            <IonPopover
                isOpen={props.isOpen}
                cssClass='my-custom-class quantidade'
                onDidDismiss={props.hidePopover}
            >
                <IonRow className='ion-justify-content-center ion-text-align-center'>
                    <IonLabel style={{ fontWeight: 'bold', fontSize: '16px' }} color='dark'>Agora escolha a alternativa certa.</IonLabel>
                </IonRow>
                <IonRow className='ios ion-justify-content-center'>
                    <IonButton id='Okay' className="ios ok-btn" color='success' onClick={props.ablePick} >Ok</IonButton>

                </IonRow>
            </IonPopover>
        </>
    );
}


=======
>>>>>>> 9b4ea2cfbbbfd56d8d0def67b87808b4e8cb32aa

export default QuestaoAlternativa;