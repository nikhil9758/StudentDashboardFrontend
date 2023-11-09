import React from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { setSelectedCourse } from '../features/CourseSlice';

import {useParams} from 'react-router-dom'
import { AppDispatch, RootState } from '../Store';

const CourseDetails: React.FC = () => {
const {id}= useParams()
const selectedid: string=id||'1'
const dispatch= useDispatch<AppDispatch>()
 dispatch(setSelectedCourse(parseInt(selectedid)))
const selectedCourse = useSelector((state: RootState)=>state.reducer.selectedCourse);
console.log(selectedCourse)
  if (!selectedCourse) {
    return <div>No course selected.</div>;
  }
    console.log(id)
  return (
    <div className="container mx-auto p-4">
        Details
      <h1 className="text-2xl font-bold mb-4">{selectedCourse?.name}</h1>
      <p>Instructor: {selectedCourse?.Instructor}</p>
      <p>Description: {selectedCourse?.Description}</p>
      <p>Enrollment Status: {selectedCourse?.Enrollmentstatus}</p>
      <p>Duration: {selectedCourse?.duration}</p>
      <p>Schedule: {selectedCourse?.Schedule}</p>
      <p>Location: {selectedCourse?.Location}</p>
      <p>Pre-requisites: {selectedCourse?.Prerequisites}</p>
      {/* <div>
        <p>Syllabus:</p>
        <p>{selectedCourse?.Syllabus.map}</p>
      </div> */}
    </div>
  );
};

export default CourseDetails;

