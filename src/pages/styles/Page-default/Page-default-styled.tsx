import { 
    IonActionSheet, 
    IonButton, 
    IonCol, 
    IonFab, 
    IonFabButton, 
    IonFabList, 
    IonHeader, 
    IonIcon, 
    IonLabel, 
    IonMenuButton, 
    IonRow,
    IonSearchbar, 
    IonToolbar 
} from '@ionic/react'
import React, { ChangeEvent } from 'react'
import styled from 'styled-components'
import { add, menuOutline, trash, pencilSharp, bookSharp, addSharp, timerOutline, arrowUndoSharp} from 'ionicons/icons';
import TimeField from 'react-simple-timefield';


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


export const HeaderDefault:React.FC = props =>{
    return (
        <>
            <IonHeader className='ios custom-header'>
                <IonToolbar>
                    <IonRow className='row-label'>
                        <IonLabel className="label-menu-fixer">FIXER</IonLabel>
                    </IonRow>
                    {props.children}
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
    isOpen:boolean;
    onDidDismiss:()=>void}> = props=>{

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
export const StyledTimer = styled(IonCol)`
    display:flex;
    flex-direction:row;
    width:auto;
    height:2rem;
    align-items: center;
    position:absolute;
`;
export const Timer: React.FC<{ value: string; onChange: (event: ChangeEvent<HTMLInputElement>) => void }> = props => {

    return (
        <>
            <StyledTimer >
                <IonIcon className='icon-styled' icon={timerOutline} />
                <TimeField colon=':' value={props.value} onChange={props.onChange} input={<input className='input-time'></input>} ></TimeField>
            </StyledTimer>
        </>
    );
}
export const ButtonMenuDark: React.FC<{onClick:()=>void}> = props=>{
    return(
        <>  
             <IonFabButton slot='start' onClick={props.onClick} className="icon-fab-button dark" size="small" color="dark">
                <IonIcon icon={menuOutline} />
                <IonButton slot='start'>
                    <IonMenuButton></IonMenuButton>
                </IonButton>
            </IonFabButton>
        </>
    )
}
export const ButtonArrow: React.FC<{onClick:()=>void}> = props=>{
    return(
        <>  
            <IonFabButton
                    onClick={props.onClick}
                    slot='start'
                    className="icon-fab-button light"

                    size="small"
                    color="light">
                    <IonIcon icon={arrowUndoSharp} />
                    <IonButton slot='start'>
                        <IonMenuButton></IonMenuButton>
                    </IonButton>
                </IonFabButton>
        </>
    )
}
export const HeaderAnswer: React.FC<{onClick:()=>void;}> = props =>{

    return(
        <>
            <IonHeader className='custom-header'>
            <IonToolbar>
                <IonRow className='row-label'>
                    <IonLabel className="label-menu-fixer">FIXER</IonLabel>
                </IonRow>
                
            </IonToolbar>
        </IonHeader>

        </>
    );

}