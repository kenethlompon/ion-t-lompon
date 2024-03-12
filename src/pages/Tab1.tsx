import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
      <img alt="Profile" src="https://imgs.search.brave.com/QxsBlQPEcvWqUec00nF9k3PvG_HJxqoPFMY3NAYk2r8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJhY2Nlc3Mu/Y29tL2Z1bGwvMTEw/MTI3NC5qcGc" />
      <IonCardHeader>
        <IonCardTitle>Keneth Lompon</IonCardTitle>
        <IonCardSubtitle>Student</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>NORTHERN BUKIDNON STATE COLLEGE. </IonCardContent>
    </IonCard>
        
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
