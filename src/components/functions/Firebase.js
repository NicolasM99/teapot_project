import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDl74t7ILA22uLd8N1vZEnqCaeh2OSAQs4",
  authDomain: "proyecto-portafolio-3778c.firebaseapp.com",
  databaseURL: "https://proyecto-portafolio-3778c.firebaseio.com",
  projectId: "proyecto-portafolio-3778c",
  storageBucket: "proyecto-portafolio-3778c.appspot.com",
  messagingSenderId: "21735665637",
  appId: "1:21735665637:web:4a904a175bc0ac54b0090c",
  measurementId: "G-YJGFJWWSHT",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};
export const signOut = () => {
  auth.signOut();
};

export const storage = firebase.storage();
