import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import WaterDrops from './components/WaterDrops'
import BlobBackground from './components/BlobBackground'
import HomePage from './pages/HomePage'
import FashionPage from './pages/FashionPage'
import VODPage from './pages/VODPage'
import HistoryPage from './pages/HistoryPage'

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen">
        {/* Animated Backgrounds */}
        <WaterDrops />
        <BlobBackground />

        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/fashion" element={<FashionPage />} />
            <Route path="/vod" element={<VODPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
