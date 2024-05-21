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
  IonDatetime,
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
  IonSearchbar,
  useIonToast
} from '@ionic/react';
// Ionicons
import { trashOutline, pencilOutline } from 'ionicons/icons';

// Firebase
import { collection, addDoc, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

const Todolist: React.FC = () => {
  const [notes, readNotes] = useState<{ id: string; title: string; description: string; dateAdded: string; dueDate: string; priority: string }[]>([]);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [priority, setPriority] = useState<string>('Medium');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const inputRefTitle = useRef<HTMLIonInputElement>(null);
  const inputRefDescription = useRef<HTMLIonTextareaElement>(null);
  const [present] = useIonToast();
  const [searchText, setSearchText] = useState<string>('');

  // Clear the input fields
  const clearInput = () => {
    setNewTitle('');
    setNewDescription('');
    setDueDate('');
    setPriority('Medium');
    if (inputRefTitle.current && inputRefDescription.current) {
      inputRefTitle.current.setFocus();
    }
  };

  // Toasts
  const addNoteToast = (position: 'middle') => {
    present({
      message: 'Added new Note',
      duration: 1500,
      position: position,
    });
  };

  const editNoteToast = (position: 'middle') => {
    present({
      message: 'Changes Saved',
      duration: 1500,
      position: position,
    });
  };

  const deleteNoteToast = (position: 'middle') => {
    present({
      message: 'Note deleted',
      duration: 1500,
      position: position,
    });
  };

  // Create Note
  const addNote = async () => {
    if (newTitle.trim() !== '') {
      if (editIndex !== null) {
        // Update existing note
      } else {
        const currentDate = new Date().toISOString();
        addNoteToast('middle');
        await addDoc(collection(db, 'todolist'), {
          title: newTitle,
          description: newDescription,
          dateAdded: currentDate,
          dueDate: dueDate,
          priority: priority
        });
      }
      clearInput();
    }
  };

  // Read Firebase Data
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'todolist'), (snapshot) => {
      readNotes(snapshot.docs.map(doc => ({
        id: doc.id, // Include the id property
        description: doc.data().description,
        title: doc.data().title,
        dateAdded: doc.data().dateAdded,
        dueDate: doc.data().dueDate,
        priority: doc.data().priority
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
    setDueDate(editedNote.dueDate);
    setPriority(editedNote.priority);
  };

  // Update Firebase Data
  const updateNote = async () => {
    if (editIndex !== null) {
      editNoteToast('middle');
      const noteToUpdate = notes[editIndex];
      await updateDoc(doc(db, 'todolist', noteToUpdate.id), {
        title: newTitle,
        description: newDescription,
        dueDate: dueDate,
        priority: priority
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
    deleteNoteToast('middle');
    const noteToDelete = notes[index];
    // Delete note from Firestore
    await deleteDoc(doc(db, 'todolist', noteToDelete.id));
  };

  // Filter notes based on search text
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchText.toLowerCase()) ||
    note.description.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/Home' />
          </IonButtons>
          <IonTitle>Todolist</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonInput
                placeholder="Title"
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
                placeholder="Description"
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
              <IonDatetime
                displayFormat="MM/DD/YYYY"
                placeholder="Select Due Date"
                value={dueDate}
                onIonChange={(e) => setDueDate(e.detail.value!)}
              ></IonDatetime>
              <IonSelect
                value={priority}
                placeholder="Select Priority"
                onIonChange={(e) => setPriority(e.detail.value!)}
              >
                <IonSelectOption value="High">High</IonSelectOption>
                <IonSelectOption value="Medium">Medium</IonSelectOption>
                <IonSelectOption value="Low">Low</IonSelectOption>
              </IonSelect>
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
          <IonLabel>Lists</IonLabel>
           {/* Search bar */}
        <IonSearchbar
          value={searchText}
          onIonInput={(e) => setSearchText(e.detail.value!)}
          debounce={300}
        ></IonSearchbar>
        </IonItemDivider>
        <IonList>
          {filteredNotes
            .slice() // Create a shallow copy of the notes array to avoid mutating the original array
            .sort((a, b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()) // Sort the array by dateAdded
            .map((note, index) => (
              <IonItem key={index}>
                
                <IonLabel>
                  <h2>{note.title}</h2>
                  <p>{note.description}</p>
                  <p>{new Date(note.dateAdded).toLocaleString()}</p>
                  <p>Due: {note.dueDate ? new Date(note.dueDate).toLocaleDateString() : 'No due date'}</p>
                  <p>Priority: {note.priority}</p>
                </IonLabel>
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
