import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCFTeeaR3Px98lvhzA8hD9fOAKxuFWxvG4",
  authDomain: "ramp-db.firebaseapp.com",
  databaseURL: "https://ramp-db.firebaseio.com",
  projectId: "ramp-db",
  storageBucket: "ramp-db.appspot.com",
  messagingSenderId: "722932394133",
  appId: "1:722932394133:web:caa2a82104d9a1a061139c",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    const icon = 0;

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        icon,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signinAnonymously = () => auth.signInAnonymously();

export default firebase;
