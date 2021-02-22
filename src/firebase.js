import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCHO9J_4A1u8n4625IFbpfySyG-xxYMpq0",
    authDomain: "social-media-cs.firebaseapp.com",
    projectId: "social-media-cs",
    storageBucket: "social-media-cs.appspot.com",
    messagingSenderId: "1051838094799",
    appId: "1:1051838094799:web:33e7833c97da8369bf06ba",
    measurementId: "G-F61E1359TV"
});

const auth = firebase.auth();
const storage = firebase.storage();


export {auth, storage};