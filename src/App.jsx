import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import QCMFemmeEnceinte from './pages/QCMFemmeEnceinte'
import QCMOpioides from './pages/QCMOpioides'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/femme-enceinte" element={<QCMFemmeEnceinte />} />
          <Route path="/opioides" element={<QCMOpioides />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
