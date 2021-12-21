import { getAuth, signInWithPopup, GoogleAuthProvider, signOut} from "firebase/auth";
import "firebase/compat/storage"
import firebase from "firebase/compat/app";

const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUR_ID

  apiKey: "AIzaSyAaWmY2_k2LuUakovuHMmDwbLU_LOGvDcU",
  authDomain: "reacttxt.firebaseapp.com",
  projectId: "reacttxt",
  databaseURL: "https://reacttxt-default-rtdb.firebaseio.com/",
  storageBucket: "gs://reacttxt.appspot.com/",
  messagingSenderId: "571498932678",
  appId: "1:571498932678:web:3c4129a92bca6acacc6ac7",
  measurementId: "G-KELVT5P0BW"
};

firebase.initializeApp(firebaseConfig);

//////////////////////////////

export const auth = getAuth();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'})
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export const signInGoogle = () => signInWithPopup(auth, provider).then((result) => {
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;
})

export const signOutGoogle = () => signOut(auth)

export const storageRef = firebase.storage().ref();