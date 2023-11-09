import reducer from './features/CourseSlice'
import { configureStore } from '@reduxjs/toolkit'
import StudentReducer from './features/StudentSlice'
export const store=configureStore({
    reducer:{
        reducer,StudentReducer
    }
})

export type AppDispatch=typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;

export default store