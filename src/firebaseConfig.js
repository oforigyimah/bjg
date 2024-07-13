// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
// import {getAnalytics} from "firebase/analytics";
import {getFirestore, connectFirestoreEmulator} from "firebase/firestore";
import {getAuth, connectAuthEmulator} from "firebase/auth";
import {getFunctions, connectFunctionsEmulator} from "firebase/functions";
import {getStorage, connectStorageEmulator} from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use


const firebaseConfig = {
    apiKey: "AIzaSyATbJNCizDmVmhwYurVylsxG17g4Z2ESnA",
    authDomain: "bjg-3436b.firebaseapp.com",
    projectId: "bjg-3436b",
    storageBucket: "bjg-3436b.appspot.com",
    messagingSenderId: "231827920964",
    appId: "1:231827920964:web:b200832273179497380411",
    measurementId: "G-5GXV8N0YGP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const functions = getFunctions(app);
const storage = getStorage(app);


export {db, auth, functions, storage};
