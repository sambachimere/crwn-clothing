import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAesr8KFCo3CUluHirFwpd9WKZg49nzFY8",
    authDomain: "crwn-db-f72f5.firebaseapp.com",
    databaseURL: "https://crwn-db-f72f5.firebaseio.com",
    projectId: "crwn-db-f72f5",
    storageBucket: "crwn-db-f72f5.appspot.com",
    messagingSenderId: "321533981626",
    appId: "1:321533981626:web:68820cd6bf9d0e25882383",
    measurementId: "G-PPHPPD8QZ8"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promp: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;