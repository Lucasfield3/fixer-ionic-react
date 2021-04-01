import { 
    useIonViewWillEnter, 
    useIonViewWillLeave, 
    IonPage, 
    IonHeader, 
    IonToolbar, 
    IonRow, 
    IonLabel, 
    IonFabButton, 
    IonIcon, 
    IonButton, 
    IonMenuButton, 
    IonContent, 
    IonItem, 
    IonInput, 
    IonCard, 
    IonCardHeader, 
    IonPopover, 
    IonGrid, 
    IonCol, 
    IonCardContent, 
    IonTextarea, 
    IonModal, 
    IonCardTitle, 
    IonText, 
    IonCardSubtitle, 
    IonToggle 
} from '@ionic/react';
import {  add, remove, } from 'ionicons/icons';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import Limitedalternativa from '../../../components/CardMessages/msg_limite_alternativa';
import { getPayload } from '../../../services/Authentication.service';
import { NewAlternative, Payload, createFlashCard, NewFlashCard } from '../../../services/flashCard.service';
import { menuController } from '@ionic/core';
import { useForm, Controller } from 'react-hook-form';
import { HeaderDefault, ButtonArrow, CardQuestion, ModalDefault, ModalChoose, GridAlternatives, RowTimer, Timer, RowBtnCreate } from '../../styles/Page-default/Page-default-styled';




const CriarAlternativaQuest:React.FC = ()=>{
    
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const history = useHistory()
  const [checked, setChecked] = useState<boolean>(false);
  const [shownTimer, setShownTimer] = useState<boolean>(false);
  const [showPopover, setShowPopover] = useState<boolean>(false);
  const [showPopLimit, setShowPopLimit] = useState<boolean>(false);
  const [shownPopsave, setShownPopsave] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false)
  const [showModal2, setShowModal2] = useState(false)

  const [textRightAnswer, setTextRightAnswer] = useState<string>('')
  const [time, setTime] = useState<string>(':');

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
      setChecked(false)
  }, [])
  const CleanInputs = () => {
      setValue('enunciated', '')
      setValue('title', '')
      setValue('subject', '')
      setValue('answerFlashCard', '')
      setTime('')
      setAlternatives([])
      setThemes([])
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
      console.log(data)
      await createFlashCard(data)
      setShowModal(true)
  }

  return (
    <>
        <IonPage>
            <HeaderDefault>
                <ButtonArrow onClick={() => {                      
                        history.push('CriarQuestionario')
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
                        history.push('CriarQuestionario')
                        menuController.enable(true)
                    }}
                    onClickYes={() => {
                        setShowModal2(true)
                    }}
                    msg='Deseja criar mais um flashcard?'
                    cssClass='ios modal-criar'
                    />


                    <ModalChoose
                        isOpen={showModal2}
                        onClickAlt={() => {
                            setShowModal2(false)
                            setShowModal(false)
                            CleanInputs()
                            setChecked(false)
                            setShownTimer(false)
                            history.push('/CriarAlternativaQuest')
                        }}
                        onClickDiss={() => {
                            setShowModal2(false)
                            setShowModal(false)
                            CleanInputs()
                            history.push('/CriarDissertativaQuest')
                        }}
                    />


                        <GridAlternatives                         
                        style={{height: textRightAnswer == '' && '4rem' || 'auto'}}
                        refAlternatives={register({required:true})}
                        refAnswer={register({required:true})}
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
                        >
                            {shownTimer && <Timer  value={time} onChange={(event) => setTime(event.target.value!)} />}
                        </RowTimer>
                    <Limitedalternativa
                        onClick={() => setShowPopLimit(false)}
                        isOpen={showPopLimit}
                        onDidDismiss={() => setShowPopLimit(false)} />
                    <RowBtnCreate>Criar</RowBtnCreate>
                </form>
            </IonContent>

        </IonPage>
    </>
);

}


export default CriarAlternativaQuest