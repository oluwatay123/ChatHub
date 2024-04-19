import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import  {getAuth} from  "firebase/auth"
import { getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCrwTfpkNTmq9GSwEyoLjplfIfjcyZSEVY",
  authDomain: "chat-cc82c.firebaseapp.com",
  projectId: "chat-cc82c",
  storageBucket: "chat-cc82c.appspot.com",
  messagingSenderId: "1085480743533",
  appId: "1:1085480743533:web:ecdd92f40d44de33724564",
  measurementId: "G-D2E90BLDMZ"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore()
