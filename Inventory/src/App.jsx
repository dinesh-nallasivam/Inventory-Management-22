import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import Login from "./pages/Login"
import Index from './pages/Index';

function App() {

  return (
    <div className="h-screen">
        <Router>
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/login"/>} />
              <Route path="/*" element={<Index />} />
          </Routes>
        </Router>
    </div>
  )
}

export default App
