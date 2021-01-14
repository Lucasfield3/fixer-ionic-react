import { IonActionSheet, IonButton, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonLabel, IonMenuButton, IonRow, IonSearchbar, IonToolbar } from '@ionic/react'
import React from 'react'
import styled from 'styled-components'
import { add, menuOutline, trash, pencilSharp, bookSharp, addSharp} from 'ionicons/icons';

const LabelEmpty = styled(IonLabel)`
  font-size: 30px;
  font-weight: bold;
  color: var(--ion-color-dark);
  opacity: 0.7;
  display: flex;
  align-items:center;
  flex-direction:column;
`;
export const SearchBar = styled(IonSearchbar)`
--border-radius: 6px;
--ion-color-contrast: var(--ion-color-dark)!important;
max-height: 100%;
max-width: 100%;
`;
export const TitleCards = styled(IonLabel)`
    display: flex;
    font-size: 20px;
    font-weight: bold;
    justify-content: center;
    color: #011627;
    font-family: 'Archivo Narrow', sans-serif;
    margin-top: 0.7rem;
`;
export const ButtonChoice = styled(IonButton)`
     --ion-color-dark-contrast:var(--ion-color-light)!important;
    margin: 0.2rem -50px !important;
    font-size: 11px !important;
    --border-radius: 16px;
`;
export const Vazio: React.FC = () => {

    return (
        <>
            <LabelEmpty>
                    VAZIO
            </LabelEmpty>
        </>
    )
}


export const HeaderDefault:React.FC<{openMenu:()=>void}> = props=>{
    return (
        <>
            <IonHeader className='ios custom-header'>
                <IonToolbar>
                    <IonRow className='row-label'>
                        <IonLabel className="label-menu-fixer">FIXER</IonLabel>
                    </IonRow>
                    <IonFabButton slot='start' onClick={props.openMenu} className="icon-fab-button dark" size="small" color="dark">
                        <IonIcon icon={menuOutline} />
                        <IonButton slot='start'>
                            <IonMenuButton></IonMenuButton>
                        </IonButton>
                    </IonFabButton>
                </IonToolbar>
            </IonHeader>
        </>
        
    );
    
}
export const CreateButton:React.FC<{onClick:()=>void}> = props=>{

    return(
        <>
             <IonFab style={{ left: '80%' }} vertical="bottom" horizontal="center" slot="fixed" color="dark">
                <IonFabButton className='custom-fabButton' color="dark">
                    <IonIcon className="add-icon" icon={add} />
                </IonFabButton>
                <IonFabList side="top">
                    {props.children}
                </IonFabList>
            </IonFab>
        </>
    );

}
export const CardMenu:React.FC<{
    handlerDelete:()=>void;
    handlerEdit:()=>void;
    handlerAnswer:()=>void;
    handlerAdd:()=>void;
    handlerClose:()=>void;
    isOpen:boolean;onDidDismiss:()=>void}> = props=>{

    return(
        <>
            <IonActionSheet

                isOpen={props.isOpen}
                mode={'ios'}
                onDidDismiss={props.onDidDismiss}
                cssClass='ios menu-bottom'
                buttons={[{
                    cssClass: 'custom-icon-lix',
                    text: 'Delete',
                    role: 'destructive',
                    icon: trash,
                    handler: props.handlerDelete
                }, {
                    cssClass: 'custom-icon-edit',
                    text: 'Editar',
                    icon: pencilSharp,
                    handler: props.handlerEdit
                }, {
                    cssClass: 'custom-icon-answer',
                    text: 'Responder',
                    icon: bookSharp,
                    handler: props.handlerAnswer
                }, {
                    cssClass: 'custom-icon-add',
                    text: 'Adicionar',
                    icon: addSharp,
                    handler: props.handlerAdd
                }, {
                    cssClass: 'custom-icon-close',
                    text: 'Fechar',
                    icon: 'close',
                    role: 'cancel',
                    handler: props.handlerClose
                }]}
                >
            </IonActionSheet>
        </>
    );

}