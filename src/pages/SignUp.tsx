import React, { useContext,useState } from 'react'
import { AuthContext } from '../Context/FirebaseContext'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import {useNavigate} from 'react-router-dom'

const auth=getAuth()
const SignUp = () => {
const navigate=useNavigate()
const[email,setEmail ]=useState<string>('')
const[password,setPassword]= useState<string>('')
// const {currentUser}=useContext(AuthContext)
const handleonsubmit=(e:React.SyntheticEvent)=>{
    e.preventDefault()
    console.log(email,password)
    createUserWithEmailAndPassword(auth,email,password).then(()=>{
        navigate('/')
    })
}

    return (
        <div>SignUp
            <form onSubmit={handleonsubmit}>
                <input type='email' name='email' onChange={(e)=>{setEmail(e.target.value)}}/>
                <input type='password' name='password' onChange={(e)=>{setPassword(e.target.value)}}/>
                <button >SignUp</button>
            </form>
        </div>
    )
}

export default SignUp