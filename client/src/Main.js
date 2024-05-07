import React from 'react'
import Sidebar from './Components/sidebar/sidebar'
import Navbar from './Components/Navbar'
import { Outlet } from 'react-router-dom'

function Main() {
  return (
    <div>
        <Navbar/>
        <div style={{paddingTop:"45px"}}>
        <Sidebar />
        <div style={{paddingLeft:"248px"}}>
          <Outlet/>
        </div>
        </div>
    </div>
  )
}

export default Main