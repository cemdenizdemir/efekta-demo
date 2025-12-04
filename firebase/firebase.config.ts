import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGRt2VJWl_X_tgbJsWHs4vtIeDlr-phZ4",
  authDomain: "efekta-demo.firebaseapp.com",
  projectId: "efekta-demo",
  storageBucket: "efekta-demo.firebasestorage.app",
  messagingSenderId: "67968778972",
  appId: "1:67968778972:web:98b8947bdab0fe8332ea19",
  measurementId: "G-DKHXE0W138",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
