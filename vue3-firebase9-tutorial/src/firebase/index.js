// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCu4_ERSx9GsdHJ1ABZYJrhaHRYIIljAWo',
  authDomain: 'badass-todo-79b5e.firebaseapp.com',
  projectId: 'badass-todo-79b5e',
  storageBucket: 'badass-todo-79b5e.appspot.com',
  messagingSenderId: '299393149437',
  appId: '1:299393149437:web:315184a34d426a73341194'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}