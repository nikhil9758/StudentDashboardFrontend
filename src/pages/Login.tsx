import React, { useState } from 'react'
import { getDatabase,set,ref } from 'firebase/database' 
import { app,auth } from '../FirebaseConfig'
import {  signInWithEmailAndPassword } from 'firebase/auth'
import {Link, useNavigate} from 'react-router-dom'

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
    <div className="container mx-auto mt-10">
      <div className="max-w-md mx-auto bg-white p-5 rounded shadow-md ">
      <h2 className="text-2xl font-semibold">Login</h2>
        <form onSubmit={handleonsubmit}>
            <input type='email' name="email" className='w-full m-2 text-xl p-2 border-[2px] border-neutral-800' onChange={(e)=>{setEmail(e.target.value)}}/><br/>
            <input type='password' name='password' className='w-full m-2 text-xl p-2 border-[2px] border-neutral-800' onChange={(e)=>{setPassword(e.target.value)}}/><br/>
            <button type='submit' className='text-xl bg-green-500 text-white p-2 m-2 rounded-xl w-full'> Submit</button>
        </form>
        <div>
          Do You Want to <Link to="/signup" className='text-blue-500'>Signup</Link>? 
        </div>
    </div>
    </div>
  )
}

export default Login