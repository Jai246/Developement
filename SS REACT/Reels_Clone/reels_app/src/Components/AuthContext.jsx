import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";

export const AuthContext = React.createContext();
// Children refers to an inbuilt prop
// it refers all the components inside
export function AuthContextProvider({children}) {
    let [mainLoader,setMainLoader] = useState(true);
    let [cUser,setUser] = useState(null);

    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setUser(user);
            }
            else
            {
                setUser(null);
            }
            setMainLoader(false);
        });
    },[]);


    let value = cUser; 

    return (
        <AuthContext.Provider value = {value}>
        {
            mainLoader == false && children
        }
        </AuthContext.Provider>
    )
}