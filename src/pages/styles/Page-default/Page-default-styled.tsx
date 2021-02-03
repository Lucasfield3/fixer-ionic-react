import { 
    IonActionSheet, 
    IonButton, 
    IonCard, 
    IonCardContent, 
    IonCardHeader, 
    IonCardSubtitle, 
    IonCardTitle, 
    IonCol, 
    IonFab, 
    IonFabButton, 
    IonFabList, 
    IonGrid, 
    IonHeader, 
    IonIcon, 
    IonInput, 
    IonItem, 
    IonLabel, 
    IonMenuButton, 
    IonModal, 
    IonPopover, 
    IonRow, 
    IonSearchbar, 
    IonText, 
    IonTextarea, 
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
  margin:auto;
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
export const HeaderAnswer: React.FC = () =>{

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
export const ContainerCards:React.FC<{style: React.CSSProperties}> = props =>{

    return(
        <>
             <IonCard style={props.style}  className='container-cards'>
                 <IonCol style={{display:'flex'}}>
                     <IonGrid className='ios grid-cards'> 
                         {props.children}
                     </IonGrid>
                 </IonCol>
             </IonCard>
        </>
    )

}

export const CardQuestion:React.FC<{
    onIonChangeTitle:(event: CustomEvent) => void;
    valueTitle:string;
    onClickTheme:()=>void;
    isOpenThemes:boolean;
    onDidDismissTheme:(event: CustomEvent) => void;
    onClickAddTheme:()=>void;
    onClickSaveBtn:()=>void;
    onClickCleanBtn:()=>void;
    isOpenSaveTheme:boolean;
    onIonChangeTheme:(event: CustomEvent) => void;
    onDidDismissSave:(event: CustomEvent) => void;
    valueTextPop:string;
    valueSubj:string;
    onIonChangeSubj:(event: CustomEvent) => void;
    onIonChangeQuestion:(event: CustomEvent) => void;
    valueEnunciated:string;


}> = props =>{

    return(
        <>
             <IonItem className="item-input-title">
                        <IonInput maxlength={100} value={props.valueTitle} type="text" required className="input-title" onIonChange={props.onIonChangeTitle} placeholder="Insira o título do Flashcard"></IonInput>
                    </IonItem>

                    <IonCard className='card-question' color='light'>
                        <IonCardHeader style={{ padding: 0 }}>
                            <IonRow className='ios ion-justify-content-space-between row-header'>
                                <IonButton onClick={props.onClickTheme} className="ios btn-tema-dissertativa">Tema</IonButton>
                                <IonPopover
                                    isOpen={props.isOpenThemes}
                                    cssClass='ios temas-custom'
                                    onDidDismiss={props.onDidDismissTheme}
                                >
                                    <IonRow style={{ marginTop: '0.9rem'}} className='ion-justify-content-center'>
                                        <IonLabel style={{ fontWeight: 'bold', fontSize: '18px' }} color='dark'>Adicione um tema</IonLabel>
                                    </IonRow>
                                    <IonGrid className='back-temas'>
                                        <IonRow className='ion-justify-content-center'>
                                            <IonInput maxlength={100} className='ios add-temas' placeholder='Tema' color='dark' onIonChange={props.onIonChangeTheme} value={props.valueTextPop} type='text'></IonInput>
                                            <IonFabButton className='add-btn' onClick={props.onClickAddTheme} color='light'><IonIcon color='success' icon={add}></IonIcon></IonFabButton>
                                        </IonRow>
                                        {props.children}
                                    </IonGrid>
                                    <IonRow style={{ marginTop: '-0.9rem' }} className='ion-justify-content-center'>
                                        <IonButton className='btn-save' color='light' onClick={props.onClickSaveBtn}>Salvar</IonButton>
                                        <IonButton onClick={props.onClickCleanBtn} color='light' className='btn-clean'>Limpar</IonButton>
                                    </IonRow>
                                </IonPopover>
                                <IonPopover
                                    isOpen={props.isOpenSaveTheme}
                                    cssClass='my-custom-class save'
                                    onDidDismiss={props.onDidDismissSave}
                                >
                                    <IonRow className='ion-justify-content-center ion-text-align-center'>
                                        <IonLabel style={{ fontWeight: 'bold', fontSize: '18px', lineHeight: '8rem' }} color='success'>Temas salvos!</IonLabel>
                                    </IonRow>
                                </IonPopover>

                                <IonInput maxlength={100} value={props.valueSubj} className="input-tema" placeholder="Insira a matéria" onIonChange={props.onIonChangeSubj}></IonInput>
                            </IonRow>
                        </IonCardHeader>
                        <IonCardContent className="content-background">
                            <IonRow className="ios row-enunciated">
                                <IonTextarea
                                    autoCapitalize='on'
                                    maxlength={240}
                                    overflow-scroll="true"
                                    rows={5}
                                    cols={20}
                                    required
                                    className='ios question'
                                    color='dark'
                                    onIonChange={props.onIonChangeQuestion}
                                    value={props.valueEnunciated}
                                    placeholder="Digite ou cole o enunciado do flash-card">
                                </IonTextarea>
                            </IonRow>
                        </IonCardContent>
                        <IonRow className='row-footer' color='light'></IonRow>
                    </IonCard >
        </>
    )

}
export const ModalChoose:React.FC<{isOpen:boolean; onClickDiss:()=>void;onClickAlt:()=>void}> = props =>{

    return(
        <>
            <IonModal backdropDismiss={false} isOpen={props.isOpen} cssClass='modal-choose'>
                <IonButton color='light' className="btn-choose" onClick={props.onClickDiss}>Dissertativa</IonButton>
                <IonLabel className="label-modal">ou</IonLabel>
                <IonButton color='light' className="btn-choose" onClick={props.onClickAlt}>Alternativa</IonButton>
            </IonModal>
        </>
    )

}

export const ModalCreate:React.FC<{isOpen:boolean; onClickYes:()=>void; onClickNo:()=>void}> = props=>{

    return(
        <>
             <IonModal backdropDismiss={false} isOpen={props.isOpen} cssClass='ios modal-criar'>
                <IonCardTitle className="div-modal-alternativa">
                    <IonText className="modal-text" color="dark">
                        <IonLabel>Deseja criar mais um flashcard ?</IonLabel>
                    </IonText>
                    <IonCardSubtitle className="header-btn">
                        <IonButton color='light' className="btn-sim" onClick={props.onClickYes}>Sim</IonButton>
                        <IonButton color='light' className="btn-nao" onClick={props.onClickNo}>Não</IonButton>
                    </IonCardSubtitle>
                </IonCardTitle>
            </IonModal>
        </>
    )

}
const RowRightAlternative = styled(IonRow)`
    margin-bottom:1rem;
`;
export const GridAlternatives:React.FC<{

    style: React.CSSProperties;
    autoGrow:boolean;
    onIonChangeRight:(event: CustomEvent) => void;
    valueTextRighAnswer:string;
    onClick:()=>void
    valueAnswer:string;
    onIonChangeAnswer:(event: CustomEvent) => void;

}> = props=>{

    return(
        <>
            <IonGrid className='array-div'>
                <RowRightAlternative  className='ion-justify-content-center'>
                    <IonTextarea 
                    maxlength={240}
                    autoGrow={props.autoGrow} 
                    style={props.style} 
                    className='ios alternativa-correta' 
                    placeholder='Insira a alternativa correta' 
                    color='dark' 
                    onIonChange={props.onIonChangeRight} 
                    value={props.valueTextRighAnswer}
                    >
                    </IonTextarea>
                </RowRightAlternative>
                <IonRow  className='ion-justify-content-center'>
                    <IonTextarea autoGrow={true} className='ios add-alternativas'  placeholder='Insira a/as alternativas' color='dark'  onIonChange={props.onIonChangeAnswer} value={props.valueAnswer}></IonTextarea>
                    <IonFabButton id='add-alternative' className='add-btn'  onClick={props.onClick} color='light'><IonIcon color='success' icon={add}></IonIcon></IonFabButton>
                </IonRow>
                {props.children}                                         
        </IonGrid>
        </>
    )

}
export const RowBtnCreate:React.FC<{onClick:()=>void}> = props=>{

    return(
        <>
            <IonRow style={{ marginTop: '1.7rem' }} className='ios ion-justify-content-center'>
                <IonButton id='create-button' className="ios btn-criar" onClick={props.onClick} >{props.children}</IonButton>
            </IonRow>
        </>
    )

}