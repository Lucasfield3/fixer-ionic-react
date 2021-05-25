import styled from 'styled-components'
import {IonBackdrop, IonButton, IonCard, IonCardContent, IonLabel, IonRow} from '@ionic/react';
import React from 'react';
import '../style.css';

export const ButtonRed = styled(IonButton)`
    background-color: var(--ion-color-light)!important;
    font-weight: bold;
    color:#F6F7F8;
    box-shadow: var(--box-shadow);
    border-radius: 7px;
    border: 1px solid rgba(255, 32, 110, 0.31);
    box-sizing: border-box;
    font-size: 14px;
    margin: 0 !important;
    font-size: small;
`;

export const ButtonLight = styled(IonButton)`
    background-color: var(--ion-color-dark);
  font-weight: bold;
  box-shadow: var(--box-shadow);
  border-radius: 7px;
  margin: 0 !important;
  margin-left: 0vh !important;
  font-size: small;
  color:var(--ion-color-primary);
`;
export const CardContainer = styled(IonCard)`
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(1, 22, 39, 0.29);
    width: 95%;
    height: 25vh;
    margin-bottom: 1rem;
    border-radius: 5px;
`;
const CardContent = styled(IonCardContent)`
  display: flex;
  text-align: center;
  justify-content: center;
`;
export const BtnSideMenu = styled(IonButton)`
   margin:12px!important;
  width: 6.5rem;
  height: 1.6rem;
  --border-radius: 7px;
  font-size: 11px!important;
  --ion-color-light-contrast:var(--ion-color-dark);
  font-weight: bold;
  box-sizing: border-box;
  box-shadow: var(--box-shadow);
`
export const ContainersHome:React.FC<{style: React.CSSProperties }> = props =>{

  return(
    <>
      <CardContainer  style={props.style}>
        <CardContent>
            {props.children}
        </CardContent>
      </CardContainer>
    </>
  );

}
export const BtnHome: React.FC<{ backHome: () => void }> = props => {
  return (
    <>
      <IonRow >
        <BtnSideMenu fill='solid' onClick={props.backHome} color="light">Início</BtnSideMenu>
      </IonRow>
    </>
  );
}

export const BackDrop: React.FC<{ changeBack: () => void }> = props => {
  return (
    <>
      <IonBackdrop onIonBackdropTap={props.changeBack} visible={true} tappable={true} stopPropagation={true}>
      </IonBackdrop>
    </>
  );
}
