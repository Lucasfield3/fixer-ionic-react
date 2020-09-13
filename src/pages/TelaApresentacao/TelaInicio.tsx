import React, { useState } from 'react';
import {
  IonButton,
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonFabButton,
  IonIcon,
  IonHeader,
  IonMenuButton,
  IonMenu,
  IonToolbar, IonAvatar, IonLabel, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent
} from '@ionic/react'
import { menuOutline } from 'ionicons/icons';
import './style.css'
import { menuController } from '@ionic/core';
import { useHistory } from 'react-router-dom'
import imgAvatar from '../../Assets/images/avatar.svg'

const TelaInicio: React.FC = () => {
  async function openMenu() {
    await menuController.open();
  }
  async function closeMenu() {
    await menuController.close();
  }

  const history = useHistory()

  return (
    <>



      <IonMenu className='custom-menu' type="overlay" side='start' contentId="main-content">
        <IonHeader className='custom-header-menu'>
          <IonToolbar className="bar-menu">
            <IonFabButton slot='start' onClick={closeMenu} className="icon-fab-button light" size="small" color='light'>
              <IonIcon icon={menuOutline} />
            </IonFabButton>
          </IonToolbar>
        </IonHeader>



        <IonContent className='custom-body-menu'>

          <IonGrid className='menu-grid'>

            <IonAvatar className="img-avatar-perfil">
              <img src={imgAvatar} />
            </IonAvatar>

            <IonRow className='ion-justify-content-center ion-margin menu-items'>
              <IonRow className=' ion-margin'>
                <IonButton fill='solid' className='btn-side-menu' color="light">Flashcards</IonButton>
              </IonRow>
              <IonRow className='ion-margin'>
                <IonButton fill='solid' className='btn-side-menu' color="light">Questionarios</IonButton>
              </IonRow >
              <IonRow className='ion-margin'>
                <IonButton fill='solid' className='btn-side-menu' color="light">Classes</IonButton>
              </IonRow>
              <IonRow className='ion-margin'>
                <IonButton fill='solid' className='btn-side-menu' color="light">Conquistas</IonButton>
              </IonRow>
              <IonRow className='ion-margin'>
                <IonButton className='sair' onClick={() => {
                  history.goBack();
                  closeMenu();
                }} size="small" color="light">
                  Sair
                    </IonButton>
              </IonRow>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonMenu>

      <IonPage id="main-content" className="page-inicio">
        <IonHeader className='custom-header'>
          <IonToolbar>
            <IonLabel className="label-menu-fixer">FIXER</IonLabel>
            <IonFabButton slot='start' onClick={openMenu} className="icon-fab-button light" size="small" color="light">
              <IonIcon icon={menuOutline} />
              <IonButton slot='start'>
                <IonMenuButton></IonMenuButton>
              </IonButton>
            </IonFabButton>
          </IonToolbar>
        </IonHeader>


        <IonContent className="menu-apresentacao-content">

          <IonGrid className="menu-grid">
            <IonLabel className="label-menu-title-cards">Últimos criados</IonLabel>

            <IonCard className="card-menu-content">
              <IonCardHeader className="card-title-menu">
                <IonCardTitle>Card Title</IonCardTitle>
              </IonCardHeader>

              <IonCardContent className="card-title-menu">
                VAZIO
              </IonCardContent>
            </IonCard>

            <IonLabel className="label-menu-title-cards">Mais respondidos</IonLabel>

            <IonCard className="card-menu-content">
              <IonCardHeader className="card-title-menu">
                <IonCardTitle>Card Title</IonCardTitle>
              </IonCardHeader>

              <IonCardContent className="card-title-menu">
                VAZIO
              </IonCardContent>
            </IonCard>

            <IonLabel className="label-menu-title-cards">Conquistas próximas</IonLabel>

            <IonCard className="card-menu-content">
              <IonCardHeader className="card-title-menu">
                <IonCardTitle>Card Title</IonCardTitle>
              </IonCardHeader>

              <IonCardContent className="card-title-menu">
                VAZIO
              </IonCardContent>
            </IonCard>
          </IonGrid>


        </IonContent>
      </IonPage>
    </>
  )
}

export default TelaInicio;