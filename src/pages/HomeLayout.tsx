import React from 'react'
import {Link, Outlet} from 'react-router-dom'
const HomeLayout = () => {
  
  return (
    <div>
        <div className='flex justify-between px-4 m-3'>
            <div>Home Page</div>
            <Link to={'enrolledcourse'} className='text-blue-400'>Go To Student dashboard</Link>    
        </div>
        <Outlet/>
    </div>
  )
}

export default HomeLayout