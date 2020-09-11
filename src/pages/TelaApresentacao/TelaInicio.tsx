import React, { useState } from 'react';
import { IonButton, IonPage, IonContent, IonGrid, IonRow, IonCol, IonFab, IonFabButton, IonIcon, IonFabList, IonList, IonItem, IonThumbnail, IonImg, IonLabel, IonRouterOutlet, IonHeader, IonMenuButton, IonMenu, IonTitle, IonToolbar, IonApp } from '@ionic/react'
import { add, settings, share, person, arrowForwardCircle, arrowBackCircle, arrowUpCircle, logoVimeo, logoFacebook, logoInstagram, logoTwitter, menuOutline } from 'ionicons/icons';
import './style.css'
import { menuController } from '@ionic/core';
import Button from '../Landing/styles/Button'
const TelaInicio: React.FC = () => {
  async function openMenu() {
    await menuController.open();
  }
  async function closeMenu() {
    await menuController.close();
  }

  return (
    <>
      <IonApp>
        <IonMenu className='custom-menu' type="overlay" side='start' contentId="main-content">
          <IonHeader>
            <IonToolbar color="primary">
              <IonFabButton slot='start' onClick={closeMenu} className="icon-fab-button light" size="small" color='light'>
                <IonIcon icon={menuOutline} />
              </IonFabButton>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonRow className='ion-justify-content-center menu-items'>
              
                <IonRow>
                  <Button size="large" color="light">Flashcards</Button>
                </IonRow>
                <IonRow>
                  <Button size="large" color="light">Questionarios</Button>
                </IonRow>
                <IonRow>
                  <Button size="large" color="light">Classes</Button>
                </IonRow>
                <IonRow>
                  <Button size="large" color="light">Conquistas</Button>
                </IonRow>
                <IonRow>
                  <Button className="menu-button-sair" shape="round" size="large" color="light">Sair</Button>
                </IonRow>

              
            </IonRow>
          </IonContent>
        </IonMenu>

        <IonPage id="main-content" className="page-inicio">
          <IonHeader>
            <IonToolbar>
              <IonFabButton slot='start' onClick={openMenu} className="icon-fab-button icone" size="small" color="dark">
                <IonIcon icon={menuOutline} />
                <IonButton slot='start'>
                  <IonMenuButton></IonMenuButton>
                </IonButton>
              </IonFabButton>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonFabButton slot='start' onClick={openMenu} className="icon-fab-button icone" size="small" color="dark">
              <IonIcon icon={menuOutline} />
            </IonFabButton>
          </IonContent>
        </IonPage>
      </IonApp>
    </>
  )
}


export default TelaInicio;

/* <IonFab vertical="top" horizontal="start" slot="fixed">
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


type Item = {
  src: string;
};
const items: Item[] = [{ src: 'http://placekitten.com/g/200/300' }];

*/