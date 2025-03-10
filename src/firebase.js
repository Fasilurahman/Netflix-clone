import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword,
     getAuth,
     signInWithEmailAndPassword, 
     signOut} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDNYocNYobd5c9yj-TeoOzAWDwp2cfgEgI",
  authDomain: "netflix-clone-ba700.firebaseapp.com",
  projectId: "netflix-clone-ba700",
  storageBucket: "netflix-clone-ba700.firebasestorage.app",
  messagingSenderId: "12338855440",
  appId: "1:12338855440:web:2c1c669977e175d35b9495"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async (name ,email ,password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '))  
    }
}

const login = async (email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '))
        
    }
}

const logout = async ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout}