import { initializeApp } from "firebase/app";

import { 
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";

import { 
  getFirestore
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsF36mMkd_xKveBlC6hdzvUl3ryaBUGkY",
  authDomain: "trello-clone-a6cab.firebaseapp.com",
  projectId: "trello-clone-a6cab",
  storageBucket: "trello-clone-a6cab.firebasestorage.app",
  messagingSenderId: "60138631353",
  appId: "1:60138631353:web:976f2aef3b16834b88ab68",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider =
  new GoogleAuthProvider();

export const db = getFirestore(app);