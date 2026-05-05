import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Course from './components/Course'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BMICalculator from './components/BMICalculator'
import AgeCalculator from './components/Agecalculator'
import TodoApp from './components/TodoApp'
import ExpenseTracker from './components/ExpensiveTracker'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
    <BrowserRouter>
    <Routes>
      <Route path='/'  element={<Course />}></Route>
      <Route path='/bmi'  element={<BMICalculator />}></Route>
      <Route path='/age'  element={<AgeCalculator />}></Route>
      <Route path='/To-d'  element={<TodoApp />}></Route>
      <Route path='/expe'  element={<ExpenseTracker />}></Route>
    </Routes>
    </BrowserRouter>

          </>
  )
}

export default App
