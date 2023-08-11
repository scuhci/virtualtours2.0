import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDw5hS2AcfPeBe7SX1u-7lbXLU09V0FnDA",
	authDomain: "virtualtours-db.firebaseapp.com",
	projectId: "virtualtours-db",
	storageBucket: "virtualtours-db.appspot.com",
	messagingSenderId: "193995438873",
	appId: "1:193995438873:web:e0f8215e97e442f4b6a388",
};

const app = initializeApp(firebaseConfig);
console.log(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
	userAuth: any,
	additionalInfo = { displayName: "Matt" }
) => {
	const userDocRef = doc(db, "users", userAuth.uid);
	console.log(userDocRef);
	const userSnapshot = await getDoc(userDocRef);
	console.log(userSnapshot.exists());
	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInfo,
			});
		} catch (error) {
			console.log("error creating the user", error.message);
		}
	}
	return userDocRef;
};
export const createAuthUserWithEmailAndPassword = async (
	email: any,
	password: any
) => {
	// if (!email || !password) return;
	return createUserWithEmailAndPassword(auth, email, password);
};
export const signInAuthUserWithEmailAndPassword = async (
	email: any,
	password: any
) => {
	// if (!email || !password) return;
	return signInWithEmailAndPassword(auth, email, password);
};
