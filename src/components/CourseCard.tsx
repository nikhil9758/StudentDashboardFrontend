import React from 'react';
import {useNavigate} from 'react-router-dom'
import { CourseProps } from '../MockData/CourseTypes';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Store';
import { fetchStudentEnrolledCourses, updateEnrolledCourse } from '../features/StudentSlice';
import { collection, updateDoc,doc, Firestore, addDoc, setDoc } from "firebase/firestore"; 
import { auth, db } from "../FirebaseConfig";
import axios from 'axios';
import { customFetch } from '../utils/Api';

interface CourseCardProps {
  course?: CourseProps;
}
const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const dispatch=useDispatch<AppDispatch>()
  const Currentuser = auth.currentUser;
  const enrolledcourses= useSelector((state: RootState)=>state.StudentReducer.enrolledCourses)
  console.log(enrolledcourses)
  const isEnrolled=enrolledcourses?.includes(course?.id.toString())
  const enrolledcourseButton= isEnrolled?'text-center bg-gray-400 text-white w-full': 'text-center bg-green-400 text-white w-full'
  console.log(enrolledcourseButton,"Button eroled")
  const navigate= useNavigate()
  const showCourseDetails = () => {
    navigate(`/coursedetail/${course?.id}`)
  };

  const handleOnClick=async ()=>{
    try {
      console.log("enrolling")
      //here user click on enroll the course
      await customFetch.post('enroll/',{
        "studentId":Currentuser?.uid,
        "courseId":course?.id.toString()
      })
      console.log("document refeence")
      //fetch lastest changes
      dispatch(fetchStudentEnrolledCourses())
      //here we also create the studentcourse table
      const studcoursedocref= await setDoc( doc(collection(db,'usercourse')),{courseId:course?.id, studentId: Currentuser?.uid, iscompleted: false} ,{merge: true})
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    // dispatch(updateEnrolledCourse(course?.id))
  }
  return (
    <div>
        <div className="border p-4 cursor-pointer" onClick={showCourseDetails}>
          <h2 className="text-xl font-semibold mb-2">{course?.name}</h2>
          <p className="text-gray-600">Instructor: {course?.Instructor}</p>
          <p>{course?.Description}</p>
        </div>
        <button className={enrolledcourseButton} disabled={isEnrolled} onClick={handleOnClick}>{isEnrolled?'Enrolled':'Enroll'}</button>
    </div>
  );
};

export default CourseCard;

