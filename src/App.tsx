import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import Landing from './pages/Landing/landing';
import { IonApp, IonRouterOutlet} from '@ionic/react';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Home from './pages/Home/home';
import FlashCards from './pages/Flash-cards/flashCards';
import Questionarios from './pages/Questionarios/questionarios';
import Conquistas from './pages/Conquistas/conquistas';
import Classes from './pages/Classes/classes'
import QuestaoAlternativa from './pages/Flash-cards/Alternativa/questaoAlternativa'
import QuestaoDissertativa from './pages/Flash-cards/Dissertativa/questaoDisertativa'
import CardRed from './components/CardRed/cardRed';
import CardGreen from './components/CardGreen/cardGreen';
import AnswerDissertativa from './components/AnswerDissertativa/AnswerDissertativa';
import AnswerAlternativa from './components/AnswerAlternativa/AnswerAlternativa';
import CardStats from './components/Card_stats_result/cardStats';
import Emailcadastrado from './components/CardMessages/msg_email_cadastrado';
import Emailinvalid from './components/CardMessages/msg_email_invalid';
import Userexists from './components/CardMessages/msg_user_exists';
import DiferentPassword from './components/CardMessages/msg_diferent_password';
import DivergentPassword from './components/CardMessages/msg_divergent_password';
import Passwordlimited from './components/CardMessages/msg_password_limited';
import Passwordcaracteres from './components/CardMessages/msg_password_caracteres';
import Classcreate from './components/CardMessages_Create/msg_class_create';
import Alteracaosucess from './components/CardMessages_Create/msg_alteracao_sucess';
import Limitedissertativa from './components/CardMessages/msg_limite_dissertativa';
import Limitedalternativa from './components/CardMessages/msg_limite_alternativa';
import Limitedenunciado from './components/CardMessages/msg_limite_enunciado';
//import swiperSlide from './components/Swiper/swiperSlide';
const App: React.FC = () => {
  return (
   <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/Landing" component={Landing} exact={true} />
        <Route path="/Home" component={Home} exact={true} />
        <Route path="/Questionarios" component={Questionarios} exact={true} />
        <Route path="/Flash-cards" component={FlashCards} exact={true} />
        <Route path="/Classes" component={Classes} exact={true} />
        <Route path="/Conquistas" component={Conquistas} exact={true} />
        <Route path="/QuestaoAlternativa" component={QuestaoAlternativa} exact={true} />
        <Route path="/QuestaoDissertativa" component={QuestaoDissertativa} exact={true} />
        <Route path="/CardRed" component={CardRed} exact={true} />
        <Route path="/CardGreen" component={CardGreen} exact={true} />
        <Route path="/AnswerDissertativa" component={AnswerDissertativa} exact={true} />
        <Route path="/AnswerAlternativa" component={AnswerAlternativa} exact={true} />
        <Route path="/CardStats" component={CardStats} exact={true} />
        <Route path="/Emailcadastrado" component={Emailcadastrado} exact={true} />
        <Route path="/Emailinvalid" component={Emailinvalid} exact={true} />
        <Route path="/Userexists" component={Userexists} exact={true} />
        <Route path="/DiferentPassword" component={DiferentPassword} exact={true} />
        <Route path="/DivergentPassword" component={DivergentPassword} exact={true} />
        <Route path="/Passwordlimited" component={Passwordlimited} exact={true} />
        <Route path="/Passwordcaracteres" component={Passwordcaracteres} exact={true} />
        <Route path="/Classcreate" component={Classcreate} exact={true} />
        <Route path="/Alteracaosucess" component={Alteracaosucess} exact={true} />
        <Route path="/Limitedissertativa" component={Limitedissertativa} exact={true} />
        <Route path="/Limitedalternativa" component={Limitedalternativa} exact={true} />
        <Route path="/Limitedenunciado" component={Limitedenunciado} exact={true} />


        <Route exact path="/" render={() => <Redirect to="/Landing" />} />
      </IonRouterOutlet>
    </IonReactRouter>
   </IonApp> 
  );
};

export default App;
/**<Route path="/swiperSlide" component={swiperSlide} exact={true} /> */

//<Route path="/CardRed" component={CardRed} exact={true} />