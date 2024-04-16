import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { calculatorOutline, ellipse, homeOutline, nuclearOutline, personCircleOutline, square, triangle } from 'ionicons/icons';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ClickCounter from './pages/ClickCounter';
import Calculator from './pages/Calculator';

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


setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
        <Route exact path="/Home">
            <Home />
          </Route>
          <Route exact path="/Profile">
            <Profile />
          </Route>
          <Route exact path="/Click Counter">
            <ClickCounter />
          </Route>
          <Route path="/Calculator">
            <Calculator />
          </Route>
          <Route exact path="/">
            <Redirect to="/Profile" />
          </Route>
        </IonRouterOutlet>

{/*Application default route*/}
        <Route exact path="/">
            <Redirect to="/Home" />
          </Route>
{/*Home route */}
          <Route exact path="/">
            <Redirect to="/Home" />
            <Home />
          </Route>

        <IonTabBar slot="bottom">
        <IonTabButton tab="Home" href="/Home">
            <IonIcon aria-hidden="true" icon={homeOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>

          <IonTabButton tab="Profile" href="/Profile">
            <IonIcon aria-hidden="true" icon={personCircleOutline} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
          <IonTabButton tab="ClickCounter" href="/Click Counter">
            <IonIcon aria-hidden="true" icon={nuclearOutline} />
            <IonLabel>Click Counter</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Calculator" href="/Calculator">
            <IonIcon aria-hidden="true" icon={calculatorOutline} />
            <IonLabel>Calculator</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>

    
  </IonApp>
);

export default App;
