import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import UserManagement from '../pages/UserManagement'
import NotFound from '../pages/NotFound'
import BlogManagement from '../pages/BlogManagement'
import Subscription from '../pages/Subscription'
import FAQManagement from '../pages/FAQManagement'
import Support from '../pages/Support'
import Settings from '../pages/Settings'
import Banner from '../pages/Banner'

const Routing = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='*' element={<NotFound/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/dashboard/users' element={<UserManagement/>}/>
            <Route path='/dashboard/blogs' element={<BlogManagement/>}/>
            <Route path='/dashboard/subscription' element={<Subscription/>}/>
            <Route path='/dashboard/faq' element={<FAQManagement/>}/>
            <Route path='/dashboard/support' element={<Support/>}/>
            <Route path='/dashboard/banner' element={<Banner/>}/>
            <Route path='/dashboard/settings' element={<Settings/>}/>
            {/* <Route path='/dashboard/users' element={<UserManagement/>}/> */}
        </Routes>
    </BrowserRouter>
  )
}

export default Routing