import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const serviceAccountKey = {
  apiKey: "AIzaSyAhAssmUfBHwwMJnNki9wt645wsb8nrDuY",
  authDomain: "e-katalog-cd566.firebaseapp.com",
  projectId: "e-katalog-cd566",
  storageBucket: "e-katalog-cd566.appspot.com",
  messagingSenderId: "1089617816931",
  appId: "1:1089617816931:web:b7b25f17453d8abd367756"
};

// Initialize Firebase
const app = initializeApp(serviceAccountKey);
export const storage = getStorage(app);
