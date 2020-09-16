import React, { useState, useEffect, useRef, RefObject } from 'react';
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
  IonToolbar, IonAvatar, IonLabel, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonSearchbar, IonFooter
} from '@ionic/react'
import {  menuOutline } from 'ionicons/icons';
import './style.css'
import { menuController } from '@ionic/core';
import { useHistory, Link } from 'react-router-dom'
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
  const changeBtn = ()=>{
    setTimeout(()=>{
      setHome(<BtnHome backHome={()=>{ 
        closeMenu()
        setTimeout(()=>{setHome('')}, 500) 
}}/>);
    }, 500)
  }
const [isShown, setIsShown] = useState<boolean>(false);
const [isShownPhoto, setIsPhoto] = useState<boolean>(false);
  return (
    <>
      <IonMenu className='custom-menu' type="overlay" side='start' contentId="main-content">
        <IonHeader className='custom-header-menu'>
          <IonToolbar className="bar-menu">
            <IonFabButton slot='start' onClick={()=>{
              closeMenu();
              setTimeout(()=>{
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
            
            
            <IonAvatar onClick={()=>setIsPhoto(!isShownPhoto)} className="img-avatar-perfil">              
              <IonLabel className='background-photo' style={{opacity:isShownPhoto ? 0.6 : 0}}>
              <div className='text-photo' /*</IonAvatar>style={{fontWeight:'bold', position:'absolute', color:'var(--ion-color-dark)',zIndex:11}}*/>
                {isShownPhoto && 'Mudar foto de perfil'}
                </div>
              </IonLabel>
              <img alt='Avatar' src={imgAvatar} />
            </IonAvatar>
    
            <IonRow style={{
              opasity: isShown? 1 : 0, 
              cursor:'pointer', 
              width:isShown? '50px' : '18px', 
              borderRadius:'20px'}}  onClick={()=>setIsShown(!isShown)} /*onMouseEnter={()=>handleMouseEnter(true)} onMouseLeave={()=>handleMouseEnter(false)}*/ className='row-level'>
                  {isShown && (
                    'level:'
                  )}0
            </IonRow>

            <IonRow className='ion-justify-content-center ion-margin menu-items'>
              {home}
              <IonRow className=' ion-margin'>
              <Link to={'/Flash-cards'}>
                <IonButton fill='solid' onClick={()=>{
                  closeMenu();
                  //history.push('/Flash-cards')
                  changeBtn();
                  
                  }} className='btn-side-menu' color="light">Flashcards</IonButton>
                  </Link>
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
              <Link to={'/Landing'}>
                <IonButton className='sair' onClick={() => {
                  closeMenu();
                  menuController.enable(false);
                }} size="small" color="light">         
                     Sair
                    </IonButton>
                    </Link>
              </IonRow>
            </IonRow>
            <IonRow  className='small-logo'>
              <img alt='Logo' src={smallLogo} />
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonMenu>

      <IonPage id="main-content" className="page-inicio">
        <IonHeader className='custom-header'>
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
                <IonLabel  className='card-vazio'>
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

const BtnHome: React.FC<{backHome:()=>void}> = props=>{
  return(
    <>
       <IonRow className=' ion-margin'>
       <Link to={'/Home'}><IonButton fill='solid' onClick={props.backHome} className='btn-side-menu' color="light">Início</IonButton></Link>
      </IonRow>
    </>
  );
}

export default Home;