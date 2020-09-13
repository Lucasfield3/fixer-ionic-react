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
    menuController.enable(false, 'fab-static');
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
                <IonIcon color='dark' icon={menuOutline} />
              </IonFabButton>
            </IonToolbar>
          </IonHeader>

          <IonContent className='custom-body-menu'>
            <IonGrid className='menu-grid'>
              <IonRow className='ion-justify-content-center ion-margin menu-items'>
                  <IonRow className=' ion-margin'>
                    <IonButton className='btn-side-menu'  size="large" color="light">Flashcards</IonButton>
                  </IonRow>
                  <IonRow className=' ion-margin'>
                    <IonButton className='btn-side-menu' size="small" color="light">Questionarios</IonButton>
                  </IonRow >
                  <IonRow className=' ion-margin'>
                    <IonButton className='btn-side-menu' size="small" color="light">Classes</IonButton>
                  </IonRow>
                  <IonRow className=' ion-margin'>
                    <IonButton className='btn-side-menu' size="small" color="light">Conquistas</IonButton>
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
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonFabButton slot='start' onClick={openMenu} className="icon-fab-button icone" size="small" color="dark">
              <IonIcon icon={menuOutline} />
            </IonFabButton>
          </IonContent>
        </IonPage>
    </>
  )
}
const FlexFabBtn:React.FC<{handleClick:()=> void; changeDisplay:()=>void}> = props=>{
  const Props = ()=>{
    props.handleClick();
    props.changeDisplay();
  }
  return(
    <>
       <IonFabButton  id='fab-static' slot='start' onClick={Props} className="icon-fab-button icone" size="small" color="dark">
          <IonIcon icon={menuOutline} />
          <IonButton slot='start'>
            <IonMenuButton></IonMenuButton>
          </IonButton>
        </IonFabButton>
    </>
  );
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