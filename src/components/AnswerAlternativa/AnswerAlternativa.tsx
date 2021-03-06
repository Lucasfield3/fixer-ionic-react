import React, { useState } from 'react';
import {
    IonPage,
    IonRow,
    IonContent, 
    IonCol, 
    IonGrid, 
    useIonViewWillEnter, 
    useIonViewWillLeave,
    IonInput,
    IonLabel
} from '@ionic/react'
import './styles.css'
import { useHistory } from 'react-router';
import CardStats from '../Card_stats_result/cardStats';
import { Alternative, Checker, FlashCard, getCheck } from '../../services/flashCard.service';
import CardRed from '../cardRed/cardRed';
import CardGreen from '../CardGreen/cardGreen';
import { menuController } from '@ionic/core';
import { AreaFlip, FinalBtn, HeaderAnswerDefault, ModalDefault, Redone } from '../../pages/styles/Page-default/Page-default-styled';
import {Controller, useForm} from 'react-hook-form'




const AnswerAlternativa: React.FC = () => {

    const history = useHistory()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showPopover, setShowPopover] = useState<boolean>(false);
    const [shownPopsair, setShownPopsair] = useState<boolean>(false);
    const [shownPopResult, setShownPopResult] = useState<boolean>(false);
    const [, setShownIcon] = useState(false)
    const [isFlipped, setIsFlipped] = useState<boolean>(false);
    const [alternatives, setAlternatives] = useState<Alternative[]>()
    const [idFlashCard, setIdFlashCard] = useState<string>('')
    const [progress, setProgress] = useState<number>(0)
    const [time, setTime] = useState<number>();
    const [seconds] = useState('')
    const [minutes] = useState('')
    const [cardRed] = useState(<CardRed/>)
    const [check, setCheck] = useState<Checker>({
        answer: 'resposta-certa',
        correct: false
    })

  
    const [activeAlternative, setActiveAlternative] = useState<Alternative>({
        id: '123',
        answer: 'alternativa-ativada'
    })
    const [className, setClassName] = useState({
        id: -1,
        active: false,
    })
    const letras = ['a', 'b', 'c', 'd', 'e']
    const [themes, setThemes] = useState<string[]>([]);
    const [showLoading, setShowLoading] = useState(true);

    const settingLoading = () => {
        setTimeout(() => {
            setShowLoading(false);
            setIsFlipped(true)
        }, 1500);
    }
    useIonViewWillLeave(() => {
        menuController.enable(true)
    }, [])
    useIonViewWillEnter(() => {
        
        enableAlternatives()
        setClassName({
            id: -1,
            active: false
        })
        setShowLoading(false)
        setIsFlipped(false)
        if (history.location.state) {
            const card = history.location.state as FlashCard
            setValue('subject' ,card.subject)
            setThemes(card.themes)
            setValue('enunciated' ,card.enunciated)
            setAlternatives(card.alternatives)
            setIdFlashCard(card.id!)
            setTime(card.time!)
            setValue('title' ,card.title)
        } else {
            console.log('Não tem nada');
        }
    }, [])
    const removeActive = () => {
        setClassName({
            id: -1,
            active: false
        })
    }

    const handleSelectAlternative = (alternative: Alternative, index: number) => {
        alternatives?.forEach(() => {
            setClassName({
                id: index,
                active: !className.active
            })
        })
        setShownIcon(true)
        setActiveAlternative(alternative)

    }

    const handleFlipAnswer = async () => {
        let checker = await getCheck(idFlashCard, activeAlternative.answer)
        ProgressBar(checker)
        DinamicLevel()
        setCheck(checker)
        disableAlternatives()

    }

    const disableAlternatives = () => {
        const eventAlternativas = document.querySelector('.array-div') as HTMLIonGridElement
        eventAlternativas.style.pointerEvents = 'none'
    }
    const enableAlternatives = () => {
        const eventAlternativas = document.querySelector('.array-div') as HTMLIonGridElement
        eventAlternativas.style.pointerEvents = 'auto'
    }
    const mystyle = {
        display: check!.correct && 'none' || 'block',
    }
    const ProgressBar = (validator:Checker)=>{
        var progressNumber:string
        if(validator.correct == true && (1 - progress) == 0.20 ){
            setProgress(1)
        }
        if(validator.correct == true && (1 - progress) < 0.20 ){
            setProgress(1)
            if(progress == 1){
                progressNumber = ((1 - progress) + (0.20 - (1 - progress))).toFixed(2)
            setProgress(parseFloat(progressNumber))
            }          
        }else if(validator.correct == true && (1 - progress) > 0.20 ){
            progressNumber = (progress + 0.20).toFixed(2)
            setProgress(parseFloat(progressNumber))
        }else if(validator.correct == false && progress == 0){
            setProgress(0)  
        }else if(validator.correct == false && progress >= 0.20 || progress <= 0.20){
            progressNumber = (progress - 0.10).toFixed(2)
            setProgress(parseFloat(progressNumber))
        }
     }

 
    const {register, setValue, getValues, control} = useForm()
    const [actualLevel, setActualLevel] = useState(0)
    const [nextLevel, setNextLevel] = useState(1)  

     const DinamicLevel = ()=>{
        var nextLevelNumber:number = actualLevel + 1
        if(progress >= 0.9){
            nextLevelNumber ++
            setActualLevel(actualLevel + 1)
            setNextLevel(nextLevelNumber)
        }
        if(progress == 0 && actualLevel !== 0){
            setActualLevel(actualLevel - 1)
            setNextLevel(actualLevel - 1)
        }

     }

    return (
        <>
            <IonPage>

               <HeaderAnswerDefault actualLevel={actualLevel} nextLevel={nextLevel} onClickPopSair={()=>setShownPopsair(true)} valueprogressBar={progress} refTitle={register({required:true})} defaultValueTitle={getValues('title')}/>

                <IonContent>
                    <ModalDefault
                        isOpen={shownPopsair}
                        onClickYes={() => {
                            setShownPopsair(false)
                            history.push('/Flash-cards')
                            removeActive()
                            enableAlternatives()
                        }}
                        onClickNo={() => setShownPopsair(false)}
                        msg='Deseja mesmo sair?'
                        cssClass='ios modalSair'
                    />

                    <IonCol style={{display: time === 0 && 'none' || 'block'}} className='timer-flashcard' >
                        {parseInt(minutes) < 10 && '0'}{minutes}:{parseInt(seconds) < 10 && '0'}{seconds}
                    </IonCol>
                   <AreaFlip
                   isFlipped={isFlipped}
                   onClickPopTheme={() => setShowPopover(true)}
                   isOpen={showPopover}
                   onDidDismissPopTheme={e => setShowPopover(false)}
                   onClickClosePop={()=> setShowPopover(false)}
                   refEnunciated={register({required:true})}
                   defaultValueEnunciated={getValues('enunciated')}
                   refSubj={register({required:true})}
                   defaultValueSubj={getValues('subject')}
                   style={{ display: className.active && 'block' || 'none', opacity: showLoading == true && 0 }}
                   onClickArrowFlip={() => {
                    setShowLoading(!showLoading)
                    handleFlipAnswer()
                    settingLoading()
                    disableAlternatives()
                    }}
                    isOpenLoadig={showLoading}
                    card={check!.correct && <CardGreen textRightAnswer={check.answer} /> || cardRed}
                   >
                    {themes.map((theme: string, index) => (
                         <IonRow key={index - 1} style={{ cursor: 'default', marginTop: '1rem'}} className='ion-justify-content-center'>
                         <Controller as={<IonInput key={index}  className='ios temas-inputs'  color='dark'></IonInput>} 
                         name={`themes[${index}].textPop`}
                         control={control}
                         defaultValue={theme}
                         />
                     </IonRow>
                    ))}
                   </AreaFlip>


                    <IonGrid key={alternatives?.length} style={{ pointerEvent: isFlipped && 'unset' || 'auto' }} className='array-div'>
                        {alternatives?.map((alternative: Alternative, i) => (
                            
                            <IonRow key={i + 1} style={{ cursor: 'default', marginTop: '1rem', alignItems:'center'}} className='ion-justify-content-center'>
                                <IonCol key={i} onClick={() => handleSelectAlternative(alternative, i)} size='1' className={(i === className.id && className.active) && 'active-letras' || 'letras-alternativas'}> {letras[i]}</IonCol>
                                <Controller as={<IonInput onClick={() => handleSelectAlternative(alternative, i)}
                                    style={{ height: 'auto', width: '10rem' }}
                                    key={alternative.id}
                                    disabled
                                    className={(i === className.id && className.active) && 'ios active' || 'ios alternativas-respostas'}
                                    color='dark'><IonLabel style={{paddingLeft:'0.5rem'}}>{alternative.answer}</IonLabel></IonInput>} 
                                    control={control}
                                    name={`alternatives[${i}].answer`}
                                    
                                />
                            </IonRow>
                        ))}
                    </IonGrid>
                    <FinalBtn
                    onClick={() => setShownPopResult(true)}
                    disabled={isFlipped == false && true}
                    />
                    <CardStats
                        backdropDismiss={false}
                        isOpen={shownPopResult}
                        onClickSair={() => {
                            removeActive()
                            setShownPopResult(false)
                            history.push('/Flash-cards')
                            setIsFlipped(!isFlipped)
                        }}
                        textConquista=''
                        textCorrect=''
                        textExp=''
                        textTotal=''
                        condition={check!.correct}
                    >
                       {check!.correct && '' || <Redone style={mystyle} onClick={() => {
                            enableAlternatives()
                            removeActive()
                            setShownPopResult(false)
                            setIsFlipped(false)
                        }} />}
                    </CardStats>
                </IonContent>

            </IonPage>
        </>
    );

}
export default AnswerAlternativa

