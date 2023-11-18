// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3S4XHInkP7yOC34sLMHLtREppyspJxtI",
  authDomain: "typescript-ada72.firebaseapp.com",
  projectId: "typescript-ada72",
  storageBucket: "typescript-ada72.appspot.com",
  messagingSenderId: "517376824062",
  appId: "1:517376824062:web:28650e9b8394234f3a4baf"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export default db;
export {app, auth}