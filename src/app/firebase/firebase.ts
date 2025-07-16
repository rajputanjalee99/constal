import { environment } from "../../environments/environment";
// Firebase SDK for social auth
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
firebase.initializeApp(environment.firebaseConfig);

// exports.firebase = firebase
// export firebase

export var fire = firebase
// module.exports = firebase