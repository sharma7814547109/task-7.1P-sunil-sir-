import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/firestore';

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {

  apiKey: "AIzaSyCfHvDOwrQNRvDbJvQSc6ClfufSB-zzLkg",

  authDomain: "dtfyvbhjk.firebaseapp.com",

  projectId: "dtfyvbhjk",

  storageBucket: "dtfyvbhjk.firebasestorage.app",

  messagingSenderId: "701550049021",

  appId: "1:701550049021:web:2ec2a7ebcfd182cc403094",

  measurementId: "G-1M5DT5NFW4"

};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const signOut = async () => {
  try {
    await firebase.auth().signOut();
  } catch (error) {
    console.error('Error signing out:', error);
  }
}

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocFromAuth = async (user) => {
  if (!user || !user.email) {
    console.error('Invalid user object:', user);
    return null;
  }

};

export const createUserDocInFirestore = async (userAuth, additionalInformation) => {
  if (!userAuth || !userAuth.email) {
    console.error('Invalid userAuth object:', userAuth);
    return null;
  }
 
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
 
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
      console.log('User document created in Firestore');
    } catch (error) {
      console.log('Error creating user document in Firestore:', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error creating user:', error.message);
    throw error;
  }

  
};
