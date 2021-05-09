import React, {  useState } from 'react';
import {
    IonPage,
    IonRow,
    IonFabButton,
    IonIcon,
    IonContent,
    IonCol,
    useIonViewWillLeave,
    useIonViewWillEnter,
    IonTextarea,
    IonInput,
} from '@ionic/react'
import { add, remove } from 'ionicons/icons';
import { menuController } from '@ionic/core';
import { useLocation, useHistory } from 'react-router-dom';
import { createFlashCard, Payload,  NewAlternative, NewFlashCard } from '../../../services/flashCard.service';
import { getPayload } from '../../../services/Authentication.service';
import Limitedalternativa from '../../../components/CardMessages/msg_limite_alternativa';
import { ButtonArrow, CardQuestion, GridAlternatives, HeaderDefault, ModalChoose, ModalDefault, ModalErrorDefault, RowBtnCreate, RowTimer, Timer } from '../../styles/Page-default/Page-default-styled';
import { Alternative } from '../../../services/Questionnaires.service';
import { Controller, useForm } from 'react-hook-form';


interface ListThemes {
    textPop:string
}



const QuestaoAlternativa: React.FC = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    
    const [checked, setChecked] = useState<boolean>(false);
    const [shownTimer, setShownTimer] = useState<boolean>(false);
    const [showPopover, setShowPopover] = useState<boolean>(false);
    const [showPopLimit, setShowPopLimit] = useState<boolean>(false);
    const [shownPopsave, setShownPopsave] = useState<boolean>(false);
    const [showModal, setShowModal] = useState(false)
    const [showModal2, setShowModal2] = useState(false)
    const history = useHistory()
    const [textRightAnswer, setTextRightAnswer] = useState<string>('')
    const [time, setTime] = useState<string>(':');
    const [enunciated, setEnunciated] = useState<string>('')
    const [subject, setSubject] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    let newAlternative:NewAlternative= {
        answer:''
    }
    const [alternatives, setAlternatives] = useState<NewAlternative[]>([newAlternative]);

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
        console.log(themes)
    }
    const RemoveTema = (id: number) => {
        const themeToBedeleted = themes.filter(theme => theme.id !== id);
        setThemes(themeToBedeleted)
    }

    const AddAlternative = () => {
        const inputValue = getValues(`alternatives[${newAlternative.answer}].answer`)
        setAlternatives([...alternatives, { answer: inputValue }])
        console.log(inputValue)
        if (alternatives.length == 4 || inputValue === '') {
            setAlternatives(alternatives)
        }
    }
    
    const RemoveAlternative = (index:number) =>{
        setAlternatives([...alternatives.slice(0, index), ...alternatives.slice(index + 1)])
    }

    useIonViewWillEnter(() => {
        setThemes([])
        setAlternatives([])
    }, [])
    useIonViewWillLeave(() => {
        menuController.enable(true)
        CleanInputs()
        
    }, [])
    const CleanInputs = () => {
        setValue('enunciated', '')
        setValue('title', '')
        setValue('subject', '')
        setValue('answerFlashCard', '')
        setTime('')
        setAlternatives([])
        setThemes([])
        let dinamicChecked = checked == true && false || false
        setChecked(dinamicChecked)
        setShownTimer(dinamicChecked)
    }
    const convertTime = () => {
        const [minutes, seconds] = time.split(':').map(Number)
        const timeInSeconds = (minutes * 60) + seconds
        console.log(time)
        console.log(timeInSeconds * 1000)
        return timeInSeconds * 1000

    }

    const ShuffleAlternativas = ( alternativesSend: NewAlternative[]) => {

        for(let i =  alternativesSend.length -1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            const temp =  alternativesSend[i];
             alternativesSend[i] =  alternativesSend[j];
             alternativesSend[j] = temp;
        }
        return  alternativesSend;
    }

    const { register, handleSubmit, errors, setValue, getValues, control} = useForm()
    const onSubmit = async (data:NewFlashCard) => {
        const payLoad = getPayload() as Payload
        const alternativesSend = [] as NewAlternative[]
        const themesSend= [] as string[]
        themes.map(textTheme=>{
            themesSend.push(textTheme.textPop)
        })
        alternatives.map(a=>{
            alternativesSend.push({answer: a.answer})
        })
        const rightAnswer = getValues('answerFlashCard')
        alternativesSend.push({answer: rightAnswer})
        data.time = convertTime()
        data.themes = themesSend
        data.alternatives = alternativesSend
        data.creator = payLoad.id
        ShuffleAlternativas(alternativesSend)
        if(convertTime() < 10000 && checked == true){
            setIsOpen(true)
        }else if(alternatives.length == 0){
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
        }else if(alternatives.length == 0){
            return 'Numero insuficiênte de alternativas.'
        } else if(convertTime() < 10000 && checked == true){
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
        }else if(alternatives.length == 0){
            setIsOpen(true)
        }
  
    }
  
    return (
        <>
            <IonPage>
                <HeaderDefault>
                    <ButtonArrow onClick={() => {
                        history.push('/Flash-cards')
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
                        refEnunciated={register({required:true, minLength:10})}
                        refSub={register({required:false, minLength:5, maxLength:50})}
                        refTitle={register({required:true, minLength:5, maxLength:50})}
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


                        <ModalChoose
                            isOpen={showModal2}
                            onClickAlt={() => {                       
                                setShowModal2(false)
                                CleanInputs()
                                history.push('/questaoAlternativa')
                            }}
                            onClickDiss={() => {                             
                                setShowModal2(false)
                                history.push('/questaoDissertativa')
                            }}
                        />


                            <GridAlternatives
                            onIonChange={()=> {}}
                            styleGrid={{}}                         
                            style={{height: textRightAnswer.length == 0 && '4rem' || 'auto'}}
                            refAlternatives={register({required:true, minLength:1, maxLength:100})}
                            refAnswer={register({required:true, minLength:1, maxLength:100})}
                            autoGrow={textRightAnswer == '' && false || true}
                            nameAnswerFlashCard='answerFlashCard'
                            >
                                <IonRow  className='ion-justify-content-center'>
                                    <IonTextarea  className='ios add-alternativas'  
                                    placeholder='Insira a/as alternativas' 
                                    color='dark' ref={register({required:false})} 
                                    name={`alternatives[${newAlternative.answer}].answer`}>                         
                                    </IonTextarea>
                                    <IonFabButton id='add-alternative' className='add-btn'  onClick={()=>{
                                        AddAlternative()
                                        console.log(newAlternative.answer)
                                        setValue(`alternatives[${newAlternative.answer}].answer`, '')
                                    }} color='light'><IonIcon color='success' icon={add}></IonIcon></IonFabButton>
                                </IonRow>
                                {alternatives.map((alternative:NewAlternative, index)=>(
                                     <IonRow key={index} style={{cursor:'default', marginTop:'1rem'}}  className='ion-justify-content-center colunas'>
                                        <Controller as={<IonInput style={{height:'auto', width:'10rem'}} disabled key={index} className='alternativas' color='dark'  placeholder='alternativas'></IonInput>} 
                                        name={`alternatives[${alternative.answer}].answer`}
                                        defaultValue={alternative.answer}
                                        control={control}
                                        />
                                        <IonFabButton  onClick={()=>RemoveAlternative(index)} className='remove-btn'  color='light'><IonIcon color='danger' icon={remove} ></IonIcon></IonFabButton>              
                                    </IonRow>
                                ))}       
                            </GridAlternatives>
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
                    </form>            
                    
                </IonContent>

            </IonPage>
        </>
    );

}


export default QuestaoAlternativa;