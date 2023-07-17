import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CreateUser from 'pages/CreateUser/CreateUser'
import Sidebar from 'components/SideBar/sideBar'
import Dashboard from 'pages/Dashboard/dashboard'
import NotFound from 'pages/NotFound'

export default function PrivatePages({isLogged, userData, isMobile}) {
  return (
    <div style={{display:"flex"}}>
        <Sidebar isLogged={isLogged} userData={userData}/>
        <Routes>
            <Route path="/dashboard/home" exact element={<Dashboard />}/>
            <Route path="/dashboard/createUser" exact element={isLogged && userData && userData[0].type == "admin" ? <CreateUser isMobile={isMobile} userData={userData}/> : null} />
            <Route path="*" element={<NotFound />} />
            <Route path="/404" element={<NotFound />} />
        </Routes>
    </div>
  )
}
