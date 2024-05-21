import React, { useState, useEffect, useRef } from 'react';
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
  IonTextarea,
  IonSelect,
  IonSelectOption,
  useIonToast,
  IonToggle,
  IonSearchbar,
} from '@ionic/react';
//Ionicons
import { trashOutline, pencilOutline, pinOutline, pinSharp, moon, sunny } from 'ionicons/icons';

import './notes.css';

// Firebase
import { collection, addDoc, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Todolist: React.FC = () => {
  const [notes, readNotes] = useState<{ id: string; title: string; description: string; dateAdded: string; pinned: boolean; category: string }[]>([]);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showPinned, setShowPinned] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const inputRefTitle = useRef<HTMLIonInputElement>(null);
  const inputRefDescription = useRef<HTMLIonTextareaElement>(null);
  const [present] = useIonToast();

  // Clear the input field
  const clearInput = () => {
    setNewTitle('');
    setNewDescription('');
    setCategory('');
    if (inputRefTitle.current && inputRefDescription.current) {
      inputRefTitle.current.setFocus();
    }
  };

  // Toast
  const addNoteToast = () => {
    present({
      message: 'Added new Note',
      duration: 1500,
      position: 'bottom',
    });
  };

  const editNoteToast = () => {
    present({
      message: 'Changes Saved',
      duration: 1500,
      position: 'bottom',
    });
  };

  const deleteNoteToast = () => {
    present({
      message: 'Note deleted',
      duration: 1500,
      position: 'bottom',
    });
  };

  const pinNoteToast = () => {
    present({
      message: 'Note pinned',
      duration: 1500,
      position: 'bottom',
    });
  };

  const unpinNoteToast = () => {
    present({
      message: 'Note unpinned',
      duration: 1500,
      position: 'bottom',
    });
  };

  // Create Note
  const addNote = async () => {
    if (newTitle.trim() !== '' && newDescription.trim() !== '') {
      if (editIndex !== null) {
        // Update existing note
        await updateNote();
      } else {
        const currentDate = new Date().toISOString();
        addNoteToast();
        await addDoc(collection(db, 'notes'), {
          title: newTitle,
          description: newDescription,
          dateAdded: currentDate,
          pinned: false,
          category: category
        });
      }
      clearInput();
    }
  };

  // Read Firebase Data
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'notes'), (snapshot) => {
      readNotes(snapshot.docs.map(doc => ({
        id: doc.id,
        description: doc.data().description,
        title: doc.data().title,
        dateAdded: doc.data().dateAdded,
        pinned: doc.data().pinned,
        category: doc.data().category
      })));
    });
    return () => unsubscribe();
  }, []);

  // Edit Handler
  const editNote = (index: number) => {
    setEditIndex(index);
    const editedNote = notes[index];
    setNewTitle(editedNote.title);
    setNewDescription(editedNote.description);
    setCategory(editedNote.category);
    if (inputRefTitle.current) {
      inputRefTitle.current.setFocus();
    }
  };

  // Update Firebase Data
  const updateNote = async () => {
    if (editIndex !== null) {
      editNoteToast();
      const noteToUpdate = notes[editIndex];
      await updateDoc(doc(db, 'notes', noteToUpdate.id), {
        title: newTitle,
        description: newDescription,
        category: category
      });
      // Clear the input fields and reset editIndex
      clearInput();
      setEditIndex(null);
    }
  };

  // Cancel Edit function
  const cancelEdit = () => {
    clearInput(); // Clear input fields
    setEditIndex(null); // Reset editIndex
  };

  // Delete Firebase Data
  const deleteNote = async (index: number) => {
    deleteNoteToast();
    const noteToDelete = notes[index];
    // Delete note from Firestore
    await deleteDoc(doc(db, 'notes', noteToDelete.id));
  };

  // Pin/Unpin Note
  const togglePinNote = async (index: number) => {
    const noteToPin = notes[index];
    await updateDoc(doc(db, 'notes', noteToPin.id), {
      pinned: !noteToPin.pinned
    });
    if (noteToPin.pinned) {
      unpinNoteToast();
    } else {
      pinNoteToast();
    }
  };

  // Filtered and Sorted Notes
  const filteredNotes = notes.filter(note =>
    (note.title.toLowerCase().includes(searchText.toLowerCase()) || note.description.toLowerCase().includes(searchText.toLowerCase())) &&
    (showPinned || !note.pinned)
  ).sort((a, b) => {
    if (sortOrder === 'asc') {
      return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
    } else {
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    }
  });

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark', !darkMode);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/Home' />
          </IonButtons>
          <IonTitle>Notes</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={toggleDarkMode}>
              <IonIcon slot="icon-only" icon={darkMode ? sunny : moon} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonSearchbar
          value={searchText}
          onIonInput={(e) => setSearchText(e.detail.value!)}
          debounce={500}
        ></IonSearchbar>
        <IonItem>
          <IonLabel>Sort by Date</IonLabel>
          <IonSelect value={sortOrder} placeholder="Select Sort Order" onIonChange={(e) => setSortOrder(e.detail.value)}>
            <IonSelectOption value="asc">Ascending</IonSelectOption>
            <IonSelectOption value="desc">Descending</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>Show Pinned Notes</IonLabel>
          <IonToggle checked={showPinned} onIonChange={(e) => setShowPinned(e.detail.checked)} />
        </IonItem>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonInput
                placeholder="Type something here"
                label="Title"
                id="custom-input"
                labelPlacement="floating"
                counter={true}
                maxlength={50}
                counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} / ${maxLength} characters remaining`}
                value={newTitle}
                onIonInput={(e) => setNewTitle(e.detail.value!)}
                ref={inputRefTitle}
              ></IonInput>
            </IonCardTitle>
            <IonCardSubtitle>
              <IonTextarea
                placeholder="Type something here"
                label="Description"
                id="custom-input"
                labelPlacement="floating"
                counter={true}
                maxlength={200}
                counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} / ${maxLength} characters remaining`}
                value={newDescription}
                onIonInput={(e) => setNewDescription(e.detail.value!)}
                ref={inputRefDescription}
              ></IonTextarea>
              <IonItem>
                <IonLabel>Category</IonLabel>
                <IonSelect value={category} placeholder="Select Category" onIonChange={(e) => setCategory(e.detail.value)}>
                  <IonSelectOption value="work">Work</IonSelectOption>
                  <IonSelectOption value="personal">Personal</IonSelectOption>
                  <IonSelectOption value="other">Other</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonRow>
              <IonCol>
                <IonButton expand="block" onClick={editIndex !== null ? updateNote : addNote}>
                  {editIndex !== null ? 'Update' : 'Add'}
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton expand="block" fill="clear" onClick={editIndex !== null ? cancelEdit : clearInput}>
                  {editIndex !== null ? 'Cancel' : 'Clear'}
                </IonButton>
              </IonCol>
            </IonRow>
          </IonCardContent>
        </IonCard>
        {/* Todo list output */}
        <IonItemDivider color="light">
          <IonLabel>Notes</IonLabel>
        </IonItemDivider>
        <IonList>
          {filteredNotes.map((note, index) => (
            <IonItem key={index}>
              <IonLabel>
                <h2>{note.title}</h2>
                <p>{note.description}</p>
                <p>{new Date(note.dateAdded).toLocaleString()}</p>
                <p><strong>Category:</strong> {note.category}</p>
              </IonLabel>
              <IonButton fill="clear" onClick={() => togglePinNote(index)}>
                <IonIcon icon={note.pinned ? pinSharp : pinOutline} />
              </IonButton>
              <IonButton fill="clear" onClick={() => editNote(index)}>
                <IonIcon icon={pencilOutline} />
              </IonButton>
              <IonButton fill="clear" onClick={() => deleteNote(index)}>
                <IonIcon icon={trashOutline} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Todolist;
