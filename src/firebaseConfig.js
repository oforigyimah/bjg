// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
// import {getAnalytics} from "firebase/analytics";
import {getFirestore, connectFirestoreEmulator} from "firebase/firestore";
import {getAuth, connectAuthEmulator} from "firebase/auth";
import {getFunctions, connectFunctionsEmulator} from "firebase/functions";
import {getStorage, connectStorageEmulator} from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use


const firebaseConfig = {
    apiKey: "AIzaSyCuvw4SHnRIqWsKM19ydDNA9cbCqCTl1H8",
    authDomain: "bjg-demo.firebaseapp.com",
    projectId: "bjg-demo",
    storageBucket: "bjg-demo.appspot.com",
    messagingSenderId: "756550464910",
    appId: "1:756550464910:web:07d4638cc931f20e3de0df",
    measurementId: "G-HDXVQG2KRR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const functions = getFunctions(app);
const storage = getStorage(app);

if (process.env.RUN_EMULATORS === 'true') {
    connectFirestoreEmulator(db, '127.0.0.1', 8080);
    connectAuthEmulator(auth, "http://127.0.0.1:9099");
    connectFunctionsEmulator(functions, 'localhost', 5001);
    connectStorageEmulator(storage, 'localhost', 9199);
}
export {db, auth, functions, storage};
