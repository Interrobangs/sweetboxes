import { config } from './config/config'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const app = initializeApp(config.firebaseConfig);
const firestore = getFirestore()
const db = getFirestore(app);
const auth = getAuth()
const provider = new GoogleAuthProvider();

export { db, auth, provider, firestore };