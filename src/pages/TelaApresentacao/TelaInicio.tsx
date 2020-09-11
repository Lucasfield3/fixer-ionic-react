import React from 'react';
import { IonButton, IonPage, IonContent, IonGrid, IonRow, IonCol, IonFab, IonFabButton, IonIcon, IonFabList, IonList, IonItem, IonThumbnail, IonImg, IonLabel } from '@ionic/react'
import { add, settings, share, person, arrowForwardCircle, arrowBackCircle, arrowUpCircle, logoVimeo, logoFacebook, logoInstagram, logoTwitter, menuOutline } from 'ionicons/icons';

import './style.css'

type Item = {
  src: string;
};
const items: Item[] = [{ src: 'http://placekitten.com/g/200/300' }];


const TelaInicio: React.FC = () => {
  return (
    <>
      <IonPage className="page-inicio">

        <IonContent>

          <IonFab vertical="top" horizontal="start" slot="fixed">
            <IonFabButton className="icon-fab-button icone" size="small" color="dark">
              <IonIcon icon={menuOutline} />
            </IonFabButton>
            <IonFabList side="bottom">
              <IonFabButton className="icon-fab-button-list"><IonIcon icon={logoTwitter} /></IonFabButton>
            </IonFabList>
          </IonFab>


          <IonGrid>

            <IonRow className="first-row-buttons">
              <IonCol className="col-left" size="2">PARTE DA ESQUERDA"
              <IonButton size="small" className="button-flashcards" color="light">Flashcards</IonButton>
                <IonButton size="small" className="button-questionarios" color="light">Questionarios</IonButton>
                <IonButton size="small" className="button-classes" color="light">Classes</IonButton>
                <IonButton size="small" className="button-conquistas" color="light">Conquistas</IonButton>




              </IonCol>


              <IonCol className="col-right" size="3" offset="3">
                PARTE DA DIREITA
              </IonCol>
            </IonRow>



          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  )
}

export default TelaInicio