import React, { useEffect, useState } from 'react';
import { CourseProps } from '../MockData/CourseTypes';
import { collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../FirebaseConfig";
import axios from 'axios';
import { customFetch } from '../utils/Api';

interface CourseCardProps {
    course?: CourseProps;
  }

const StudentCard: React.FC<CourseCardProps> = ({ course }) => {
const user = auth.currentUser;
const[isCompleted,setIsCompleted]=useState(false)
const getstatus=async ()=>{
    const res= await customFetch.get(`enrollments/${user?.uid}/${course?.id}/course-status`)
    // console.log("completed",res.data.iscompleted)
    setIsCompleted(res.data.iscompleted)
}
useEffect(()=>{
    getstatus()
},[])
 const handleMarkAsCompleted=async ()=>{
        // console.log(course?.id,user )
        try {
            await customFetch.post('enrollments/course-mark-completed/',{
              "studentId":user?.uid,
              "courseId":course?.id
            }).then((res:any)=>{
              console.log("res.........",res)
              setIsCompleted(()=>res.data.iscompleted)
            })
        } catch (e) {
          console.error("Error adding document: ", e);
        }
 }
 
  return (
    <div className="border p-4 cursor-pointer" >
          <h2 className="text-xl font-semibold mb-2">{course?.name}</h2>
          <p className="text-gray-600">Instructor: {course?.Instructor}</p>
          <p>{course?.Description}</p>
          <div className='mt-3'>  
              <span className='text-xl'>Course Status:  </span>
              <button className={isCompleted?'bg-red-600 text-white p-1  text-2xl px-3 rounded-2xl': 'bg-green-600 text-white p-1  text-2xl px-3 rounded-2xl'} onClick={() => handleMarkAsCompleted()}>{isCompleted?'Completed':'In Progress'}</button>
          </div>
        </div>
    // <li key={course?.id}>
    //     <strong>{course?.name}</strong>
    //     {/* <p>Progress: {course?.progress[studentId] || 0}%</p> */}
        
    // </li>
  );
};

export default StudentCard

