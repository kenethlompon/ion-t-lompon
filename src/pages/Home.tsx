import React, { useState } from 'react';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonItemDivider,
  IonSearchbar,
  IonBadge
} from '@ionic/react';

//Custom CSS
import './Home.css';

//Ionic Icons
import { speedometerOutline,calculator,pencil, chatbubble, readerOutline, logoIonic,logoFirebase, logoReact} from 'ionicons/icons';

const cardData = [
  {
    title: 'Click Counter',
    icon: speedometerOutline,
    subtitle: 'App 1',
    link: '/ion-t-lompon/clickcounter',
    tags: {

    }

  },
  {
    title: 'Calculator',
    icon: calculator,
    subtitle: 'App 2',
    link: '/ion-t-lompon/calculator',
    tags: {

    }
  },
  {
    title: 'To Do List',
    icon: pencil,
    subtitle: 'App 3',
    link: '/ion-t-lompon/todolist',
    tags: {
 
    }
  },
  {
    title: 'Quote Generator',
    icon: chatbubble,
    subtitle: 'App 4',
    link: '/ion-t-lompon/qoutegenerator',
    tags: {

    }
  },
  {
    title: 'Notes',
    icon: readerOutline,
    subtitle: 'App 5',
    link: '/ion-t-lompon/notes',
    tags: {

    }
  }
  
];

const Home: React.FC = () => {
  {/*Dynamic Search*/}
  const [searchTerm, setSearchTerm] = useState<string>('');
  
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
      {/*Dynamic Search*/}
      
          <IonSearchbar 
            value={searchTerm} 
            onIonInput={(e) => setSearchTerm(e.target.value ?? '')} 
          />
          
          {cardData
            .filter((card) => card.title.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((card, index) => (
              <IonCard key={index} routerLink={card.link} routerDirection='forward'>
                <IonCardHeader>
                  <IonCardTitle>
                    <IonGrid>
                      <IonRow>
                        <IonCol size="2">
                          <IonIcon className="home-card-icon" icon={card.icon} color="primary" />
                        </IonCol>
                        <IonCol size="auto">
                            <div className="home-card-title">{card.title}</div>
                            <IonCardSubtitle>{card.subtitle}</IonCardSubtitle>
                            {card.tags && Object.entries(card.tags).map(([key, icon], i) => (
                              <IonIcon
                                key={i}
                                className="home-card-subicon"
         
                                color="primary" // Set color as needed
                              />
                            ))}
                          </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardTitle>
                </IonCardHeader>
              </IonCard>
          ))}
        </IonContent>
      </IonPage>
    );
};
  
export default Home;
  