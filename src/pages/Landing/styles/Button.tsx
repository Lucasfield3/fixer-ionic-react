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

const BtnChangeStyle = styled(IonButton)`
    background-color: var(--ion-color-dark);
    font-weight: bold;
    box-shadow: var(--box-shadow);
    border-radius: 7px;
    margin: 0 !important;
    margin-left: 0vh !important;
    font-size: small;
`;

export const BtnChange: React.FC<{handleClickChange:()=>void}> = props =>{

    return(
        <>
            <BtnChangeStyle
            onClick={props.handleClickChange}
            size="small" 
            color='dark'
            type='submit'
            expand="block"
            className='ion-margin'
            >Entrar</BtnChangeStyle>
        </>
    );

}

export default Button;