import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getMessaging } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-messaging-sw.js";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAO0BVoZFy0SBbCX1Xm_Z_UBg6hu6acdUc",
  authDomain: "cohome-4dc5d.firebaseapp.com",
  projectId: "cohome-4dc5d",
  storageBucket: "cohome-4dc5d.appspot.com",
  messagingSenderId: "177188313300",
  appId: "1:177188313300:web:d24f394fe5cc342ead4341",
});

const messaging = getMessaging(firebaseApp);
