import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyD4iJl4Bh_zBJv7iGwdOYwqz0Uk-MX3r9s",
	authDomain: "ra-home-bookkeeping.firebaseapp.com",
	projectId: "ra-home-bookkeeping",
	storageBucket: "ra-home-bookkeeping.appspot.com",
	messagingSenderId: "13557178450",
	appId: "1:13557178450:web:0d305fae24e3de6c1a3f8b",
};

export const firebase = initializeApp(firebaseConfig);
export const db = getFirestore();
