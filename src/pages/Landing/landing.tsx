import React, { useState } from 'react';
import {
IonPage,
IonHeader,
IonToolbar,
IonTitle,
IonContent,
IonItem,
IonLabel,
IonCard,
IonCardContent,
IonButton,
IonRow,
IonGrid,
IonInput,
IonCol,
IonImg
} from '@ionic/react';
import './style.css'
import ReactCardFlip from 'react-card-flip';
import logo from '../../Assets/palavra-logo1.png'

const Landing: React.FC = ()=>{
const [isFlipped, setIsflipped] = useState(false);
const handleClick = ()=>{
    setIsflipped(!isFlipped)
}
    return(
        <IonPage className="landing">
            <IonImg className='logo' alt='logo' src={logo}></IonImg>
            <IonContent >
                <IonGrid>
                <IonRow  className="ion-justify-content-center ion-margin-top">
                    <IonCard className='card' color='light'>
                        <IonCardContent ></IonCardContent>
                    </IonCard>
                </IonRow>
                <IonRow className="ion-justify-content-center">
                    <ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal' flipSpeedBackToFront={3} flipSpeedFrontToBack={3}>
                        <IonCard className='card-form' color='light'>
                            <IonCardContent>
                                <IonRow className="ion-align-items-center row">
                                    <IonCol>
                                        <IonButton
                                        onClick={handleClick} 
                                        size="small" color='dark' 
                                        className='ion-margin btn-style-dark'
                                        >Login</IonButton>
                                    </IonCol>
                                    <IonCol>
                                        <IonButton
                                        onClick={handleClick} 
                                        size="small" 
                                        color='primary' 
                                        className='ion-margin btn-style-light'
                                        >Cadastro</IonButton>
                                    </IonCol>
                                </IonRow>
                            </IonCardContent>
                        </IonCard>
                        <IonCard className='card-form'color='light'>
                            <IonCardContent>
                                <IonRow className="ion-align-items-center row">
                                        <IonCol>
                                            <IonButton 
                                            onClick={handleClick} 
                                            size="small"  
                                            className='ion-margin btn-style-dark'
                                            color='dark'
                                            >Login</IonButton>
                                        </IonCol>
                                        <IonCol>
                                        <IonButton 
                                        onClick={handleClick} 
                                        size="small" 
                                        color='primary'
                                        className='ion-margin btn-style-light'
                                        >Cadastro</IonButton>
                                        </IonCol>
                                </IonRow>
                            </IonCardContent>
                        </IonCard>
                    </ReactCardFlip>
                </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}


export default Landing;