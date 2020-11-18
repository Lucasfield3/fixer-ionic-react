import React, { useState } from 'react';
import {
  IonButton,
  IonPage,
  IonRow,
  IonFabButton,
  IonIcon,
  IonHeader,
  IonMenuButton,
  IonToolbar, 
  IonLabel, 
  IonContent, 
  IonSearchbar, 
  IonActionSheet, 
  IonCard, 
  IonFab, 
  IonCol, 
  IonGrid
} from '@ionic/react'
import { add, addSharp, bookSharp, menuOutline, pencilSharp, trash } from 'ionicons/icons';
import './style.css'
import { menuController } from '@ionic/core';
import { useHistory } from 'react-router-dom';
import CardsQuestionarios from './cardsQuestionario';
import { Questionario } from '../../services/Questionarios.service';

async function openMenu(){
    await menuController.open();
}


const CardQuestionarios: React.FC = ()=>{

    const history = useHistory();
    const [searchText, setSearchText] = useState('');
    const [showActionSheet, setShowActionSheet] = useState(false);
    const [quests, setQuests] = useState<Questionario[]>([])

    return(
        <>
            <IonPage>
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
                <IonContent>
                    <IonRow>
                        <IonSearchbar placeholder='Buscar' color='light' className="search-bar"
                            value={searchText}
                            onIonChange={e => setSearchText(e.detail.value!)}>
                            <div className='line'></div>
                        </IonSearchbar>
                    </IonRow>
                    <IonLabel className="label-menu-title-cards">Questionários</IonLabel>
                    <IonCard style={{alignItems:quests?.length == 0 && 'center' || 'unset'}} className='container-questionarios'>
                        <IonCol >
                            <IonGrid className='ios grid-flashcards'>
                                {quests.map((quest: Questionario, index) => {
                                    return (
                                        <CardsQuestionarios text='Titulo' title='Titulo' key={index} type='tipo' id={quest.owner.id} onClick={() => setShowActionSheet(true)} />
                                    )
                                })}
                            </IonGrid>
                            {quests.length == 0 && <Vazio/>|| '' }
                        </IonCol>
                        <IonActionSheet

                        isOpen={showActionSheet}
                        mode={'ios'}
                        onDidDismiss={() => {
                            setShowActionSheet(false)
                            menuController.enable(true);
                        }}
                        cssClass='ios menu-bottom'
                        buttons={[{
                            cssClass: 'custom-icon-lix',
                            text: 'Delete',
                            role: 'destructive',
                            icon: trash,
                            handler: () => {
                                console.log('deletado')
                            }
                        }, {
                            cssClass: 'custom-icon-edit',
                            text: 'Editar',
                            icon: pencilSharp,
                            handler: () => {
                                console.log('editado')
                            }
                        }, {
                            cssClass: 'custom-icon-answer',
                            text: 'Responder',
                            icon: bookSharp,
                            handler: () => { 
                                console.log('responder')
                            }
                        }, {
                            cssClass: 'custom-icon-add',
                            text: 'Adicionar',
                            icon: addSharp,
                            handler: () => {
                                console.log('Favorite clicked');
                            }
                        }, {
                            cssClass: 'custom-icon-close',
                            text: 'Fechar',
                            icon: 'close',
                            role: 'cancel',
                            handler: () => {
                                console.log('Cancel clicked');
                                menuController.enable(true);
                            }
                        }]}
                        >
                        </IonActionSheet>
                    </IonCard>
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
const Vazio: React.FC = () => {

    return (
        <>
        <IonLabel className='card-vazio-cards'>
                VAZIO
        </IonLabel>
        </>
    )
}

export default CardQuestionarios;