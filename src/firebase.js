import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAgBVGgsMfM45hYi3eWNRDKEE6gF0AFhDI",
  authDomain: "cursoscompra-a01c5.firebaseapp.com",
  projectId: "cursoscompra-a01c5",
  storageBucket: "cursoscompra-a01c5.appspot.com",
  messagingSenderId: "467268536682",
  appId: "1:467268536682:web:69bc83e3be7471fc007d13",
  measurementId: "G-LNJ39CF03J"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
export { auth }
