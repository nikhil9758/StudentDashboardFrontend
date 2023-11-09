import { createSlice, PayloadAction,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { courseItem } from '../MockData/CourseData';
import { CourseProps } from '../MockData/CourseTypes';
import { customFetch } from '../utils/Api';
interface CourseState {
    selectedCourse: CourseProps | null;
    courses: CourseProps[]
}

const initialState: CourseState = {
    selectedCourse: null,
    courses:[]
};

export const fetchCourseDetails = createAsyncThunk(
  'course/fetchCourseDetails',
  async (thunkAPI) => {
    // Simulate an API call to fetch course details
    const res=await customFetch.get('courses') 
    console.log( "courseap",res.data.Courses)
    return res.data.Courses;
  }
);

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        setSelectedCourse: (state, action: PayloadAction<number>) => {
            console.log("payload",action.payload)
            state.selectedCourse = state.courses.find((item)=>item.id===action.payload)||null
            console.log(state.courses.find((item)=>item.id===action.payload))
        },
    },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseDetails.pending, (state) => {
        // state.courseDetails.loading = true;
        // state.courseDetails.error = null;
      })
      .addCase(fetchCourseDetails.fulfilled, (state, action) => {
        // state.courseDetails.loading = false;
        // state.courseDetails.data = action.payload;
        console.log("fullf")
        state.courses=action.payload
      })
      .addCase(fetchCourseDetails.rejected, (state, action) => {
        // state.courseDetails.loading = false;
        // state.courseDetails.error = action.error.message;
      });
  },

});

export const { setSelectedCourse } = courseSlice.actions;
export default courseSlice.reducer;

