import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './screens/Landing'
import Dashboard from './screens/Dashboard'
function App() {

  return (

    <div className='parent-container'>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Landing/>} />
        <Route path='/dashboard' element={ <Dashboard/>} />
      </Routes>
    </BrowserRouter>
      </div>
  )
}

export default App
