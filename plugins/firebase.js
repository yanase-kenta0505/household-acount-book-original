import firebase from "firebase";

const config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

// console.log(config);

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default firebase;
