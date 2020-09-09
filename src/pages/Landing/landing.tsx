import React, { useState} from 'react';
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
import Login from '../Landing/forms/login'
import Cadastro from '../Landing/forms/cadastro'


const Landing: React.FC = ()=>{
const [isFlipped, setIsflipped] = useState(false);

const handleClick = ()=>{
    setIsflipped(isFlipped)
}
const [cards, setCards] = useState<{}>(<Login handleClickLogin={handleClick}/>)

const handleClickCadLogin  = (value:{})=>{
    setIsflipped(!isFlipped)
    setCards(value)
}
    return(
        <IonPage className="landing">
            <IonContent className='control-over' >
                <IonGrid>
                    <IonRow className="ion-justify-content-center">
                        <div className='img'>
                            <IonImg className='img-logo' slot='start' alt='logo' src={logo}></IonImg>
                        </div>
                    </IonRow>
                <IonRow  className="ion-justify-content-center ion-margin-top">
                    <IonCard className='card' color='light'>
                        <IonCardContent ></IonCardContent>
                    </IonCard>
                </IonRow>
                <IonRow className="ion-justify-content-center">
                    <ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal' flipSpeedBackToFront={1.2} flipSpeedFrontToBack={1.2}>
                        <IonCard className='card-form' color='light'>
                            <IonCardContent>
                                <IonRow className="ion-align-items-center row">
                                    <IonCol>
                                        <IonButton
                                        onClick={()=>handleClickCadLogin(<Login handleClickLogin={handleClick}/>)}
                                        size="small" color='dark' 
                                        className='ion-margin btn-style-dark'
                                        >Entrar</IonButton>
                                    </IonCol>
                                    <IonCol>
                                        <IonButton
                                        onClick={()=>handleClickCadLogin(<Cadastro handleClickCad={handleClick}/>)}
                                        size="small" 
                                        color='primary' 
                                        className='ion-margin btn-style-light'
                                        >Cadastro</IonButton>
                                    </IonCol>
                                </IonRow>
                            </IonCardContent>
                        </IonCard >
                        <IonCard className='card-form' color='light'>
                            {cards}
                        </IonCard >
                    </ReactCardFlip>
                </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}


export default Landing;
//handleClickLogin={()=> {setIsflipped(isFlipped); 
//setCards(<Login handleClickLogin={handleClick}/>)}}