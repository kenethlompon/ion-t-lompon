import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton, IonIcon } from '@ionic/react';
import { calculator } from 'ionicons/icons';
import './ClickCounter.css';

const ClickCounter: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Click Counter</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonButton onClick={() => setCount(count + 1)}>
          Click me!
        </IonButton>
        <p>You have clicked {count} times.</p>
      </IonCardContent>
    </IonCard>
  );
};

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <IonCardContent>
            <IonButton routerLink="/click-counter">Click Counter</IonButton>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardContent>
            <IonButton routerLink="/calculator">
              <IonIcon icon={calculator} />
              Calculator
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
export { ClickCounter };