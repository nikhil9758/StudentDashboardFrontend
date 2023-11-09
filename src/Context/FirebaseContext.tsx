import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { createContext, useState, useEffect } from 'react'
import { app,auth } from '../FirebaseConfig'
// import firebase from 'firebase/app'
interface User{
    email: string,
    password: string
}
interface props{
    children: React.ReactNode
}

export const AuthContext=createContext<any>(null)

const FirebaseContext:React.FC<props> = ({children}) => {
const[currentUser,setCurrentUser]=useState<any>(null)

useEffect(()=>{
    console.log("currentuser",currentUser)
},[currentUser])
useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
        console.log("statechanfde")
        setCurrentUser(user)
    })
},[])
  return (
    <AuthContext.Provider value={currentUser}>
            {children}
    </AuthContext.Provider>
  )
}

export default FirebaseContext