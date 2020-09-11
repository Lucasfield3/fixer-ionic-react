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
import TelaInicio from './pages/TelaApresentacao/TelaInicio';
const App: React.FC = () => {
  return (
   <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/Landing" component={Landing} exact={true} />
        <Route path="/TelaInicio" component={TelaInicio} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/Landing" />} />
      </IonRouterOutlet>
    </IonReactRouter>
   </IonApp> 
  );
};

export default App;
