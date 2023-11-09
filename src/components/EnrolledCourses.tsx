import React, { useState, useEffect,useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { app, auth } from "../FirebaseConfig";
import { db } from "../FirebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Store";
import { CourseProps } from "../MockData/CourseTypes";
import { AuthContext } from "../Context/FirebaseContext";
import { fetchCourseDetails } from "../features/CourseSlice";
import CourseCard from "./CourseCard";
import { fetchStudentEnrolledCourses } from "../features/StudentSlice";
import StudentCard from "./StudentCard";

function EnrolledCourses() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const user = auth.currentUser;
  const dispatch= useDispatch<AppDispatch>()
  const data=useContext<any>(AuthContext)
  const courses= useSelector((state: RootState)=>state.reducer.courses)
  const student= useSelector((state:RootState)=>state.StudentReducer.enrolledCourses)
  console.log("stud",student)
  const getdata = async () => {
      console.log("here..............")
      const getsnap = await getDocs(collection(db, "usercourse"));
      getsnap.forEach(async (docs) => {
        //   if (docs.id === user?.uid){
            //   await setEnrolledCourses(docs.data().enrolledcourses)
              console.log("user mathed do", docs.data(), docs);
            // }
        });
    };
    useEffect(()=>{
        
        setEnrolledCourses(student)
    },[student])
    useEffect(() => {
        dispatch(fetchCourseDetails())
        dispatch(fetchStudentEnrolledCourses())
    getdata();
    
  }, [user,data]);

  const filterEnrolledCorses=enrolledCourses?.map((id)=>{
    console.log("curent",id,courses)
    return courses.find((course)=>course.id.toString()===id)
  })
  const handleMarkAsCompleted=(id: any)=>{
        console.log(id)
  }
  return (
    <div>
      <h3>Enrolled Courses</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-8">
        {filterEnrolledCorses?.map((course) => {     
            return (
                <StudentCard course={course}/>
              );
        })}
      </div>
    </div>
  );
}

export default EnrolledCourses;
