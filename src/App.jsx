import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import QCMFemmeEnceinte from './pages/QCMFemmeEnceinte'
import QCMOpioides from './pages/QCMOpioides'
import QCMAsthme from './pages/QCMAsthme'
import ComingSoon from './pages/ComingSoon'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/femme-enceinte" element={<QCMFemmeEnceinte />} />
          <Route path="/opioides" element={<QCMOpioides />} />
          <Route path="/asthme" element={<QCMAsthme />} />
          <Route path="/avk" element={<ComingSoon title="🩸 AVK" />} />
          <Route path="/aod" element={<ComingSoon title="💉 AOD" />} />
          <Route path="/complet" element={<ComingSoon title="⭐ QCM Complet" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
