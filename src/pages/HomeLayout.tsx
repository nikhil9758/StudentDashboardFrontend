import React from 'react'
import {Link, Outlet} from 'react-router-dom'
const HomeLayout = () => {
  
  return (
    <div>HomeLayout
      <Link to={'enrolledcourse'}>Student dashboard</Link>
        <Outlet/>
    </div>
  )
}

export default HomeLayout