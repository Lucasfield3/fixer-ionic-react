import styled from 'styled-components'
import {IonButton} from '@ionic/react';

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

export const ButtonDark = styled(IonButton)`
    background-color: var(--ion-color-dark);
  font-weight: bold;
  box-shadow: var(--box-shadow);
  border-radius: 7px;
  margin: 0 !important;
  margin-left: 0vh !important;
  font-size: small;
  color:var(--ion-color-primary);
`;


export const ButtonPrimary = styled(IonButton)`
  background-color: var(--ion-color-primary);
  font-weight: bold;
  box-shadow: var(--box-shadow);
  border-radius: 7px;
  margin: 0 !important;
  font-size: small;
  margin-right: 2vh !important;
`;