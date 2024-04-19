import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonButtons, IonBackButton } from '@ionic/react';
import './ClickCounter.css';

const ClickCounter: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Click Counter</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton onClick={() => setCount(count + 1)}>
          Click me!
        </IonButton>
        <p>You have clicked {count} times.</p>
      </IonContent>
    </IonPage>
  );
};

export default ClickCounter;
 