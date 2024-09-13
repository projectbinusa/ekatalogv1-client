import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDt6KVVdJSi_PfaMnlwKbC36O2GeH46CE4",
  authDomain: "e-katalogv1.firebaseapp.com",
  databaseURL: "https://e-katalogv1-default-rtdb.firebaseio.com",
  projectId: "e-katalogv1",
  storageBucket: "e-katalogv1.appspot.com",
  messagingSenderId: "385147362361",
  appId: "1:385147362361:web:672d8a07f424d5da3841e8",
  measurementId: "G-L95JBH9LFG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);
