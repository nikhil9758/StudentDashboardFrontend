import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../FirebaseConfig";
import { useContext } from "react";
import { AuthContext } from "../Context/FirebaseContext";
import { courseItem } from "../MockData/CourseData";
import axios from "axios";
import { customFetch } from "../utils/Api";

const initialState: any={
    enrolledCourses: null
}

export const fetchStudentEnrolledCourses=createAsyncThunk(
    '/student/fetchStudentEnrolledCourses.',
    async()=>{
        const user = auth.currentUser;
        console.log("inside student thunk")
        const res= await customFetch.get(`enrollments/${user?.uid}/enrolled-courses`)
        console.log("studentres", res.data.enrolledcourses)
        return res.data.enrolledcourses
})

const StudentSlice= createSlice({
    name: 'student',
    initialState,
    reducers:{
        getEnrolledCourses:(state,action)=>{
            // enrolledCourses.map((id)=>{
            //     console.log("curent",id,courses)
            //     return courses.find((course)=>course.id.toString()===id)
            //   })
        },
        updateEnrolledCourse:(state,action)=>{
            const Courseid=action.payload
            console.log("update courseid",Courseid)
            
            state.enrolledCourses=[...state.enrolledCourses,action.payload]
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchStudentEnrolledCourses.pending, (state) => {
            // state.courseDetails.loading = true;
            // state.courseDetails.error = null;
          })
          .addCase(fetchStudentEnrolledCourses.fulfilled, (state, action) => {
            // state.courseDetails.loading = false;
            // state.courseDetails.data = action.payload;
            console.log("inside student full",action.payload)
            state.enrolledCourses=action.payload
            
          })
          .addCase(fetchStudentEnrolledCourses.rejected, (state, action) => {
            // state.courseDetails.loading = false;
            // state.courseDetails.error = action.error.message;
          });
      },
})

export const {getEnrolledCourses,updateEnrolledCourse} = StudentSlice.actions
export default StudentSlice.reducer