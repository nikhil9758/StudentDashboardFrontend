import React, { useEffect, useState } from 'react';
import CourseCard from './CourseCard';
import { fetchCourseDetails } from '../features/CourseSlice';
import {useDispatch, useSelector,} from 'react-redux'
import {AppDispatch,RootState} from '../Store'
import { getAuth,signOut } from 'firebase/auth';
import { auth } from '../FirebaseConfig';
import { fetchStudentEnrolledCourses } from '../features/StudentSlice';
// const auth=getAuth()
const CourseList: React.FC = () => {
    const dispatch= useDispatch<AppDispatch>()
    const courses= useSelector((state: RootState)=>state.reducer.courses)
    console.log("inside courselist",courses)
  const [searchTerm, setSearchTerm] = useState<string>('');
  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.Instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(()=>{
      dispatch(fetchCourseDetails())
      dispatch(fetchStudentEnrolledCourses())
  },[])
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Course Listing</h1>
      <input
        type="text"
        className="w-full p-2 mb-4 border rounded"
        placeholder="Search by Course or Instructor"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
        <button onClick={()=>{signOut(auth)}}>signout</button>
      </div>
    </div>
  );
};

export default CourseList;