import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'

const Routing = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Routing