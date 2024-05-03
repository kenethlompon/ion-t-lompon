import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonInput,
  IonButton,
  IonIcon,
  IonButtons,
  IonBackButton
} from '@ionic/react';
import { add, arrowBack, trashOutline } from 'ionicons/icons';

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const toggleTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTasks[index].startsWith('✓ ')
      ? updatedTasks[index].substr(2)
      : '✓ ' + updatedTasks[index];
    setTasks(updatedTasks);
  };

  const deleteTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/Home" />
          </IonButtons>
          <IonTitle>Todo List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {tasks.map((task, index) => (
            <IonItem key={index}>
              <IonCheckbox
                slot="start"
                checked={task.startsWith('✓ ')}
                onIonChange={() => toggleTask(index)}
              />
              <IonLabel>{task}</IonLabel>
              <IonButton onClick={() => deleteTask(index)} fill="clear">
                <IonIcon icon={trashOutline} slot="icon-only" />
              </IonButton>
            </IonItem>
          ))}
        </IonList>
        <IonItem>
          <IonInput
            value={newTask}
            placeholder="Enter new task"
            onIonChange={(e) => setNewTask(e.detail.value!)}
          />
          <IonButton onClick={addTask}>
            <IonIcon icon={add} slot="icon-only" />
          </IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default TodoList;
