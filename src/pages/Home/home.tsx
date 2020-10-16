import React, { useState} from 'react';
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
  IonToolbar,
  IonAvatar,
  IonLabel,
  IonCard,
  IonCardContent,
  IonSearchbar, IonBackdrop
} from '@ionic/react'
import { menuOutline } from 'ionicons/icons';
import './style.css'
import { menuController } from '@ionic/core';
import { useHistory } from 'react-router-dom'
import imgAvatar from '../../Assets/images/avatar.svg'
import smallLogo from '../../Assets/icons/logo-small.svg'

const Home: React.FC = () => {
  async function openMenu() {
    await menuController.open();
  }
  async function closeMenu() {
    await menuController.close();
  }

  const history = useHistory();
  const [searchText, setSearchText] = useState('');
  const [home, setHome] = useState<{}>('')
  const [backDrop, setBackDrop] = useState<{}>('');
  const [isShown, setIsShown] = useState<boolean>(false);
  const [isShownPhoto, setIsPhoto] = useState<boolean>(false);

  const changeBtn = () => {
    setTimeout(() => {
      setHome(<BtnHome backHome={() => {
        closeMenu()
        history.push('/Home')
        setTimeout(() => {
          setHome('')
        }, 500)
      }} />);
    }, 500)
  }

  const changeBackDrop = () => {
      setBackDrop(<BackDrop changeBack={() => {
      setBackDrop('')
      setIsShown(false)
      setIsPhoto(false)
    }} />)
  }

  return (
    <>
      <IonMenu onIonDidClose={() => {
        setIsPhoto(false)
        setIsShown(false)
      }} className='ios custom-menu' type="overlay" side='start' contentId="main-content">
        <IonHeader className='ios header-ios custom-header-menu'>
          <IonToolbar className="bar-menu">
            <IonFabButton slot='start' onClick={() => {
              closeMenu();
              setTimeout(() => {
                setIsPhoto(false);
                setIsShown(false);
              }, 400)
            }} className="icon-fab-button light" size="small" color='light'>
              <IonIcon icon={menuOutline} />
            </IonFabButton>
          </IonToolbar>
        </IonHeader>

        <IonContent className='custom-body-menu'>

          <IonGrid className='menu-grid'>
            {backDrop}
            <IonAvatar onClick={() => {
              setIsPhoto(!isShownPhoto)
              changeBackDrop()
            }} className="img-avatar-perfil">
              <IonLabel className='background-photo' style={{ opacity: isShownPhoto ? 0.6 : 0 }}>
                <div className='text-photo' >
                  {isShownPhoto && 'Mudar foto de perfil'}
                </div>
              </IonLabel>
              <img alt='Avatar' src={imgAvatar} />
            </IonAvatar>
            <IonRow style={{
              opasity: isShown ? 1 : 0,
              cursor: 'default',
              width: isShown ? '5rem' : '1.5rem',
              borderRadius: '1rem'
            }} onClick={() => {
              setIsShown(!isShown)
              changeBackDrop()
            }} className='row-level'>
              {isShown && (
                'level: '
              )}0
            </IonRow>


            <IonRow className='ion-justify-content-center ion-margin menu-items'>
              {home}
              <IonRow >

                <IonButton fill='solid' onClick={() => {
                  closeMenu();
                  history.push('/Flash-cards')
                  changeBtn();

                }} className='btn-side-menu' color="light">Flashcards</IonButton>

              </IonRow>
              <IonRow >

                <IonButton fill='solid' onClick={() => {
                  closeMenu();
                  history.push('/Questionarios')
                  changeBtn();

                }} className='btn-side-menu' color="light">Questionarios</IonButton>

              </IonRow >
              <IonRow >

                <IonButton fill='solid' onClick={() => {
                  closeMenu();
                  history.push('/Classes')
                  changeBtn();
                }}
                  className='btn-side-menu' color="light">Classes</IonButton>

              </IonRow >
              <IonRow >

                <IonButton fill='solid' onClick={() => {
                  closeMenu();
                  history.push('/Conquistas')
                  changeBtn();
                }}
                  className='btn-side-menu' color="light">Conquistas</IonButton>

              </IonRow >
              <IonRow >

                <IonButton className='sair' onClick={() => {
                  closeMenu();
                  history.push('/Landing');
                  menuController.enable(false);
                }} size="small" color="light">
                  Sair
                    </IonButton>

              </IonRow>

            </IonRow>
            <IonRow className='small-logo'>
              <img alt='Logo' src={smallLogo} />
            </IonRow>

          </IonGrid>
        </IonContent>
      </IonMenu>

      <IonPage id="main-content" className="page-inicio">
        <IonHeader className='ios custom-header'>
          <IonToolbar>
            <IonRow className='row-label'>
              <IonLabel className="label-menu-fixer">FIXER</IonLabel>
            </IonRow>
            <IonFabButton slot='start' onClick={openMenu} className="icon-fab-button dark" size="small" color="dark">
              <IonIcon icon={menuOutline} />
              <IonButton slot='start'>
                <IonMenuButton></IonMenuButton>
              </IonButton>
            </IonFabButton>
          </IonToolbar>
        </IonHeader>


        <IonContent className="menu-apresentacao-content">
          <IonRow>

            <IonSearchbar placeholder='Buscar' color='light' className="search-bar"
              value={searchText}
              onIonChange={e => setSearchText(e.detail.value!)}>
              <div className='line'></div>
            </IonSearchbar>
          </IonRow>

          <IonGrid className="menu-grid">
            <IonLabel className="label-menu-title-cards">Últimos criados</IonLabel>

            <IonCard className="card-menu-content">
              <IonCardContent className="card-title-menu">
                <IonLabel className='card-vazio'>
                  VAZIO
                </IonLabel>
              </IonCardContent>
            </IonCard>

            <IonLabel className="label-menu-title-cards">Mais respondidos</IonLabel>

            <IonCard className="card-menu-content">

              <IonCardContent className="card-title-menu">
                <IonLabel className='card-vazio'>
                  VAZIO
                </IonLabel>
              </IonCardContent>

            </IonCard>

            <IonLabel className="label-menu-title-cards">Conquistas próximas</IonLabel>

            <IonCard className="card-menu-content">

              <IonCardContent className="card-title-menu">
                <IonLabel className='card-vazio'>
                  VAZIO
                </IonLabel>
              </IonCardContent>
            </IonCard>
          </IonGrid>


        </IonContent>
      </IonPage>
    </>
  )
}

const BtnHome: React.FC<{ backHome: () => void }> = props => {
  return (
    <>
      <IonRow >
        <IonButton fill='solid' onClick={props.backHome} className='btn-side-menu' color="light">Início</IonButton>
      </IonRow>
    </>
  );
}

const BackDrop: React.FC<{ changeBack: () => void }> = props => {
  return (
    <>
      <IonBackdrop onIonBackdropTap={props.changeBack} visible={true} tappable={true} stopPropagation={true}>
      </IonBackdrop>
    </>
  );
}

export default Home;