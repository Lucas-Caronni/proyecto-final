import app from 'firebase/app'
import firebase from 'firebase'


const firebaseConfig = {
  apiKey: "AIzaSyDmeTiVUVS06rwRbI4gS80LJ4T4jHCn13Q",
  authDomain: "primer-firebase-a645f.firebaseapp.com",
  projectId: "primer-firebase-a645f",
  storageBucket: "primer-firebase-a645f.firebasestorage.app",
  messagingSenderId: "644332551904",
  appId: "1:644332551904:web:86507ff2ff0c9176a6da85"
};

  app.initializeApp(firebaseConfig)


  export const auth = firebase.auth()
  export const storage = app.storage()
  export const db = app.firestore()