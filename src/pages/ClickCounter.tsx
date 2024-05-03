import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonButtons, IonBackButton } from '@ionic/react';
import './ClickCounter.css';

const ClickCounter: React.FC = () => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const resetCount = () => {
    setCount(0);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/Home" />
          </IonButtons>
          <IonTitle>Click Counter</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton onClick={incrementCount}>
          Click me!
        </IonButton>
        <IonButton onClick={resetCount} color="danger">
          Reset
        </IonButton>
        <p>You have clicked {count} times.</p>
      </IonContent>
    </IonPage>
  );
};

export default ClickCounter;
