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
  IonMenu,
  IonToolbar,
  IonAvatar,
  IonLabel,
  useIonViewWillEnter,
  IonMenuButton
} from '@ionic/react'
import './style.css'
import { menuController } from '@ionic/core';
import { useHistory } from 'react-router-dom'
import imgAvatar from '../../Assets/images/avatar.svg'
import smallLogo from '../../Assets/icons/logo-small.svg'
import { FlashCard, getAllFlashCards } from '../../services/flashCard.service';
import Cards from '../Flash-cards/Cards/Cards';
import Carousel from 'react-elastic-carousel';
import {BackDrop, BtnHome, ContainersHome, BtnSideMenu} from './Home-style/Home-styled'
import { SearchBar, HeaderDefault, TitleCards, ButtonMenuDark} from '../styles/Page-default/Page-default-styled';
import { menuOutline } from 'ionicons/icons'; 

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
  const [cards, setCards] = useState<FlashCard[]>([])

  async function getCards() {
    let cardsValues = await getAllFlashCards()
    console.log(cardsValues)
    setCards(cardsValues)
}
  useIonViewWillEnter(() => {
    menuController.enable(true) 
   
}, [])
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
const breakPoints = [
  {width: 1, itemsToShow:2}
]

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
              <IonLabel className='background-photo'style={{ opacity: isShownPhoto ? 0.6 : 0 }}
              >
                <div className='text-photo' >
                  {isShownPhoto && 'Mudar foto de perfil'}
                </div>
              </IonLabel>
              <img alt='Avatar' src={imgAvatar} />
            </IonAvatar>
             <IonRow style={{
              opasity: isShown ? 1 : 0,
              cursor: 'default',
              width: isShown ? '3.8rem' : '1.3rem',
              paddingLeft: isShown ? '0.3rem': '5.6px', 
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

                <BtnSideMenu fill='solid' onClick={() => {
                  closeMenu();
                  history.push('/Flash-cards')
                  changeBtn();

                }}  color="light">Flashcards</BtnSideMenu>

              </IonRow>
              <IonRow >

                <BtnSideMenu fill='solid' onClick={() => {
                  closeMenu();
                  history.push('/Questionarios')
                  changeBtn();

                }}  color="light">Questionarios</BtnSideMenu>

              </IonRow >
              <IonRow >

                <BtnSideMenu fill='solid' onClick={() => {
                  closeMenu();
                  history.push('/Classes')
                  changeBtn();
                }}
                   color="light">Classes</BtnSideMenu>

              </IonRow >
              <IonRow >

                <BtnSideMenu fill='solid' onClick={() => {
                  closeMenu();
                  history.push('/Conquistas')
                  changeBtn();
                }}
                   color="light">Conquistas</BtnSideMenu>

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
        <HeaderDefault>
            <ButtonMenuDark onClick={()=>openMenu()}/>
        </HeaderDefault>

        <IonContent className="menu-apresentacao-content">
            <SearchBar placeholder='Buscar' color='light' className="search-bar"
              value={searchText}
              onIonChange={e => setSearchText(e.detail.value!)}>
              <div className='line'></div>
            </SearchBar>  
          <IonGrid className="menu-grid">
          <TitleCards>Últimos criados </TitleCards>

            <ContainersHome  style={{alignItems:cards!.length == 0 && 'center' || 'unset'}}>
                  <IonGrid style={{display:cards.length == 0 && 'none' || 'block'}} className='ios grid-flashcards'>
                  <Carousel breakPoints={breakPoints}>
                      {cards.map((card: FlashCard, index) => {
                          return (        
                              <Cards status={[card]} text={card.title} title={card.title} key={index} type={card.type === 'alternative' && 'alternativa' || 'dissertativa'} id={card.id} onClick={()=> console.log('clicked')} />
                          )
                      })}
                       {cards.length == 0 && <IonLabel className='label-vazio'>VAZIO</IonLabel>|| '' }
                      </Carousel>
                  </IonGrid>
                  {cards.length == 0 && <IonLabel className='label-vazio'>VAZIO</IonLabel>|| '' }

           </ContainersHome>

           <TitleCards>Mais Respondidos</TitleCards>

           <ContainersHome style={{}}>
             <IonLabel className='label-vazio'>VAZIO</IonLabel>
           </ContainersHome>

            <TitleCards>Conquistas próximas</TitleCards>

            <ContainersHome style={{}}>
            <IonLabel className='label-vazio'>VAZIO</IonLabel>
            </ContainersHome>
          </IonGrid>


        </IonContent>
      </IonPage>
    </>
  )
}

export default Home;
