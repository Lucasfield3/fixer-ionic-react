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
    IonLoading, 
    IonMenuButton, 
    IonModal, 
    IonPopover, 
    IonProgressBar, 
    IonRow, 
    IonSearchbar, 
    IonText, 
    IonTextarea, 
    IonToggle, 
    IonToolbar 
} from '@ionic/react'
import React, { ChangeEvent } from 'react'
import styled, { CSSProperties } from 'styled-components'
import { add, menuOutline, trash, pencilSharp, bookSharp, addSharp, timerOutline, arrowUndoSharp, arrowForward} from 'ionicons/icons';
import TimeField from 'react-simple-timefield';
import ReactCardFlip from 'react-card-flip';


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
                    <IonGrid className='ios grid-cards'>
                        <IonRow>
                            {props.children}    
                        </IonRow> 
                    </IonGrid>
             </IonCard>
        </>
    )

}

export const CardQuestion:React.FC<{
    onClickTheme:()=>void;
    isOpenThemes:boolean;
    onDidDismissTheme:(event: CustomEvent) => void;
    onClickSaveBtn:()=>void;
    onClickCleanBtn:()=>void;
    isOpenSaveTheme:boolean;
    onDidDismissSave:(event: CustomEvent) => void;
    refTitle:(instance: HTMLIonInputElement | null) => void;
    refEnunciated:(instance: HTMLIonTextareaElement | null) => void;
    refSub:(instance: HTMLIonInputElement | null) => void;
}> = props =>{



    return(
        <>
            <IonItem className="item-input-title">
                <IonInput maxlength={100}  type="text" required className="input-title" name='title' ref={props.refTitle} placeholder="Insira o título do Flashcard"></IonInput>
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
                                {props.children}
                            </IonGrid>
                            <IonRow style={{ marginTop: '-0.9rem' }} className='ion-justify-content-center'>
                                <IonButton className='btn-save' color='light' onClick={props.onClickSaveBtn}>Salvar</IonButton>
                                <IonButton onClick={props.onClickCleanBtn} color='light' className='btn-clean'>Limpar</IonButton>
                            </IonRow>
                        </IonPopover>
                        <IonPopover
                            isOpen={props.isOpenSaveTheme}
                            cssClass='save'
                            onDidDismiss={props.onDidDismissSave}
                        >
                            <IonRow className='ion-justify-content-center ion-text-align-center'>
                                <IonLabel style={{ fontWeight: 'bold', fontSize: '18px', lineHeight: '13vh' }} color='success'>Temas salvos!</IonLabel>
                            </IonRow>
                        </IonPopover>

                        <IonInput  name='subject' ref={props.refSub} className="input-tema" placeholder="Insira a matéria" ></IonInput>
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
                            name='enunciated'
                            ref={props.refEnunciated}
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

export const ModalDefault:React.FC<{cssClass:string; isOpen:boolean; onClickYes:()=>void; onClickNo:()=>void; msg:string}> = props=>{

    return(
        <>
             <IonModal  backdropDismiss={false} isOpen={props.isOpen} cssClass={props.cssClass}>
                <IonCardTitle className="div-modal-alternativa">
                    <IonText className="modal-text" color="dark">
                        <IonLabel>{props.msg}</IonLabel>
                    </IonText>
                    <IonCardSubtitle className="btn-modalDefault">
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
    refAlternatives:(instance: HTMLIonTextareaElement) => void;
    refAnswer:(instance: HTMLIonTextareaElement) => void;
    nameAnswerFlashCard:string;
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
                    name={props.nameAnswerFlashCard}
                    ref={props.refAnswer}
                    >
                    </IonTextarea>
                </RowRightAlternative>
                
                {props.children}                                         
        </IonGrid>
        </>
    )

}

export const RowBtnCreate:React.FC = props=>{

    return(
        <>
            <IonRow style={{ marginTop: '1.7rem' }} className='ios ion-justify-content-center'>
                <IonButton type='submit'  id='create-button' className="ios btn-criar" >{props.children}</IonButton>
            </IonRow>
        </>
    )

}
export const RowTimer:React.FC<{checked:boolean; 
    onIonChange:(event: CustomEvent)=>void;
    onClick:()=>void;
}> = props=>{

    return(
        <>
             <IonGrid>
                <IonRow className='row-toggle'>
                    <IonLabel color='dark' className='label-timer' >Tempo</IonLabel>
                    <IonToggle checked={props.checked} onIonChange={props.onIonChange} className='ios toggle' onClick={props.onClick} />
                </IonRow>
                <IonRow className='ios row-timer'>
                    {props.children}
                </IonRow> 
            </IonGrid>
        </>
    )

}

export const AreaFlip:React.FC<{
    isFlipped:boolean;
    onClickPopTheme:()=>void;
    isOpen:boolean;
    onDidDismissPopTheme:(event: CustomEvent)=> void;
    onClickClosePop:()=>void;
    refSubj:(instance: HTMLIonInputElement)=>void
    defaultValueSubj:string;
    refEnunciated:(instance: HTMLIonTextareaElement)=>void
    defaultValueEnunciated:string;
    style:any;
    onClickArrowFlip:()=>void;
    isOpenLoadig:boolean;
    card:{};
}>= props=>{

    return(
        <>
             <ReactCardFlip isFlipped={props.isFlipped} flipDirection='horizontal' flipSpeedBackToFront={1.1} flipSpeedFrontToBack={1.1}>
                        <IonCard  className='card-flip' color='light'>
                            <IonCardHeader style={{ padding: 0 }}>
                                <IonRow className='ios ion-justify-content-space-between row-header'>
                                    <IonButton onClick={props.onClickPopTheme} className="ios btn-tema-dissertativa">Tema</IonButton>
                                    <IonPopover
                                        isOpen={props.isOpen}
                                        cssClass='ios my-custom-class temas-custom'
                                        onDidDismiss={props.onDidDismissPopTheme}
                                    >
                                        <IonRow style={{ marginTop: '0.9rem' }} className='ion-justify-content-center'>
                                            <IonLabel style={{ fontWeight: 'bold', fontSize: '18px' }} color='dark'>Temas</IonLabel>
                                        </IonRow>
                                        <IonGrid className='ios back-temas'>
                                            {props.children}
                                        </IonGrid>
                                        <IonRow  style={{ marginTop: '-0.9rem' }} className='ion-justify-content-center row-btn'>
                                            <IonButton onClick={props.onClickClosePop} color='light' className='btn-clean'>Fechar</IonButton>
                                        </IonRow>
                                    </IonPopover>
                                    <IonInput defaultValue={props.defaultValueSubj} ref={props.refSubj} name='subject' className="titulo-mat" ></IonInput>
                                </IonRow>
                            </IonCardHeader>
                            <IonCardContent className="content-background">
                                <IonRow className="ios row-enunciated">
                                    <IonTextarea
                                        overflow-scroll="true"
                                        rows={5}
                                        cols={20}
                                        name="enunciated"
                                        className='ios question'
                                        ref={props.refEnunciated}
                                        color='dark'>
                                        {props.defaultValueEnunciated}
                                    </IonTextarea>
                                </IonRow>
                            </IonCardContent>
                            <IonRow className='row-footer' color='light'></IonRow>
                            <IonRow className='ios ion-justify-content-center'>
                                <IonIcon style={props.style} onClick={props.onClickArrowFlip} className='ios arrow-foward' color='primary' src={arrowForward}></IonIcon>
                            </IonRow>
                            <IonLoading
                                showBackdrop={false}
                                cssClass='loading-custom'
                                isOpen={props.isOpenLoadig}
                                duration={600}
                            />
                        </IonCard >
                        {props.card}
                        
                    </ReactCardFlip>
        </>
    )

}
export const HeaderAnswerDefault:React.FC<{
    onClickPopSair:()=>void;
    valueprogressBar:number;
    refTitle:(instance: HTMLIonInputElement)=>void;
    defaultValueTitle:string;
}> = props=>{

    return(
        <>
            <IonHeader className='custom-header'>
                    <IonToolbar>
                        <IonFabButton onClick={props.onClickPopSair} className='btnSair-answer' color='light' slot='end' size='small'>
                                Sair
                        </IonFabButton>
                    </IonToolbar>
                    <IonRow className='row-level-progress'>
                        <IonRow className='ion-justify-content-center'>
                            <IonLabel className="label-lvl">LV</IonLabel>
                        </IonRow>
                        <IonRow style={{ height: '1rem' }} className='ion-justify-content-center row-progress'>
                            <IonLabel className="start-lvl">0</IonLabel>
                            <IonProgressBar className='progress-bar' value={props.valueprogressBar}></IonProgressBar>
                            <IonLabel className="start-lvl">1</IonLabel>
                        </IonRow>
                    </IonRow>
                    <IonInput name='title' defaultValue={props.defaultValueTitle} ref={props.refTitle} className='ion-justify-content-center flashcard-title'></IonInput>
                </IonHeader>
        </>
    )

}
export const Redone: React.FC<{ onClick: () => void; style: React.CSSProperties }> = props => {

    return (
        <>
            <IonButton color='light' onClick={props.onClick} style={props.style} className="ios btn_stats_refazer">
                Refazer
            </IonButton>
        </>
    );
}

export const FinalBtn: React.FC<{onClick:()=>void; disabled:boolean}> = props =>{

    return(
        <>
            <IonRow  className='ios ion-justify-content-center row-btn-final'>
                <IonButton disabled={props.disabled} onClick={props.onClick} className='ios btn-final' color='light' size='default' >Finalizar</IonButton>
            </IonRow>
        </>
    )

}

export const AreaDissertativeAnswer:React.FC<{
    refAnswer:(instance: HTMLIonTextareaElement) => void;
    onIonChange:(event: CustomEvent) => void;
}> = props => {

    return(
        <>
            <IonCard className='card-dissertativa-secundary' color='light'>
                <IonCardHeader style={{ padding: 0 }}>
                    <IonRow color='light' className='row-header-resposta'></IonRow>
                </IonCardHeader>
                <IonCardContent style={{ height: '9rem' }} className="content-background">
                    <IonRow className="ios row-dissertativa">
                        <IonTextarea
                            mode='md'
                            maxlength={240}
                            overflow-scroll="true"
                            className='ios answer-dissertative'
                            rows={4}
                            cols={20}
                            color='dark'
                            name='answerFlashCard'
                            ref={props.refAnswer}
                            onIonChange={props.onIonChange}
                            placeholder="Digite ou cole a resposta">
                        </IonTextarea>
                    </IonRow>
                </IonCardContent>
                <IonRow color='light' className='row-footer-resposta'></IonRow>
            </IonCard >

        </>
    )

}

export const CreateAreaDissertativeAnswer:React.FC<{
    refAnswer:(instance: HTMLIonTextareaElement) => void;
}> = props => {

    return(
        <>
            <IonCard className='card-dissertativa-secundary' color='light'>
                <IonCardHeader style={{ padding: 0 }}>
                    <IonRow color='light' className='row-header-resposta'></IonRow>
                </IonCardHeader>
                <IonCardContent style={{ height: '9rem' }} className="content-background">
                    <IonRow className="ios row-dissertativa">
                        <IonTextarea
                            maxlength={240}
                            overflow-scroll="true"
                            className='ios answer-dissertative'
                            rows={4}
                            cols={20}
                            color='dark'
                            name='answerFlashCard'
                            ref={props.refAnswer}
                            placeholder="Digite ou cole a resposta">
                        </IonTextarea>
                    </IonRow>
                </IonCardContent>
                <IonRow color='light' className='row-footer-resposta'></IonRow>
            </IonCard >

        </>
    )

}

export const CardContainer:React.FC<{
    refTitle:(instance: HTMLIonInputElement)=> void;
    title:string;
}> = props =>{

    return(
        <>
            <IonItem className="item-input-title">
                <IonInput maxlength={100}  type="text" required className="input-title" name='title' ref={props.refTitle} placeholder="Insira o título da Classe"></IonInput>
            </IonItem>

            <IonCard style={{height:'14.5rem'}} className='card-question' color='light'>
                <IonCardHeader style={{ padding: 0 }}>      
                    <IonRow style={{flexDirection:'column'}} className='ios ion-justify-content-center'>
                    <IonLabel className='label-title' color='dark'>{props.title}</IonLabel>
                        {props.children}
                    </IonRow>
                </IonCardHeader>
            </IonCard>
        </>
    )

}
export const ContainerList:React.FC<{title:string;style:CSSProperties}> = props =>{
    
    return(
        <>
            <IonCard style={props.style} className='card-question' color='light'>
                <IonCardHeader style={{ padding: 0 }}>      
                    <IonRow style={{flexDirection:'column'}} className='ios ion-justify-content-center'>
                        <IonLabel className='label-title' color='dark'>{props.title}</IonLabel>
                        {props.children}
                    </IonRow>
                </IonCardHeader>
            </IonCard>
        </>
    )

}
export const TagsIfIsRight:React.FC<{textConquista:string; textExp:string}> = props =>{

    return ( 
        <>
          <IonRow className='ios row-stats'>
            <IonLabel className="stats_answer_exp">EXP adquirido:<IonLabel style={{ color: '#20A4F3' }}> +{props.textExp}</IonLabel></IonLabel>
          </IonRow>
    
          <IonRow>
            <IonLabel color='dark' className="ios stats_conquista">Conquistas:{props.textConquista}</IonLabel>
          </IonRow>
        </>
        )

}