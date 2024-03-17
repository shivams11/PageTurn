import {initializeApp} from 'firebase/app'
import { createContext, useContext, useEffect, useState } from 'react'
import {getAuth,createUserWithEmailAndPassword,
        signInWithEmailAndPassword , GoogleAuthProvider,
        signInWithPopup , onAuthStateChanged } from 'firebase/auth'
import {getFirestore , collection, addDoc , getDocs , getDoc , doc , query ,where} from 'firebase/firestore'
import {getStorage , ref,uploadBytes ,getDownloadURL} from 'firebase/storage'

const FirebaseContext = createContext(null);
export const useFirebase = ()=> useContext(FirebaseContext)
const firebaseConfig = {
    apiKey: "AIzaSyBWIHqPUIuk2CmpGYE6MXkj7cHznqFFlZ8",
    authDomain: "booklify-ceadf.firebaseapp.com",
    projectId: "booklify-ceadf",
    storageBucket: "booklify-ceadf.appspot.com",
    messagingSenderId: "901792573380",
    appId: "1:901792573380:web:ce0196711731242137e691"
  };

 

  const firebaseApp = initializeApp(firebaseConfig)
  const Firebaseauth = getAuth(firebaseApp)
  const firestore= getFirestore(firebaseApp)
  const storage = getStorage(firebaseApp)

  const googleprovider = new GoogleAuthProvider();

export const FirebaseProvider = (prop)=>{

    const [user,setUser]=useState(null)

    useEffect(()=>{
        onAuthStateChanged(Firebaseauth,(user)=>{
            // console.log("user",user)
            user ? setUser(user) : setUser(null)
        })
      },[])


    const signupwithemail =(email,pass)=>{
        createUserWithEmailAndPassword(Firebaseauth,email,pass)
    }

    const signinwithemailpass=(email,pass)=> signInWithEmailAndPassword(Firebaseauth,email,pass);

    const signinwithGoogle=()=>signInWithPopup(Firebaseauth,googleprovider)

    
  

    const listallBooks = ()=>{
       return getDocs(collection(firestore,"books"))
    }

    const getBookById = async (id)=>{
        const docRef= doc(firestore,'books',id)
        const result = await getDoc(docRef)
        return result;
    }

    console.log(user)  
    // bag fakt kay da=etails ahe user chya tujhykade

    const getImageURL = (path) => {
        const url = getDownloadURL(ref(storage, path));
        // console.log('Image URL:', url);
        return url;
    };

   
    
    const handlecreatenewListing =async (name, isbn, price, cover) => {
        const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
        const uploadResult = await uploadBytes(imageRef, cover);
        return await addDoc(collection(firestore, "books"), {
          name,
          isbn,
          price,
          imageURL: uploadResult.ref.fullPath,
          userID: user.uid,
          userEmail: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      };

      const placeOrder =async(bookId, qnt)=>{
        const collectionRef = collection(firestore,'books',bookId,'orders')
        const result = await addDoc(collectionRef,{
          userID: user.uid,
          userEmail: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          qnt:Number(qnt)
        })
        return result
  }

  const fetchMyBooks = async(userId)=>{
      
       const collectionRef = collection(firestore,"books");
       const qa = query(collectionRef,where("userID" ,"==" ,userId))

       const result = await getDocs(qa)
      //  console.log(result)
       return result
  }

  const isloggedIn = user ? true :false;

  const getOrders =async(bookId)=>{
    const collectionRef= collection(firestore,'books',bookId,'orders');
    const result = await getDocs(collectionRef)
    return result
  }


    return <FirebaseContext.Provider
     value={{signupwithemail , signinwithemailpass , signinwithGoogle ,user, isloggedIn , handlecreatenewListing ,
     listallBooks , getImageURL , getBookById ,placeOrder ,fetchMyBooks ,getOrders}}>
        {prop.children}
    </FirebaseContext.Provider>
}
