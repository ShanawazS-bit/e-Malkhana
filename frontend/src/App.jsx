import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Dashboard from '@/dashboard'
import CaseEntryPage from '@/pages/case-entry'
import axios from 'axios'
import LoginPage from '@/pages/login'
import './App.css'

function Home() {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/hello/')
      .then(response => {
        setMessage(response.data.message)
      })
      .catch(error => {
        console.error("There was an error fetching the message!", error)
        setError('Failed to fetch data from backend')
      })
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Webteam Project
      </h1>
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 mb-4">
        <div>
          <div className="text-xl font-medium text-black">Backend Status</div>
          <p className="text-gray-500">{message || error || "Loading..."}</p>
        </div>
      </div>
      <Link to="/login" className="text-blue-500 hover:underline">
        Login Page
      </Link>
    </div>
  )
}

import MovementEntryPage from '@/pages/movement-entry'
import ManageEntriesPage from '@/pages/manage-entries'



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/case-entry" element={<CaseEntryPage />} />
        <Route path="/movement-entry" element={<MovementEntryPage />} />
        <Route path="/manage-entries" element={<ManageEntriesPage />} />
      </Routes>
    </Router>
  )
}

export default App
