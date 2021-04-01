import React, { useState } from 'react';
import {
  IonPage,
  IonRow,
  IonFabButton,
  IonIcon,
  IonContent, 
  IonFab, 
} from '@ionic/react'
import { add} from 'ionicons/icons';
import './style.css'
import { menuController } from '@ionic/core';
import { useHistory } from 'react-router-dom';
import CardsQuestionarios from './cardsQuestionario';
import { Questionnaires } from '../../services/Questionnaires.service';
import { ButtonMenuDark, CardMenu, ContainerCards, HeaderDefault, SearchBar, TitleCards, Vazio } from '../styles/Page-default/Page-default-styled';

async function openMenu(){
    await menuController.open();
}


const CardQuestionarios: React.FC = ()=>{

    const history = useHistory();
    const [searchText, setSearchText] = useState('');
    const [showActionSheet, setShowActionSheet] = useState(false);
    const [quests, setQuests] = useState<Questionnaires[]>([])

    return(
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
                    <TitleCards>Questionários</TitleCards>
                    <ContainerCards style={{
                        display:quests!.length == 0 && 'flex' || 'block',
                        flexDirection:quests!.length == 0 && 'column' || 'unset'
                        }}>
                               {quests.map((quest: Questionnaires, index) => {
                                    return (
                                        <CardsQuestionarios text='Titulo' title='Titulo' key={index} type='tipo' id={quest.owner.id} onClick={() => setShowActionSheet(true)} />
                                    )
                                })}
                            {quests.length == 0 && <Vazio/>|| '' }
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
                        <IonFabButton onClick={()=> history.push('/CriarQuestionario')} className='custom-fabButton' color="dark">
                            <IonIcon className="add-icon" icon={add} />
                        </IonFabButton>
                    </IonFab>

                </IonContent>
            </IonPage>
        </>
    );

}
export default CardQuestionarios;