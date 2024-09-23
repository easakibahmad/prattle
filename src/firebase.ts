// // src/firebase.ts
// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";

// const firebaseConfig = {
//   //   apiKey: "YOUR_API_KEY",
//   //   authDomain: "YOUR_AUTH_DOMAIN",
//   //   projectId: "YOUR_PROJECT_ID",
//   //   storageBucket: "YOUR_STORAGE_BUCKET",
//   //   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   //   appId: "YOUR_APP_ID",

//   apiKey: "AIzaSyD6IO1myquyyO-0eN2GW5-WgdPqHj-XpnE",
//   authDomain: "prattle-88e91.firebaseapp.com",
//   projectId: "prattle-88e91",
//   storageBucket: "prattle-88e91.appspot.com",
//   messagingSenderId: "18713341731",
//   appId: "1:18713341731:web:44dbd6b6ca420811126696",
//   measurementId: "G-2E1JE9Z251",
// };

// firebase.initializeApp(firebaseConfig);

// export const auth = firebase.auth();
// export const firestore = firebase.firestore();

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6IO1myquyyO-0eN2GW5-WgdPqHj-XpnE",
  authDomain: "prattle-88e91.firebaseapp.com",
  projectId: "prattle-88e91",
  storageBucket: "prattle-88e91.appspot.com",
  messagingSenderId: "18713341731",
  appId: "1:18713341731:web:44dbd6b6ca420811126696",
  measurementId: "G-2E1JE9Z251",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
