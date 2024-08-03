import React from 'react'
import { Routes,Route, Navigate } from 'react-router-dom'
import Auth from './pages/Auth'
import Chat from './pages/Chat'
import Profile from './pages/Profile'

const App = () => {
  return (
        <Routes>
          <Route  path='/auth' element={<Auth />}/>
          <Route  path='/chat' element={<Chat />}/>
          <Route  path='/profile' element={<Profile />}/>

          <Route  path='*' element={<Navigate to="/auth" />}/>
        </Routes>
  )
}

export default App