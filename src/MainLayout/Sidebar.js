import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
const Sidebar = () => {
  return (
  <>
  <div class="sidebar">
  <a class="sidebar-brand" href="#">Admin Dashboard</a>
  <div class="sidebar-nav">
    {/* <a class="nav-item active" href="#">Home <span class="sr-only">(current)</span></a> */}
    <Link to='/layout/home' className="nav-item active">Home</Link>
    <Link to='/layout/userlist' className="nav-item">User Table</Link>
    <a class="nav-item" href="#">Features</a>
    <a class="nav-item" href="#">Pricing</a>
    <a class="nav-item disabled" href="#">Disabled</a>
  </div>
</div>

  </>
  )
}

export default Sidebar