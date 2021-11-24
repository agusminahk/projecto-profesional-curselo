import { initializeApp } from "firebase/app" ;
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC-tUUKn7oF3BPd0jZtKftPadtfeqHzp74",
  authDomain: "curselo-7d35c.firebaseapp.com",
  projectId: "curselo-7d35c",
  storageBucket: "curselo-7d35c.appspot.com",
  messagingSenderId: "1044975091065",
  appId: "1:1044975091065:web:060d2584c2d9bd97f083a8",
  measurementId: "G-BCTVT4CVZM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);