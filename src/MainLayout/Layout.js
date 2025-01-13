import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import './Layout.css'
const Layout = () => {
    return (
        <>
            <div>
                <Header />
            </div>
            <div>
                <Sidebar />
            </div>
            <div className='main-layout'>
                <Outlet />
            </div>
        </>
    )
}

export default Layout