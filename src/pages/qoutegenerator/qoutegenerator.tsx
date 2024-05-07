import React, { useState, useEffect, useRef } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
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
  IonTextarea,
  useIonToast,
  IonAlert,
  IonModal,
  IonButtons,
  IonBackButton
} from '@ionic/react';
import { trashOutline, pencilOutline, refreshOutline } from 'ionicons/icons';

// Firebase
import { collection, addDoc, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

const Quotes: React.FC = () => {
  const [quotes, setQuotes] = useState<{ id: string; text: string; author: string; }[]>([]);
  const [newText, setNewText] = useState<string>('');
  const [newAuthor, setNewAuthor] = useState<string>('');
  const inputRefText = useRef<HTMLIonInputElement>(null);
  const inputRefAuthor = useRef<HTMLIonInputElement>(null);
  const [present] = useIonToast();
  const [randomQuote, setRandomQuote] = useState<{ text: string; author: string; } | null>(null);
  const [showRandomQuoteAlert, setShowRandomQuoteAlert] = useState(false);

  // Toast
  const addQuoteToast = (position: 'middle') => {
    present({
      message: 'Added new Quote',
      duration: 1500,
      position: position,
    });
  };

  const deleteQuoteToast = (position: 'middle') => {
    present({
      message: 'Quote deleted',
      duration: 1500,
      position: position,
    });
  };

  // Add Quote
  const addQuote = async () => {
    if (newText.trim() !== '' && newAuthor.trim() !== '') {
      const currentDate = new Date().toISOString();
      addQuoteToast('middle');
      await addDoc(collection(db, 'quotegenerator'), {
        text: newText,
        author: newAuthor,
        dateAdded: currentDate
      });
      clearInput();
    }
  };

  // Read Firebase Data
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'quotegenerator'), (snapshot) => {
      setQuotes(snapshot.docs.map(doc => ({
        id: doc.id,
        text: doc.data().text,
        author: doc.data().author
      })));
    });
    return () => unsubscribe();
  }, []);

  // Clear the input fields
  const clearInput = () => {
    setNewText('');
    setNewAuthor('');
    if (inputRefText.current && inputRefAuthor.current) {
      inputRefText.current.setFocus();
    }
  };

  // Delete Quote
  const deleteQuote = async (id: string) => {
    deleteQuoteToast('middle');
    await deleteDoc(doc(db, 'quotegenerator', id));
  };

  // Generate Random Quote
  const generateRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    if (randomQuote) {
      setRandomQuote(randomQuote);
      setShowRandomQuoteAlert(true);
    } else {
      setRandomQuote(null);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/Home" />
          </IonButtons>
          <IonTitle>Quote Generator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard color={'light'}>
          <IonCardHeader>
            <IonCardTitle>
              <IonInput
                placeholder="Enter quote"
                value={newText}
                onIonInput={(e) => setNewText(e.detail.value!)}
                ref={inputRefText}
              ></IonInput>
            </IonCardTitle>
            <IonCardSubtitle>
              <IonInput
                placeholder="Enter author"
                value={newAuthor}
                onIonInput={(e) => setNewAuthor(e.detail.value!)}
                ref={inputRefAuthor}
              ></IonInput>
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonRow>
              <IonCol>
                <IonButton expand="full" onClick={addQuote} color={'dark'}>
                  Add Quote
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton expand="full" onClick={generateRandomQuote} color={'dark'}>
                  <IonIcon icon={refreshOutline} />
                   Random Quotes
                </IonButton>
              </IonCol>

              <IonCol>
                <IonButton expand="full" onClick={() => setIsOpen(true)} color={'dark'}>View Quotes</IonButton>
                    <IonModal isOpen={isOpen}>
                      <IonHeader>
                        <IonToolbar>
                          <IonTitle>Quotes</IonTitle>
                          <IonButtons slot="end">
                            <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
                          </IonButtons>
                        </IonToolbar>
                      </IonHeader>
                      <IonContent className="ion-padding">
                      <IonItemDivider color="light">
                      <IonLabel>Quotes</IonLabel>
                    </IonItemDivider>
                    <IonList>
                      {quotes.map(quote => (
                        <IonItem key={quote.id}>
                          <IonLabel>
                            <h2>{quote.text}</h2>
                            <p>- {quote.author}</p>
                          </IonLabel>
                          <IonButton fill="clear" onClick={() => deleteQuote(quote.id)}>
                            <IonIcon icon={trashOutline} />
                          </IonButton>
                        </IonItem>
                      ))}
                    </IonList>
                        </IonContent>
                      </IonModal>
                  </IonCol>

            </IonRow>
          </IonCardContent>
        </IonCard>
        <IonAlert
          isOpen={showRandomQuoteAlert}
          onDidDismiss={() => setShowRandomQuoteAlert(false)}
          header="Quote for You"
          message={randomQuote ? `"${randomQuote.text}" - ${randomQuote.author}` : "No quotes available."}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Quotes;