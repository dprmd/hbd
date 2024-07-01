import { initializeApp } from "firebase/app";
import {
  getFirestore,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { v4 } from "uuid";
import { getDeviceName } from "./utils";

const firebaseConfig = {
  apiKey: "AIzaSyCJ5k0LNQZRHc6SltHrqsuLZzJtA3Z6UiQ",
  authDomain: "senai-63d0f.firebaseapp.com",
  projectId: "senai-63d0f",
  storageBucket: "senai-63d0f.appspot.com",
  messagingSenderId: "728487209096",
  appId: "1:728487209096:web:b44da9fe408eb5d46dd73d",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const collectionName = "hbd_users";
let userId = "";

const addNewUserToFirestoreIfNotExists = async () => {
  if (localStorage.getItem("hbd-userId")) {
    const userIdFromLocalStorage = localStorage.getItem("hbd-userId");
    userId = userIdFromLocalStorage;
  } else {
    const newUserId = v4();
    const device = getDeviceName();
    localStorage.setItem("hbd-userId", newUserId);
    try {
      await setDoc(doc(firestore, collectionName, newUserId), {
        userId: newUserId,
        device,
        lastSeen: "",
        seenHistory: [],
      });
      return newUserId;
    } catch (error) {
      console.log(error);
    }
  }
};

export const uploadSeenHistory = async () => {
  try {
    const seen = new Date();
    const day = seen.getDate();
    const month = seen.toLocaleString("default", { month: "long" });
    const year = seen.getFullYear();
    const hours = seen.getHours();
    const minutes = seen.getMinutes();
    const seconds = seen.getSeconds();
    const seenFormat = `${day} ${month} ${year} , ${hours}:${minutes}:${seconds}`;
    const userRef = doc(firestore, collectionName, userId);
    await updateDoc(userRef, {
      lastSeen: seenFormat,
      seenHistory: arrayUnion(seenFormat),
    });
  } catch (error) {
    console.log(error);
  }
};

export const uploadInformationToFirebase = async () => {
  addNewUserToFirestoreIfNotExists();
  uploadSeenHistory();
};
