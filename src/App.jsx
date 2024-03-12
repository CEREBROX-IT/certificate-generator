import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './screens/Dashboard'

function App() {

  return (

    <div className='parent-container'>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Dashboard/>} />
      </Routes>
    </BrowserRouter>
      </div>
  )
}

export default App
