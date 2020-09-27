import React, { useState } from 'react';
import {
    IonPage,
    IonContent,
    IonCard,
    IonCardContent,
    IonButton,
    IonRow,
    IonGrid,
    IonCol,
    IonImg,
    IonAvatar
} from '@ionic/react';
import './style.css'
import logo from '../../Assets/icons/palavra-logo1.png'
import gif from '../../Assets/icons/giphy.gif'
import Login from '../Landing/forms/login'
import Cadastro from '../Landing/forms/cadastro'
import ReactCardFlip from 'react-card-flip';



const Landing: React.FC = () => {
    const [isFlipped, setIsflipped] = useState(false);
    const mystyle = {
        position: 'absolute',
        borderRadius: '21px',
        height: '15.6vh',
    } as React.CSSProperties;
    const handleClick = () => {
        setIsflipped(isFlipped)
    }
    const [cards, setCards] = useState<{}>(<Login handleClickLogin={handleClick} />)
    const [initCard] = useState<{}>(<InitCard 
        onClickLogin={()=>handleClickCadLogin(<Login handleClickLogin={handleClick} />)}
        onClickCad={()=>handleClickCadLogin(<Cadastro handleClickCad={handleClick}/>)}
        />)
    const handleClickCadLogin = (value: {}) => {
        setIsflipped(!isFlipped)
        setCards(value)
    }
    //const [visible, setVisible] = useState<boolean>(true);
    return (
        <IonPage className="landing">
            <IonContent className='control-over' >
                <IonGrid>
                    <IonRow className="ion-justify-content-center">
                        <div className='img'>
                            <IonImg className='img-logo' slot='start' alt='logo' src={logo}></IonImg>
                        </div>
                    </IonRow>
                    <IonRow className="ion-justify-content-center ion-margin-top">
                        <IonCard className='ios card' color='light'>
                            <IonCardContent style={{padding:0}} className="ion-align-self-center ion-justify-content-center ion-content-gif" >
                                <div className='content-gif' >
                                    <div className='gif'>
                                        <IonAvatar className='shape-gif'>
                                            <IonImg src={gif} alt='gif' style={mystyle} />
                                        </IonAvatar>
                                    </div>
                                </div>
                            </IonCardContent>
                        </IonCard>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                    <ReactCardFlip isFlipped={isFlipped}  flipDirection='horizontal' flipSpeedBackToFront={1.1} flipSpeedFrontToBack={1.1}>
                            {initCard}
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

const InitCard: React.FC<{onClickLogin:()=>void; onClickCad:()=>void}> = props=>{

    return(
        <>
        <IonCard id='init-card' className='card-form' color='light'>
            <IonCardContent>
                <IonRow className="ion-align-items-center row">
                    <IonCol className='col-btn'>
                        <IonButton
                            onClick={props.onClickLogin}
                            size="small" color='dark'
                            className='ios ion-margin btn-style-dark'
                        >Entrar</IonButton>
                    </IonCol>
                    <IonCol>
                        <IonButton
                            onClick={props.onClickCad}
                            size="small"
                            color='primary'
                            className='ios ion-margin btn-style-light'
                        >Cadastro</IonButton>
                    </IonCol>
                </IonRow>
            </IonCardContent>
        </IonCard >
        </>
    );
}
export default Landing;
//handleClickLogin={()=> {setIsflipped(isFlipped);
//setCards(<Login handleClickLogin={handleClick}/>)}}
//const gifStyle = {
    //background:`url(${gif})`,
    //backgroundRepeat:'no-repeat'

//} as React.CSSProperties;