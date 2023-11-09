import React, { useContext,useState } from 'react'
import { AuthContext } from '../Context/FirebaseContext'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import {Link, useNavigate} from 'react-router-dom'
import { customFetch } from '../utils/Api'

const auth=getAuth()
const SignUp = () => {
const navigate=useNavigate()
const[email,setEmail ]=useState<string>('')
const[password,setPassword]= useState<string>('')
// const {currentUser}=useContext(AuthContext)
const handleonsubmit=(e:React.SyntheticEvent)=>{
    e.preventDefault()
    console.log(email,password,auth?.currentUser?.uid)
    createUserWithEmailAndPassword(auth,email,password).then(()=>{
        customFetch.post('enrollments/createcourse',{
            "studentId":auth?.currentUser?.uid
        })
        navigate('/')
    })
}

    return (
        <div className="container mx-auto mt-10">
      <div className="max-w-md mx-auto bg-white p-5 rounded shadow-md">
        <h2 className="text-2xl font-semibold">Sign Up</h2>
            <form onSubmit={handleonsubmit}>
                <input type='email' name='email' className='w-full m-2 text-xl p-2 border-[2px] border-neutral-800' onChange={(e)=>{setEmail(e.target.value)}}/>
                <input type='password' name='password' className='w-full m-2 text-xl p-2 border-[2px] border-neutral-800' onChange={(e)=>{setPassword(e.target.value)}}/>
                <button className='text-xl bg-green-500 text-white p-2 m-2 rounded-xl w-full'>SignUp</button>
            </form>
            <div>
                Do You Want to <Link to="/login" className='text-blue-500'>Login</Link>? 
            </div>
            </div>
    </div>
    )
}

export default SignUp