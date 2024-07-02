import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCknht2-xiRUxZeKvcM995zXSLj47OaZMY",
    authDomain: "ecommerce-fdb1f.firebaseapp.com",
    databaseURL: "https://ecommerce-fdb1f.firebaseio.com",
    projectId: "ecommerce-fdb1f",
    storageBucket: "ecommerce-fdb1f.appspot.com",
    messagingSenderId: "564476796717",
    appId: "1:564476796717:web:5d63ce9d7ff1a2a3bfbda4",
  };

// Initialize app
firebase.initializeApp(firebaseConfig);

// Export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();




// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// import * as firebase from "firebase";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCknht2-xiRUxZeKvcM995zXSLj47OaZMY",
//   authDomain: "ecommerce-fdb1f.firebaseapp.com",
//   projectId: "ecommerce-fdb1f",
//   storageBucket: "ecommerce-fdb1f.appspot.com",
//   messagingSenderId: "564476796717",
//   appId: "1:564476796717:web:5d63ce9d7ff1a2a3bfbda4",
//   measurementId: "G-91HWPQSF9R"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// // export 
// export const auth = firebase.auth();
