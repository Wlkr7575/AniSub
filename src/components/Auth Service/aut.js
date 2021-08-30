import firebase from 'firebase/app'
import 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyAQpRKZmnoZ534AKBpb1NidyJqE18S810Y",
    authDomain: "dadlaga-595b4.firebaseapp.com",
    databaseURL: "https://dadlaga-595b4.firebaseio.com",
    projectId: "dadlaga-595b4",
    storageBucket: "dadlaga-595b4.appspot.com",
    messagingSenderId: "267549576754",
    appId: "1:267549576754:web:fe96eee1d34372f2b2f62b",
    measurementId: "G-MNK1GJMFQ5"
  };
  firebase.initializeApp(firebaseConfig);

  export default firebase.auth();
  