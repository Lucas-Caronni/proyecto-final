import app from 'firebase/app'
import firebase from 'firebase'


const firebaseConfig = {
  apiKey: "AIzaSyDhuyYLu5iel_zROA6_8LIFxVHUDRRzf-Y",
  authDomain: "proyecto-integrador-939cf.firebaseapp.com",
  projectId: "proyecto-integrador-939cf",
  storageBucket: "proyecto-integrador-939cf.firebasestorage.app",
  messagingSenderId: "178422556781",
  appId: "1:178422556781:web:9b62c3fff03b8386a2b764"
};

  app.initializeApp(firebaseConfig)


  export const auth = firebase.auth()
  export const storage = app.storage()
  export const db = app.firestore()