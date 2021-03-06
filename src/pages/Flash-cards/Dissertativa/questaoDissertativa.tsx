import React, { useState } from 'react';
import {
    IonPage,
    IonRow,
    IonFabButton,
    IonIcon,
    IonContent, 
    IonCol,  
    useIonViewWillLeave,
    useIonViewWillEnter,
    IonInput
} from '@ionic/react'
import {add, remove } from 'ionicons/icons';
import { menuController } from '@ionic/core';
import { useHistory } from 'react-router';
import { getPayload } from '../../../services/Authentication.service';
import { Payload, createFlashCard, NewFlashCard } from '../../../services/flashCard.service';
import {  ButtonArrow, CardQuestion, CreateAreaDissertativeAnswer, HeaderDefault, ModalChoose, ModalDefault, ModalErrorDefault, RowBtnCreate, RowTimer, Timer } from '../../styles/Page-default/Page-default-styled';
import { Controller, useForm } from 'react-hook-form';




const QuestaoDissertativa: React.FC = () => {


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory()
    const [checked, setChecked] = useState<boolean>(false);
    const [shownTimer, setShownTimer] = useState<boolean>(false);
    const [showPopover, setShowPopover] = useState<boolean>(false);
    const [shownPopsave, setShownPopsave]= useState<boolean>(false);
    const [showModal, setShowModal] = useState(false)
    const [showModal2, setShowModal2] = useState(false)
    const [time, setTime] = useState<string>(':');
    let tema = {
        id:0,
        textPop:''
    };
    const [themes, setThemes] = useState([tema]);
    const popOverSave = () => {
        setShownPopsave(true);
        setTimeout(() => {
            setShownPopsave(false);
            setShowPopover(false);
        }, 1000)
    }
    const AddTema = () => {
        const inputValue = getValues(`themes[${tema.id}].textPop`)
        setThemes([...themes, {
            id:themes.length,
            textPop: inputValue
        }
        ])
        if(inputValue == ''){
            setThemes(themes)
        }
    }
    const RemoveTema = (id: number) => {
        const themeToBedeleted = themes.filter(theme => theme.id !== id);
        setThemes(themeToBedeleted)
    }

    useIonViewWillEnter(() => {

        setThemes([])

    }, [])

    useIonViewWillLeave(()=>{
        CleanInputs()
        menuController.enable(true)
    }, [])

    const CleanInputs = () => {
        setValue('enunciated', '')
        setValue('title', '')
        setValue('subject', '')
        setValue('answerFlashCard', '')
        setTime('')
        setThemes([])
        let dinamicChecked = checked == true && false || false
        setChecked(dinamicChecked)
        setShownTimer(dinamicChecked)
    }
  
    const convertTime = () => {
        const [minutes, seconds] = time.split(':').map(Number)
        const timeInSeconds = (minutes * 60) + seconds
        return timeInSeconds * 1000

    }



    const {register, handleSubmit, setValue, getValues, errors, control} = useForm()

    const onSubmit = async (data:NewFlashCard) => {
        const payLoad = getPayload() as Payload
        const themesSend = [] as string[]
        themes.map(textTheme =>{
            themesSend.push(textTheme.textPop)
        })
        data.creator = payLoad.id
        data.time = convertTime()
        data.themes = themesSend
        if(convertTime() < 10000 && checked == true){

            setIsOpen(true)
        }else{
            await createFlashCard(data)
            setShowModal(true)
        }
        
    }

    const [isOpen, setIsOpen] = useState(false)

    const MsgsAndErrors = ()=>{

        if(errors.enunciated && errors.title && errors.answerFlashCard ||
            errors.enunciated && errors.title ||
            errors.enunciated && errors.answerFlashCard ||
            errors.answerFlashCard && errors.title
            ){
            return 'Campos inválidos.'
        }else if(errors.enunciated){
            return 'Enunciado inválido.'
        }else if(errors.title){
            return 'Título inválido.'
        }else if(errors.answerFlashCard){
            return 'Resposta inválida.'
        }else if(convertTime() < 10000 && checked == true){
            return 'Tempo muito curto.' 
        }
       
    }
    const Errors = ()=>{

        if(errors.enunciated && errors.title && errors.answerFlashCard ||
            errors.enunciated && errors.title ||
            errors.enunciated && errors.answerFlashCard ||
            errors.answerFlashCard && errors.title
            ){
            setIsOpen(true)
        }else if(errors.enunciated){
            setIsOpen(true)
        }else if(errors.title){
            setIsOpen(true)
        }else if(errors.answerFlashCard){
            setIsOpen(true)
        }
    }
  

   
    return (
        <>
            <IonPage>
                <HeaderDefault>
                    <ButtonArrow onClick={() => {
                            history.push('/Flash-cards')
                            menuController.enable(true);
                            setThemes([])
                            setChecked(false)
                            setShownTimer(false)
                        }}/>
                </HeaderDefault>
                <IonContent>
                    <form onSubmit={handleSubmit(onSubmit)}>

                    <CardQuestion
                        onClickTheme={() => setShowPopover(true)}
                        isOpenThemes={showPopover}
                        onDidDismissTheme={e => setShowPopover(false)}
                        onClickSaveBtn={() => popOverSave()}
                        onClickCleanBtn={() => {
                            setShowPopover(false)
                            setThemes([])
                        }}
                        isOpenSaveTheme={shownPopsave}
                        onDidDismissSave={() => {
                            setShowPopover(false)
                            setShowPopover(false)
                        }}
                        refEnunciated={register({required:true})}
                        refSub={register({required:false})}
                        refTitle={register({required:true})}
                        onChangeEnun={()=> {}}
                        onChangeSubj={()=> {}}
                        onChangeTitle={()=> {}}
                    >
                    <IonRow className='ion-justify-content-center'>
                        <IonInput maxlength={100} className='ios add-temas' placeholder='Tema' color='dark' name={`themes[${tema.id}].textPop`} ref={register({required:false})}   type='text'></IonInput>
                        <IonFabButton className='add-btn' onClick={() => {
                            AddTema()
                            setValue(`themes[${tema.id}].textPop`, '')
                        }} color='light'><IonIcon color='success' icon={add}></IonIcon></IonFabButton>
                    </IonRow>
                    {themes.map((theme, index) => (
                            <IonRow key={index} style={{ cursor: 'default', marginTop: '1rem'}} className='ion-justify-content-center'>
                                <Controller as={<IonInput key={index} className='ios temas-inputs'  disabled  color='dark'></IonInput>} 
                                name={`themes[${index}].textPop`}
                                control={control}
                                defaultValue={theme.textPop}
                                />
                                <IonFabButton onClick={() => RemoveTema(theme.id)} className='remove-btn' color='light'><IonIcon color='danger' icon={remove} ></IonIcon></IonFabButton>
                            </IonRow>
                        ))}
                    </CardQuestion>
                    <ModalDefault
                        isOpen={showModal}
                        onClickNo={() => {
                            setShowModal(false)
                            history.push('Flash-cards')
                            menuController.enable(true)
                        }}
                        onClickYes={() => {
                            setShowModal2(true)
                            setShowModal(false)
                        }}
                        msg='Deseja criar mais um flashcard?'
                        cssClass='ios modal-criar'
                        />
                        <ModalErrorDefault 
                        cssClass='ios modal-error-flash' 
                        backdropDismiss={true} 
                        msg={MsgsAndErrors()!} 
                        color='danger' 
                        onDidDismiss={()=> setIsOpen(false)} 
                        isOpen={isOpen} 
                        onClick={()=> {
                            setIsOpen(false)
                        }}/>
                        <ModalChoose
                            isOpen={showModal2}
                            onClickAlt={() => {
                                setShowModal2(false)
                                setShowModal(false)
                                history.push('/questaoAlternativa')
                            }}
                            onClickDiss={() => {
                                setShowModal2(false)
                                setShowModal(false)
                                CleanInputs()
                                history.push('/questaoDissertativa')
                            }}
                        />

                        <CreateAreaDissertativeAnswer         
                        refAnswer={register({required:true})}
                        />

                        <RowTimer 
                        onIonChange={(e) => setChecked(e.detail.checked)}
                        onClick={() => {
                            setShownTimer(!shownTimer)
                            setTime('')
                        }}
                        checked={checked}
                        style={{}}
                        >
                           {shownTimer && <Timer  value={time} onChange={(event) => setTime(event.target.value!)} />}
                        </RowTimer>
                        <RowBtnCreate onClick={()=> Errors()} style={{marginTop: '1.7rem' }} >Criar</RowBtnCreate>
                    </form>
                </IonContent>

            </IonPage>
        </>
    );

}

export default QuestaoDissertativa;


