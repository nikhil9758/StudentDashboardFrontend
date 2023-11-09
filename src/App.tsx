import React from 'react';
import logo from './logo.svg';
import CourseList from './components/CourseList';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import HomeLayout from './pages/HomeLayout';
import Landing from './pages/Landing';
import CourseDetails from './components/CourseDetails';
import { Provider } from 'react-redux';
import store from './Store';
import { initializeApp } from 'firebase/app';

import NewLogin from './pages/NewLogin';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import FirebaseContext from './Context/FirebaseContext';
import EnrolledCourses from './components/EnrolledCourses';


const router=createBrowserRouter([
  {
    path:'/',
    element:<HomeLayout/>,
    children:[
      {
        index: true,
        element: <Landing/>
      },{
        path: 'coursedetail/:id',
        element:<CourseDetails/>
      }
    ]
  },
  {
    path:'/login',
    element: <Login/>
  },{
    path:'signup',
    element: <SignUp/>
  },{
    path:'enrolledcourse',
    element: <EnrolledCourses/>
  }
])
function App() {
  
  return (
    
    <div className="text-3xl">
      
      <FirebaseContext>
        <Provider store={store}>
          
        <RouterProvider router={router}/>
        </Provider>
      </FirebaseContext>
       {/* <CourseList/> */}
    </div>
  );
}

export default App;
