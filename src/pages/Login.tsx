import React, { useState } from 'react'
import { getDatabase,set,ref } from 'firebase/database' 
import { app,auth } from '../FirebaseConfig'
import {  signInWithEmailAndPassword } from 'firebase/auth'
import {useNavigate} from 'react-router-dom'

const db=getDatabase(app)
// const auth=getAuth()

const Login: React.FC = () => {
const navigate= useNavigate()
const[email,setEmail ]=useState<string>('')
const[password,setPassword]= useState<string>('')

const handleonsubmit=(e:React.SyntheticEvent)=>{
    e.preventDefault()
    signInWithEmailAndPassword(auth,email,password).then(()=>{
        navigate('/')
    })
}

// const handleOnChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
//     console.log(e.target.name)
//     se

// }

  return (
    <div>
        Login<br/>
        <form onSubmit={handleonsubmit}>
            <input type='email' name="email" onChange={(e)=>{setEmail(e.target.value)}}/><br/>
            <input type='password' name='password' onChange={(e)=>{setPassword(e.target.value)}}/><br/>
            <button type='submit'> login</button>
        </form>
    </div>
  )
}

export default Login