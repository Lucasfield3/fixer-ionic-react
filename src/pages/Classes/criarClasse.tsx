import React, { useState } from 'react';
import {
    IonCol, 
    IonContent, 
    IonFabButton, 
    IonGrid, 
    IonIcon, 
    IonLabel, 
    IonPage, 
    IonRow, 
} from '@ionic/react'
import './style.css'
import { remove } from 'ionicons/icons';
import { useHistory } from 'react-router';
import { menuController } from '@ionic/core';
import { ButtonArrow, CardContainer, ContainerList, HeaderDefault, RowBtnCreate } from '../styles/Page-default/Page-default-styled';
import { Controller, useForm } from 'react-hook-form';
import { NewClass } from '../../services/classe.service';

const CriarClasse:React.FC = ()=>{

    const history = useHistory()
    const {register, handleSubmit, getValues, setValue} = useForm()
    const onSubmit = (data:NewClass) =>{
        console.log(data)
    }
    return(
        <>
            <IonPage>
                <HeaderDefault>
                        <ButtonArrow onClick={() => {
                                history.push('/Classes')
                                menuController.enable(true);
                                
                            }}/>
                    </HeaderDefault>
                    <IonContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <CardContainer
                            title='Adicione um Questionário'
                            refTitle={register({required:true})}
                            >
                                <IonRow>
                                    <IonGrid style={{height:'11.3rem'}} className='back-list-remove'>
                                        <IonRow className='ion-justify-content-center row-label-remove'>Selecione um Questionário</IonRow>
                                        <IonRow>
                                            <IonLabel className='list-quest'>Título Questionário</IonLabel>
                                        </IonRow>
                                    </IonGrid>
                                </IonRow>
                            </CardContainer>
                                <ContainerList style={{height:'11.5rem'}}  title='Questionário'>
                                    <IonRow>
                                        <IonGrid  className='back-list-remove'>
                                            <IonRow className='ion-justify-content-center row-label-remove'>Remover</IonRow>
                                            <IonRow>
                                                <IonCol color='dark' className="flash-cards" style={{height:'auto', width:'10rem'}}>Título questionario</IonCol>
                                                <IonFabButton  className='remove-btn' color='light'><IonIcon color='danger' icon={remove}></IonIcon></IonFabButton>
                                            </IonRow>
                                        </IonGrid>
                                    </IonRow>
                                </ContainerList>
                                <RowBtnCreate style={{marginTop: '1.7rem' }}>Criar</RowBtnCreate>
                        </form>
                    </IonContent>
            </IonPage>
        </>
    )


}

export default CriarClasse;