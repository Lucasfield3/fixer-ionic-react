import React from 'react';
import styled from 'styled-components'
import {IonButton} from '@ionic/react';

const Button = styled(IonButton)`
    background-color: var(--ion-color-light)!important;
    font-weight: bold;
    color:var(--ion-color-danger);
    box-shadow: var(--box-shadow);
    border-radius: 7px;
    border: 1px solid rgba(255, 32, 110, 0.31);
    box-sizing: border-box;
    font-size: 14px;
    margin: 0 !important;
    font-size: small;
`;

export default Button;