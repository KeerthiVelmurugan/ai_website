import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BMICalculator from './components/BMICalculator'
import AgeCalculator from './components/Agecalculator'
import TodoApp from './components/TodoApp'
import ExpenseTracker from './components/ExpensiveTracker'
import WeatherApp from './components/WeatherApp'
import InvoiceGenerator from './components/InvoiceGenerator'

function App() {

  return (
    <>
    
    <BrowserRouter>
    <Routes>
      <Route path='/'  element={<InvoiceGenerator />}></Route>
      <Route path='/age'  element={<AgeCalculator />}></Route>
      <Route path='/To-do'  element={<TodoApp />}></Route>
      <Route path='/expense'  element={<ExpenseTracker />}></Route>
      <Route path='/weather' element={<WeatherApp />}></Route>
      <Route path='/bmi' element={<BMICalculator />}></Route>
    </Routes>
    </BrowserRouter>

          </>
  )
}

export default App
