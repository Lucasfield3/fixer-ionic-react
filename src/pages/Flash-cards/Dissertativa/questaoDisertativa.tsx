import React,{useState} from 'react';
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
    IonContent, IonItem, IonInput, IonCard, IonCardContent, IonTextarea
} from '@ionic/react'
import { add, menuOutline, arrowUndoSharp, text } from 'ionicons/icons';
import './style.css'
import { menuController } from '@ionic/core';
import { useHistory } from 'react-router';



const QuestaoDissertativa: React.FC = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory()
    const [text, setText] = useState<string>('')

    return (
        <>
            <IonPage>
                <IonHeader className='custom-header'>
                    <IonToolbar>
                        <IonRow className='row-label'>
                            <IonLabel className="label-menu-fixer-dissertativa">FIXER</IonLabel>
                        </IonRow>
                        <IonFabButton
                            onClick={() =>{ 
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

                    <IonItem className="item-input-dissertativa">
                        <IonInput type="text" required className="input-dissertativa" placeholder="Digite aqui o título da classe."></IonInput>
                    </IonItem>
                    <IonCard id='init-card-alternativa' className='card-alternativa' color='light'>
                        <IonCardContent>
                            <IonRow className="row-alternativa">
                                <IonTextarea required rows={6} cols={20} style={{overFlow:'auto',overFlowY:'scroll',}} color='dark' value={text} onIonChange={e => setText(e.detail.value!)} placeholder="Cole aqui seu enunciado."></IonTextarea>
                            </IonRow>
                        </IonCardContent>
                    </IonCard >
                </IonContent>
            </IonPage>
        </>
    );

}

export default QuestaoDissertativa;