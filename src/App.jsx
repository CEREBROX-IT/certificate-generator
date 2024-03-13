import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './screens/Landing'
import Option1 from './screens/AcademicExcellence/Option1'
function App() {

  return (

    <div className='parent-container'>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Landing/>} />
        <Route path='/academic-excellence/template/1' element={ <Option1/>} />
      </Routes>
    </BrowserRouter>
      </div>
  )
}

export default App
