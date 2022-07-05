import React,{useState,useEffect} from 'react';
import {auth} from "../firebase";

import {signInWithEmailAndPassword,signOut,onAuthStateChanged} from "firebase/auth";


function Login() {
  let [email,setEmail] = useState("");
  let [password,setPassword] =useState("");
  let [user,setUser] = useState(null);
  let [loader, setLoader] = useState(false);
  let [error, setError] = useState("");
  let [mainLoader,setMainLoader] = useState(true);



  const trackEmail = function (e) 
  {
    setEmail(e.target.value);
  }
  const trackPassword = function (e) 
  {
    setPassword(e.target.value);
  }
  const signout = async function () {
    // ye call hoga 
    await signOut(auth);
    setUser(null);
  }
  const printDetails = async function()
  {
    // alert(email + " " + password);
    try {
      setLoader(true);
      // signin call hoga 
      let userCred = await
      signInWithEmailAndPassword(auth, email, password)
      // console.log(userCred.user);
      setUser(userCred.user);
      setTimeout(() => {
        setUser(null)
      }, 2000)
    } 
    catch (err) 
    {
      setError(err.message);
      // after some time -> error message remove 
      setTimeout(() => {
        setError("")
      }, 2000)
    }
    setLoader(false);
  }

  // This is kind of an event listner If the user is not signed out previously
  // it will automatically login else it will go on to the login form
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user)
        // ...
      } else {
        // User is signed out
        // ...
        setUser(null);
      }
      setMainLoader(false);
    });
  }, []); // [] only once it should run

  return (
    <>
      {
      
       mainLoader == true ? <h1>Page Loading....</h1> : 
       error != "" ? <h1>Error is {error}</h1> 
       :
          loader == true ? <h1>...Loading</h1> 
          :
            user != null ?
              <>
                <button onClick={signout}>Signout</button>
                <h1>user is {user.uid}</h1>
              </>
              :
              <>
                <input type="email" onChange={trackEmail} value={email} placeholder="email" ></input>
                <br></br>
                <input type="password" onChange={trackPassword} value={password} placeholder="password"></input>
                <br></br>
                <button type="click" onClick={printDetails}>Login</button>
              </>
      }
    </>
  )
}
export default Login;