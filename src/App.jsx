import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './screens/Dashboard'

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
