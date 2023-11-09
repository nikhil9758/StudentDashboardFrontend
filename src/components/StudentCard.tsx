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
    <li key={course?.id}>
        <strong>{course?.name}</strong>
        {/* <p>Progress: {course?.progress[studentId] || 0}%</p> */}
        <button onClick={() => handleMarkAsCompleted()}>{isCompleted?'Completed':'In Progress'}</button>
    </li>
  );
};

export default StudentCard

