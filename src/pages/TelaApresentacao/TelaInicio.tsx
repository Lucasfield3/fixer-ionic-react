import React, { useState } from 'react';
import { IonButton, 
IonPage, 
IonContent, 
IonGrid, 
IonRow,  
IonFabButton, 
IonIcon, 
IonHeader, 
IonMenuButton, 
IonMenu,  
IonToolbar, IonText } from '@ionic/react'
import { menuOutline } from 'ionicons/icons';
import './style.css'
import { menuController } from '@ionic/core';
import { useHistory } from 'react-router-dom'

const TelaInicio: React.FC = () => {
  async function openMenu() {
    await menuController.open();
  }
  async function closeMenu() {
    await menuController.close();
  }
 
  const None = ()=>{
    setFabBtn('');
    openMenu()
  }
  const Block = ()=>{
    closeMenu()
    setFabBtn(<FlexFabBtn changeDisplay={None} handleClick={openMenu}/>);
  }
  const [fabBtn, setFabBtn] = useState<{}>(<FlexFabBtn changeDisplay={None} handleClick={openMenu}/>);
  const history = useHistory()


  return (
    <>
        
        <IonMenu className='custom-menu' type="overlay" side='start' contentId="main-content">
          <IonHeader className='custom-header-menu'>
            <IonToolbar>
              <IonFabButton slot='start' onClick={Block} className="icon-fab-button light" size="small" color='light'>
                <IonIcon icon={menuOutline} />
              </IonFabButton>
            </IonToolbar>
          </IonHeader>

          <IonContent className='custom-body-menu'>
            <IonGrid className='menu-grid'>
              <IonRow className='ion-justify-content-center ion-margin menu-items'>
                  <IonRow className=' ion-margin'>
                    <IonButton fill='solid' className='btn-side-menu'  size="large" color="light">Flashcards</IonButton>
                  </IonRow>
                  <IonRow className=' ion-margin'>
                    <IonButton fill='solid' className='btn-side-menu' size="small" color="light">Questionarios</IonButton>
                  </IonRow >
                  <IonRow className=' ion-margin'>
                    <IonButton fill='solid' className='btn-side-menu' size="small" color="light">Classes</IonButton>
                  </IonRow>
                  <IonRow className=' ion-margin'>
                    <IonButton fill='solid' className='btn-side-menu' size="small" color="light">Conquistas</IonButton>
                  </IonRow>
                  <IonRow className=' ion-margin'>
                    <IonButton className='sair' onClick={()=>{
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
              {fabBtn}
              <IonFabButton slot='start' onClick={None} className="icon-fab-button dark" size="small" color="dark">
                <IonIcon icon={menuOutline} />
                <IonButton slot='start'>
                  <IonMenuButton></IonMenuButton>
                </IonButton>
              </IonFabButton>
            </IonToolbar>
          </IonHeader>
          <IonContent>
           
          </IonContent>
        </IonPage>
    </>
  )
}
const FlexFabBtn: React.FC<{changeDisplay:()=>void; handleClick:()=>void}> = props =>{

  const Props = ()=>{
    props.handleClick();
    props.changeDisplay();
  }

  return(
    <>
     <IonFabButton slot='start' onClick={Props} className="icon-fab-button dark" size="small" color="dark">
          <IonIcon icon={menuOutline} />
      </IonFabButton>
    </>
  );
} 

export default TelaInicio;