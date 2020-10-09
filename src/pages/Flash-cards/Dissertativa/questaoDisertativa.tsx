import React, { useEffect, useState } from 'react';
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
    IonContent, IonItem, IonInput, IonCard, IonCardContent, IonTextarea, IonCardHeader, IonToggle, IonCol, IonImg, IonGrid, IonPopover, IonButtons, IonTitle
} from '@ionic/react'
import { add, menuOutline, arrowUndoSharp ,text ,timerOutline } from 'ionicons/icons';
import './style.css'
import { menuController } from '@ionic/core';
import { useHistory } from 'react-router';
import style from 'styled-components';
import styled from 'styled-components';
import { textChangeRangeIsUnchanged } from 'typescript';



const QuestaoDissertativa: React.FC = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory()
    const [text, setText] = useState<string>('')
    const [timer, setTimer] = useState<{}>(<Timer/>)
    const [shownTimer, setShownTimer] = useState<boolean>(false);
    const [showPopover, setShowPopover] = useState(false);
    const [shownPopsave, setShownPopsave]= useState<boolean>(false);
    const temas = {
        id:-1,
        text:''
    }
    const [ items, setItems] = useState([temas]);
    const popOverSave = ()=>{
        setShownPopsave(true);
        setTimeout(()=>{
            setShownPopsave(false);
            setShowPopover(false);
        }, 1000)
    }
    const AddTema = ()=>{

        if(text !==''){
            setItems([...items, {
                id:items.length,
                text:text
                }
            ])
        }
    }
    const DeleteTema = (id:number)=>{
        const itemToBedeleted = items.filter(item=> item.id !==id);
        setItems(itemToBedeleted)
    }

    useEffect(()=>{

        setItems([])

    }, [])


    return (
        <>
            <IonPage>
                <IonHeader className='custom-header'>
                    <IonToolbar>
                        <IonRow className='row-label'>
                            <IonLabel className="label-menu-fixer-dissertativa">FIXER</IonLabel>
                        </IonRow>
                        <IonFabButton
                            onClick={() => {
                                history.push('/Flash-cards')
                                menuController.enable(true);
                                setItems([])
                                setText('')
                            }}
                            slot='start'
                            className="icon-fab-button light"
                            size="small"
                            color="light">
                            <IonIcon icon={arrowUndoSharp} />
                            <IonButton slot='start'>
                                <IonMenuButton></IonMenuButton>
                            </IonButton>
                        </IonFabButton>
                    </IonToolbar>
                </IonHeader>


                <IonContent>
                    <IonItem style={{borderRadius:'6px'}} className="item-input-dissertativa">
                        <IonInput  type="text" required className="input-dissertativa" placeholder="Insira o título da classe"></IonInput>
                    </IonItem>

                    <IonCard  className='card-dissertativa' color='light'>
                        <IonCardHeader style={{padding:0}}>
                            <IonRow className='ios ion-justify-content-space-between row-header'>
                                <IonButton onClick={() => setShowPopover(true)} className="ios btn-tema-dissertativa">Tema</IonButton>
                                <IonPopover
                                    isOpen={showPopover}
                                    cssClass='my-custom-class tema'
                                    onDidDismiss={e => setShowPopover(false)}
                                >
                                    <IonRow  className='ion-justify-content-center'>
                                        <IonLabel style={{fontWeight:'bold', fontSize:'18px'}} color='dark'>Adicione um tema</IonLabel>
                                    </IonRow>
                                    <IonRow className='ion-justify-content-center'>
                                    <IonInput  style={{border:'1px #000 solid', height:'2rem'}} placeholder='Tema' color='dark'  onIonChange={e => setText(e.detail.value!)} value={text} type='text'></IonInput>
                                        <IonFabButton  onClick={()=>AddTema()} color='light'>+</IonFabButton>
                                        {items.map(item=>(
                                             <IonRow  className='ion-justify-content-center'>
                                                <IonInput readonly key={item.id} style={{border:'1px #000 solid', height:'2rem', cursor:'default'}} className='temas-inputs' color='dark' type='text'>{item.text}</IonInput>
                                                <IonFabButton onClick={()=>DeleteTema(item.id)} color='light'>-</IonFabButton>
                                            </IonRow>
                                        ))}
                                    </IonRow>
                                    <IonRow className='ion-justify-content-center row-btn'>
                                        <IonButton className='btn-save' color='light' onClick={()=> popOverSave()}>Salvar</IonButton>
                                        <IonButton onClick={() => {
                                            setShowPopover(false)
                                            setItems([])
                                            setText('')
                                            }} color='light' className='btn-cancel'>Cancelar</IonButton>
                                    </IonRow>
                                </IonPopover>
                                <IonPopover
                                    isOpen={shownPopsave}
                                    cssClass='my-custom-class save'
                                    onDidDismiss={()=> {
                                        setShowPopover(false)
                                        setShowPopover(false)
                                    }}
                                >
                                    <IonRow  className='ion-justify-content-center'>
                                        <IonLabel style={{fontWeight:'bold', fontSize:'18px', lineHeight:'3rem'}} color='success'>Temas salvos!</IonLabel>
                                    </IonRow>
                                </IonPopover>

                                <IonInput className="input-tema" placeholder="Insira a matéria" onIonChange={e => setText(e.detail.value!)}></IonInput>
                            </IonRow>
                        </IonCardHeader>
                        <IonCardContent className="content-background">
                            <IonRow className="ios row-dissertativa">
                                <IonTextarea rows={5} cols={20} required style={{ overFlow: 'auto', overFlowY: 'scroll',height:'10.4rem',wordSpacing:'-2px!important'}} color='dark' onIonChange={e => setText(e.detail.value!)} placeholder="Digite ou cole o enunciado do flash-card"></IonTextarea>
                            </IonRow>
                        </IonCardContent>
                        <IonRow className='row-footer' color='light'></IonRow>
                    </IonCard >


                    <IonCard  className='card-dissertativa-secundary' color='light'>
                            <IonCardHeader style={{padding:0}}>
                                <IonRow color='light' className='row-header-resposta'></IonRow>
                            </IonCardHeader>
                        <IonCardContent style={{height:'9rem'}} className="content-background">
                            <IonRow className="ios row-dissertativa">
                                <IonTextarea required rows={4} cols={20} style={{ overFlow: 'auto', overFlowY: 'scroll',wordSpacing:'-2px!important' }} color='dark' onIonChange={e => setText(e.detail.value!)} placeholder="Digite ou cole a resposta"></IonTextarea>
                            </IonRow>
                        </IonCardContent>
                        <IonRow color='light' className='row-footer-resposta'></IonRow>
                    </IonCard > 

                    <IonRow className='row-toggle'>                                            
                        <IonLabel color='dark' className='label-timer' >Tempo</IonLabel>                        
                        <IonToggle className='ios toggle' onClick={()=>setShownTimer(!shownTimer)}/>
                        <IonLabel className='tooltip-text'>Opcional</IonLabel>                    
                    </IonRow>
                    <IonRow className='ios row-timer'>
                        {shownTimer && timer}
                    </IonRow>
                                 
                    <IonRow style={{marginTop:'1.7rem'}} className='ios ion-justify-content-center'>
                        <IonButton className="ios btn-criar">Criar</IonButton>
                    </IonRow>
                </IonContent>
                            
            </IonPage>
        </>
    );

}

const StyledTimer = styled(IonCol)`
    display:flex;
    flex-direction:row;
    width:auto;
    height:2rem;
    align-items: center;
    position:absolute;
`;
const Timertext = styled(IonInput)`
    text-align:center;
    color:var(--ion-color-dark);
    border-radius:16px;
    background:var(--ion-color-light);
    font-weight:bold;
    width: 3rem;
    height: -webkit-fill-available;
    --padding-start: 3px;
    --padding-end: 3px;
`;
const Timer:React.FC = ()=>{

    return(
        <>
            <StyledTimer>
                <IonIcon className='icon-styled' icon={timerOutline} />
                <Timertext placeholder='00:00'></Timertext>
            </StyledTimer>
        </>
    );
}

export default QuestaoDissertativa;