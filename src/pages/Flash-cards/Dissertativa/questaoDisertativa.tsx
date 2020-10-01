import React from 'react';
import {
    IonButton,
    IonPage,

    IonRow,
    IonFabButton,
    IonIcon,
    IonHeader,
    IonMenuButton,
    IonToolbar, IonLabel, IonContent, IonFab, IonFabList, IonItem, IonInput
} from '@ionic/react'
import { add, menuOutline, arrowUndoSharp, text } from 'ionicons/icons';
import './style.css'
import { menuController } from '@ionic/core';
import { useHistory } from 'react-router';


const questaoDissertativa: React.FC = () => {
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory()

    return (
        <>
            <IonPage>
                <IonHeader className='custom-header'>
                    <IonToolbar>
                        <IonRow className='row-label'>
                            <IonLabel className="label-menu-fixer-dissertativa">FIXER</IonLabel>
                        </IonRow>
                        <IonFabButton
                            onClick={() => history.push('/Flash-cards')}
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
                        <IonInput type="text" className="input-dissertativa" placeholder="Digite aqui o título da classe."></IonInput>
                    </IonItem>

                </IonContent>
            </IonPage>
        </>
    );

}

export default questaoDissertativa;