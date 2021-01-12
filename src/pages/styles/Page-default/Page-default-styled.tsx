import { IonButton, IonFabButton, IonHeader, IonIcon, IonLabel, IonMenuButton, IonRow, IonSearchbar, IonToolbar } from '@ionic/react'
import React from 'react'
import styled from 'styled-components'
import { menuOutline } from 'ionicons/icons';

const LabelEmpty = styled(IonLabel)`
  font-size: 30px;
  font-weight: bold;
  color: var(--ion-color-dark);
  opacity: 0.7;
`;
export const SearchBar = styled(IonSearchbar)`
--border-radius: 6px;
--ion-color-contrast: var(--ion-color-dark)!important;
max-height: 100%;
max-width: 100%;
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