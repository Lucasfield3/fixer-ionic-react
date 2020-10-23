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
import questaoAlternativa from './pages/Flash-cards/Alternativa/questaoAlternativa'
import questaoDissertativa from './pages/Flash-cards/Dissertativa/questaoDisertativa'
import CardRed from './components/CardRed/cardRed';
import CardGreen from './components/CardGreen/cardGreen';
import AnswerDissertativa from './components/AnswerDissertativa/AnswerDissertativa';
import AnswerAlternativa from './components/AnswerAlternativa/AnswerAlternativa';
import StatsDissertativa from './components/Card_stats_dissertativa/statsDissertativa';
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
        <Route path="/questaoAlternativa" component={questaoAlternativa} exact={true} />
        <Route path="/questaoDissertativa" component={questaoDissertativa} exact={true} />
        <Route path="/CardRed" component={CardRed} exact={true} />
        <Route path="/CardGreen" component={CardGreen} exact={true} />
        <Route path="/AnswerDissertativa" component={AnswerDissertativa} exact={true} />
<<<<<<< HEAD
        <Route path="/AnswerAlternativa" component={AnswerAlternativa} exact={true} />
        <Route path="/StatsDissertativa" component={StatsDissertativa} exact={true} />

        




=======
>>>>>>> 2b5645bce51aa6217d5ea61cc7ef73c2d03baae0
        <Route exact path="/" render={() => <Redirect to="/Landing" />} />
      </IonRouterOutlet>
    </IonReactRouter>
   </IonApp> 
  );
};

export default App;
/**<Route path="/swiperSlide" component={swiperSlide} exact={true} /> */