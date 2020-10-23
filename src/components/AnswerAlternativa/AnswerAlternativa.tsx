import React, { useEffect, useState } from 'react';
import {
    IonButton,
    IonPage,
    IonRow,
    IonFabButton,
    IonIcon,
    IonHeader,
    IonMenuButton,
    IonLabel,
    IonContent, IonItem, IonInput, IonCard, IonCardContent, IonTextarea, IonCardHeader, IonToggle, IonCol,  IonGrid, IonPopover, IonProgressBar, IonToolbar
} from '@ionic/react'
import { add,  arrowUndoSharp, timerOutline, remove } from 'ionicons/icons';
import './styles.css'
import { menuController } from '@ionic/core';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import backAnswer from '../../Assets/images/back.svg';
import nextAnswer from '../../Assets/images/next.svg';
import btnSair from '../../Assets/images/btnSair.svg';



const AnswerAlternativa: React.FC = () => {


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory()
    const [textTitle, setTextTitle] = useState<string>('')
    const [textMat, setTextMat] = useState<string>('')
    const [textAreaQuestion, setTextAreaQuestion] = useState<string>('')
    const [textAreaAnswer, setTextAreaAnswer] = useState<string>('')
    const [timer, setTimer] = useState<{}>(<Timer />)
    const [checked, setChecked] = useState<boolean>(false);
    const [shownTimer, setShownTimer] = useState<boolean>(false);
    const [showPopover, setShowPopover] = useState<boolean>(false);
    const [shownPopsave, setShownPopsave] = useState<boolean>(false);
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

    useEffect(() => {

        setItems([])

    }, [])
    const CleanInputs = () => {
        setTextPop('')
        setTextAreaAnswer('')
        setTextAreaQuestion('')
        setTextMat('')
        setTextTitle('')
    }

    return (
        <>
            <IonPage>
                <IonHeader className='custom-header'>
                <IonToolbar>
                    <IonFabButton className='btn-sair' color='light' slot='end' size='small'>
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
                    <IonRow className='row-timer'>
                        <IonCol  className='timer-flashcard' color='dark'>00:00</IonCol>
                    </IonRow>
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
                                            <IonRow style={{ cursor: 'default', marginTop: '1rem' }} className='ion-justify-content-center'>
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
                    </IonCard >


                    <IonCard className='card-dissertativa-secundary' color='light'>
                        <IonCardHeader style={{ padding: 0 }}>
                            <IonRow color='light' className='row-header-resposta'></IonRow>
                        </IonCardHeader>
                        <IonCardContent style={{ height: '9rem' }} className="content-background">
                            <IonRow className="ios row-dissertativa">
                                <IonTextarea
                                    overflow-scroll="true"
                                    className='ios answer'
                                    required
                                    value={textAreaAnswer}
                                    rows={4}
                                    cols={20}
                                    color='dark'
                                    onIonChange={e => setTextAreaAnswer(e.detail.value!)}
                                    placeholder="Digite ou cole a resposta">
                                </IonTextarea>
                            </IonRow>
                        </IonCardContent>
                        <IonRow color='light' className='row-footer-resposta'></IonRow>
                    </IonCard >

                    <IonRow style={{ marginTop: '1.7rem' }} className='ios ion-justify-content-center'>
                        <a href="#" className="ios back-answer">
                            <img className="href-back" src={backAnswer} alt="back" />
                        </a>
                        <IonCard className="ios bar-result-answers" color="light">
                            <IonLabel id="answer-certas-alternativa">Certas: 0 </IonLabel>
                            <IonLabel id="answer-total-alternativa">Total: 0 </IonLabel>
                            <IonLabel id="answer-erradas-alternativa">Erradas: 0 </IonLabel>
                        </IonCard>

                        <a href="#" className="ios back-answer">
                            <img className="href-next" src={nextAnswer} alt="next" />
                        </a>
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

export default AnswerAlternativa;