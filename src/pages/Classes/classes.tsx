import React, { useState } from 'react';
import {
    IonPage,
    IonContent,
    IonRow,
    IonFabButton,
    IonIcon,
    IonFab, 
} from '@ionic/react'
import './style.css'
import { menuController } from '@ionic/core';

import { add, /*trash, share, caretForwardCircle, heart, close, arrowBackCircle*/ } from 'ionicons/icons';
import { HeaderDefault, ButtonMenuDark, SearchBar, TitleCards, ContainerCards, CardMenu, Vazio } from '../styles/Page-default/Page-default-styled';
import { useHistory } from 'react-router-dom';
import CardsClasses from './cardsClasses';
import { NewClass, Classe } from '../../services/classe.service';



async function openMenu() {
    await menuController.open();
}

const Classes: React.FC = () => {

    const [showActionSheet, setShowActionSheet] = useState(false);
    const [searchText, setSearchText] = useState('');
    const history = useHistory();
    const [classes, setClasses] = useState<Classe[]>([])
    return (
        <>
            <IonPage>
                <HeaderDefault>
                    <ButtonMenuDark onClick={()=>openMenu()}/>
                </HeaderDefault>

                <IonContent>
                    <IonRow>
                        <SearchBar placeholder='Buscar' color='light' className="search-bar"
                            value={searchText}
                            onIonChange={e => setSearchText(e.detail.value!)}>
                            <div className='line'></div>
                        </SearchBar>
                    </IonRow>
                    <TitleCards>Classes</TitleCards>
                    <ContainerCards style={{
                        display:classes!.length == 0 && 'flex' || 'block',
                        flexDirection:classes!.length == 0 && 'column' || 'unset'
                        }}>
                              {classes.map((item: Classe, index)=>{
                                  return(
                                      <CardsClasses text='Titulo' title='Titulo' key={index} type='tipo' id={item.owner.id} onClick={() => setShowActionSheet(true)} />
                                  )
                              })}
                            {classes.length == 0 && <Vazio/>|| '' }
                        <CardMenu onDidDismiss={()=>{       
                                setShowActionSheet(false)
                                menuController.enable(true);
                        }} 
                        isOpen={showActionSheet}
                        handlerDelete={()=>{
                            menuController.enable(true);
                        }}
                        handlerEdit={()=> console.log('edit clicked')}
                        handlerAnswer={()=> console.log('answer clicked')}
                        handlerAdd={()=> console.log('Favorite clicked')}
                        handlerClose={()=>menuController.enable(true)}
                        />                       
                    </ContainerCards>
                    <IonFab style={{ left: '80%' }} vertical="bottom" horizontal="center" slot="fixed" color="dark">
                        <IonFabButton onClick={()=> history.push('/CriarClasse')} className='custom-fabButton' color="dark">
                            <IonIcon className="add-icon" icon={add} />
                        </IonFabButton>
                    </IonFab>
                </IonContent>
            </IonPage>
        </>
    );

}

export default Classes;