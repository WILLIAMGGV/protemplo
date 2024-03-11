
import { initializeApp } from "firebase/app";

import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDaP7y26sdEIIQwTHAvEFLxC8lSiGo7J_g",
  authDomain: "protemplo-e8571.firebaseapp.com",
  projectId: "protemplo-e8571",
  storageBucket: "protemplo-e8571.appspot.com",
  messagingSenderId: "636363099026",
  appId: "1:636363099026:web:4e5f055015c6fdb2b58f4b"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)