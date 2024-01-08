// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics,  isSupported  } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBw6qZb6UuBmayagemSyKlyEhqf1vXKAwU",
  authDomain: "chatfunction-fcf25.firebaseapp.com",
  projectId: "chatfunction-fcf25",
  storageBucket: "chatfunction-fcf25.appspot.com",
  messagingSenderId: "230322491136",
  appId: "1:230322491136:web:d637eb9ed79636cd02ade5",
  measurementId: "G-CZTBN70BFF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let analytics;
if (typeof window !== "undefined") {
  // 只在客户端环境中初始化 Firebase Analytics
  isSupported().then((isSupported) => {
    if (isSupported) {
      analytics = getAnalytics(app);
    }
  });
}

export { auth, db, app, analytics };