import firebase from "firebase";
import { onUnmounted, ref } from "vue";

const firebaseConfig = {
  apiKey: "AIzaSyBNUPdhwV_rd9CUZHco6pJvmC1RiRZH8tg",
  authDomain: "thedarkpiratee.firebaseapp.com",
  projectId: "thedarkpiratee",
  storageBucket: "thedarkpiratee.appspot.com",
  messagingSenderId: "176623324397",
  appId: "1:176623324397:web:030cae4aeb2b92532550e4"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const heartCollection = db.collection("heart");

export const useHeartData = () => {
  const heartData = ref({ isBroken: false, counter: "" });
  const close = heartCollection.onSnapshot((snapshot) => {
    heartData.value = snapshot.docs.map(d => ({id: d.id, ...d.data() }))[0];
  });
  onUnmounted(close);
  return heartData;
}