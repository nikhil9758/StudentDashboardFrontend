import React,{useContext,useEffect} from 'react'
import CourseList from '../components/CourseList'
import { AuthContext } from '../Context/FirebaseContext'
import { getAuth, signOut } from 'firebase/auth'
import{useNavigate} from 'react-router-dom'
const Landing = () => {
    const navigate= useNavigate()
  const data=useContext<any>(AuthContext)
  console.log("Landing",data?.auth?.currentUser?.uid)
  useEffect(()=>{
    if(!data){
      navigate('/login')
  }
  },[data])
  // !data?
  // return(
  //   <>
    
  //   </>
  // )
  
  return (
    <div>Landing
        <CourseList/>
    </div>
  )
}

export default Landing