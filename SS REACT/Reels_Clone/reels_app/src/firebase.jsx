import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import secrets from "./secrets.jsx";
import { getFirestore } from "firebase/firestore";
let app = initializeApp(secrets);
export let auth = getAuth(app);
export const db = getFirestore(app);
// All Authentication features on Firebase Link
// We Will be using SignInWithEmailAndPassword
// https://firebase.google.com/docs/auth/web/start#web-version-8_2




