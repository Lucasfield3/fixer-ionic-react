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
    IonContent, IonInput, IonItem, IonCard, IonCardContent, IonCol, IonTextarea, IonCardHeader
} from '@ionic/react'
import { add, menuOutline, arrowUndoSharp, text } from 'ionicons/icons';
import './style.css'
import { menuController } from '@ionic/core';
import { useHistory } from 'react-router';


const QuestaoAlternativa: React.FC = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
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
                </IonContent>





            </IonPage>
        </>
    );

}

export default QuestaoAlternativa;