import React,{useRef, useState} from 'react';
import { IonCardContent, IonRow, IonCol, IonButton, IonLabel, IonInput, IonItem } from '@ionic/react';
import Button from '../styles/Button'
import '../style.css'


const Login: React.FC<{handleClickLogin:()=> void}> = props=>{
const [input, setInput] = useState<string>('')
const clickHandler= ()=>{
    setInput('')
}
    return(
        <>
        <IonCardContent className='card-content-login'>
            <IonRow className="ion-align-items-center">
                <IonCol>
                    <IonItem color='light'>
                        <IonLabel color='primary' position='floating'>Login:</IonLabel>  
                        <IonInput value={input} onChange={e=> setInput.bind(e.target)} color='dark'type='text'></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow className="ion-align-items-center login">
                <IonCol>
                    <IonItem color='light'>
                            <IonLabel color='primary' position='floating'>Senha:</IonLabel>  
                            <IonInput type='password' value={input} onChange={e=> setInput.bind(e.target)} color='dark'></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
                <IonRow className="ion-align-items-center login-row">
                    <IonCol>
                        <IonButton
                        onClick={props.handleClickLogin} 
                        size="small" 
                        color='dark' 
                        type='submit'
                        expand="block"
                        className='ion-margin btn-style-dark'
                        >Entrar</IonButton>
                    </IonCol>
                    <IonCol>
                        <Button
                        onClick={props.handleClickLogin} 
                        color='light'
                        size="small"  
                        expand="block"
                        >Cancelar</Button>
                    </IonCol>
                </IonRow>
            </IonCardContent>
        </>
    );

}
export default Login;