import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBDhdOmkn9Ca2HclYnMViw9qBPIvUq54nc",
  authDomain: "shopping-c5af8.firebaseapp.com",
  projectId: "shopping-c5af8",
  databaseURL: "https://shopping-c5af8-default-rtdb.firebaseio.com/",
  storageBucket: "shopping-c5af8.appspot.com",
  messagingSenderId: "977094218801",
  appId: "1:977094218801:web:a08ff6ed8b36baad78f110",
  measurementId: "G-4M7F4RK374",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
