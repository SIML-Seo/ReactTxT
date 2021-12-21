import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
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

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);


//////////////////////////////

export const auth = getAuth();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'})

export const signInGoogle = () => signInWithPopup(auth, provider)
    .then((result) => {
        const credentail = GoogleAuthProvider.credentialFromResult(result);
        // const token = credentail.accessToken;
        // const user = result.user;
    })

export const signOutGoogle = () => signOut(auth).then(() => {})


//////////////////////////////

// const db = getDatabase();

// export const write = (title, text) => {
//     set(ref(db, 'text/' + title), {
//         title: title,
//         text: text
//     });
//     push(ref(db,title));
//     console.log(title + " : " + text)
// }

// export const load = (title) => {
//     onValue('text/'+ title, (snapshot) => {
//     const data = snapshot.val();
//     console.log(data);
//     return data;
// })}

// export const titleList = () => {
//     const myUserId = auth.currentUser.uid;
//     const list = query(ref(db, 'text/'), orderByKey())
//     // console.log(myUserId)
//     // console.log(list)
//     return list
// } 

/////////////////////////////
export const storageRef = firebase.storage().ref();
// export const myUserId = auth.currentUser.uid;
// const storage1 = app.storage()
// const storageRef = storage.ref();