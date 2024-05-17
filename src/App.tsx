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
import { calculatorOutline, closeOutline, ellipse, homeOutline, nuclearOutline, personCircleOutline, square, triangle } from 'ionicons/icons';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ClickCounter from './pages/ClickCounter';
import Calculator from './pages/Calculator';
import TodoList from './pages/todolist'; // Import the TodoList page component
import Qoutegenerator  from './pages/qoutegenerator/qoutegenerator'; // Import the TodoList page component
import Notes from './pages/notes/notes';


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
      <Route exact path="/ion-t-lompon/">
          <Redirect to="/ion-t-lompon/Home" />
        </Route>

      <Route exact path="/ion-t-lompon/home">
          <Home />
        </Route>
        <Route exact path="/ion-t-lompon/profile">
          <Profile />
        </Route>
        <Route exact path="/ion-t-lompon/clickcounter">
          <ClickCounter />
        </Route>
        <Route path="/ion-t-lompon/calculator">
          <Calculator />
        </Route>
        <Route path="/ion-t-lompon/todolist">
          <TodoList />
        </Route>
        <Route path="/ion-t-lompon/qoutegenerator">
          <Qoutegenerator />
        </Route>
        <Route path="/ion-t-lompon/notes">
          <Notes />
        </Route>
    
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
      <IonTabButton  tab="Home" href="/ion-t-lompon/home">
            <IonIcon aria-hidden="true" color='warning' icon={homeOutline} />
            <IonLabel color='dark'>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Profile" href="/ion-t-lompon/profile">
            <IonIcon aria-hidden="true" color='warning' icon={personCircleOutline} />
            <IonLabel color='dark'>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;