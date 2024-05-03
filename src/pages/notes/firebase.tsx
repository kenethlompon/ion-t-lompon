// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCsBT63tk6vKhsBKlVwxHzAQd-2qOa-Wkw",
  authDomain: "it35-lompon-d50c0.firebaseapp.com",
  projectId: "it35-lompon-d50c0",
  storageBucket: "it35-lompon-d50c0.appspot.com",
  messagingSenderId: "658749998984",
  appId: "1:658749998984:web:e90740f14f41bd1fc99c3d",
  measurementId: "G-0NHJKJX67K"
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

// 
const db = getFirestore(firebaseApp);

export{db}