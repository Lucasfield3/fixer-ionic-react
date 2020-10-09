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
    IonContent, IonInput, IonItem, IonCard, IonCardContent, IonCol, IonTextarea, IonCardHeader, IonModal, IonText, IonCardSubtitle, IonCardTitle
} from '@ionic/react'
import { add, menuOutline, arrowUndoSharp, text } from 'ionicons/icons';
import './style.css'
import { menuController } from '@ionic/core';
import { useHistory } from 'react-router';


const QuestaoAlternativa: React.FC = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showModal, setShowModal] = useState(false)
    const [showModal2, setShowModal2] = useState(false)
    const history = useHistory()
    const [text, setText] = useState<string>('')
    return (
        <>
            <IonPage>
                <IonHeader className='custom-header'>
                    <IonToolbar>
                        <IonRow className='row-label'>
                            <IonLabel className="label-menu-fixer-alternativa">FIXER</IonLabel>
                        </IonRow>
                        <IonFabButton
                            onClick={() => {
                                history.push('/Flash-cards')
                                menuController.enable(true);
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

                    <IonItem className="item-input-alternativa">
                        <IonInput type="text" className="input-alternativa" placeholder="Digite aqui o título da classe."></IonInput>
                    </IonItem>


                    <IonCard className='card-alternativa' color='light'>
                        <IonCardHeader style={{ padding: 0 }}>
                            <IonRow className='ios ion-justify-content-space-between row-header'>
                                <IonButton className="ios btn-tema-alternativa">Tema</IonButton>
                                <IonInput className="input-tema" placeholder="Insira a matéria" onIonChange={e => setText(e.detail.value!)}></IonInput>
                            </IonRow>
                        </IonCardHeader>
                        <IonCardContent className="content-background">
                            <IonRow className="ios row-dissertativa">
                                <IonTextarea rows={5} cols={20} required style={{ overFlow: 'auto', overFlowY: 'scroll', height: '10.4rem', wordSpacing: '-2px!important' }} color='dark' onIonChange={e => setText(e.detail.value!)} placeholder="Digite ou cole o enunciado do flash-card"></IonTextarea>
                            </IonRow>
                        </IonCardContent>
                        <IonRow className='row-footer' color='light'></IonRow>
                    </IonCard >

                    <IonRow style={{ marginTop: '1.7rem' }} className='ios ion-justify-content-center'>
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


                        <IonRow className="btn-modal">
                            <IonModal isOpen={showModal2} cssClass='my-custom-class'>
                                <IonButton className="btn-dissertativa" onClick={() => setShowModal2(true)}>Dissertativa</IonButton>
                                <IonLabel className="label-modal">ou</IonLabel>
                                <IonButton className="btn-alternativa" onClick={() => setShowModal2(true)}>Alternativa</IonButton>
                            </IonModal>
                        </IonRow>

                        <IonButton className="ios btn-criar-alternativa" onClick={() => setShowModal(true)}>Criar</IonButton>
                    </IonRow>
                </IonContent>
            </IonPage>
        </>
    );

}

export default QuestaoAlternativa;