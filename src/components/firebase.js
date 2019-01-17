
import { firebase } from "@firebase/app";
import "@firebase/firestore";

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAybJ66XI-wvlA-QkSJ1WnZVG9omSWtqQQ",
    authDomain: "contact-project-da80d.firebaseapp.com",
    databaseURL: "https://contact-project-da80d.firebaseio.com",
    projectId: "contact-project-da80d",
    storageBucket: "",
    messagingSenderId: "504823058095"
  });
  
  export const db = firebaseApp.firestore();
