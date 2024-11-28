import { useContext, createContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,onAuthStateChanged,
  signOut
} from "firebase/auth";
import {addDoc, collection, doc, getDoc, getFirestore, query, setDoc, updateDoc, where,getDocs} from 'firebase/firestore'
import { useNavigate } from "react-router-dom";

const FirebaseContext = createContext(null);
const provider=new GoogleAuthProvider();
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXmRYIxYdEchnp_XxpmEJeg6IVD4KgPPQ",
  authDomain: "ai-trip-planner-a4aaa.firebaseapp.com",
  projectId: "ai-trip-planner-a4aaa",
  storageBucket: "ai-trip-planner-a4aaa.firebasestorage.app",
  messagingSenderId: "1048264307463",
  appId: "1:1048264307463:web:e3695e6bffdc1c32138ba2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db=getFirestore(app);

// Custom Hook to use Firebase
export const useFirebase = () => useContext(FirebaseContext);

export default function FirebaseProvider({ children }) {
    const [id,setID]=useState(null);
    const [user,setUser]=useState(null);
    const [isFormCompleted,setForm]=useState(false);
    const [email,setEmail]=useState(null);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setEmail(user.email);
            } else {
                setUser(null);
            }
        });
    }, []);

    const isLogged=user?true:false;

  // Sign Up Function
  const Signup = async (email, password) => {
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      // Handle and display error
      alert(`Sign Up Failed: ${error.message}`);
      throw error; // Re-throw the error if needed for further handling
    }
  };

  // Sign In Function
  const Signin = async (email, password) => {
    try {
       await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      // Handle and display error
      alert(`Sign In Failed: ${error.message}`);
      throw error; // Re-throw the error if needed for further handling
    }
  };

  const GoogleSignin=async ()=>{

    return await signInWithPopup(auth,provider);

  }

  const logout=async ()=>{
    await signOut(auth);
    setUser(null);
  }
  
  const addData = async (destination, days, budget, people, tripData) => {
    try {
        const docID=Date.now().toString();
        await setDoc(doc(db, "AI-Trip-Details",docID), {
        destination,
        days,
        budget,
        people,
        tripData: JSON.parse(tripData),
        // email: user?.email,
        id:docID
      });
      setID(docID);
      return docID;
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };
  
  const updateData = async (id) => {
    if (!id) {
      console.error("ID or email is missing");
      return;
    }
  
    try {
      const currentUserEmail = auth.currentUser?.email;
      console.log("Current User Email:", currentUserEmail);
      const docRef = doc(db, "AI-Trip-Details", id);
      await updateDoc(docRef, {
        email: currentUserEmail,
      });
      console.log("Data updated successfully!");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const getData=async (id)=>{
    if (!id) {
      console.error("ID or email is missing");
      return;
    }

    try{
      const docRef=doc(db,"AI-Trip-Details",id);
      return await getDoc(docRef);
    }catch(error){
       alert(error.message)
    }
  }

  const fetchAllData = async () => {
    try {
      if (!auth.currentUser?.email) {
        console.error("User is not logged in or email is missing.");
        return [];
      }
  
      const q = query(
        collection(db, "AI-Trip-Details"),
        where("email", "==", auth.currentUser.email)
      );
  
      const querySnapshot = await getDocs(q);
  
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      return data;
    } catch (error) {
      console.error("Error fetching all data:", error);
      return [];
    }
  };
  
  
  
  
  

  return (
    <FirebaseContext.Provider value={{ Signup, Signin ,GoogleSignin,isLogged,logout,user,isFormCompleted,setForm,addData,id,setID,updateData,email,getData,fetchAllData}}>
      {children}
    </FirebaseContext.Provider>
  );
}
