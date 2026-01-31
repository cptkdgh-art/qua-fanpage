import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { path: '/', label: '홈', emoji: '🏠' },
    { path: '/fashion', label: '패션방', emoji: '👗' },
    { path: '/vod', label: 'VOD/캐치', emoji: '🎬' },
    { path: '/history', label: '히스토리', emoji: '📜' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 hidden md:block">
        <div className="glass-card mx-6 mt-6 rounded-[2rem] px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-qua-pink-400 ring-offset-2 transition-transform group-hover:scale-110">
                <img
                  src="/images/hero/qua-profile.webp"
                  alt="쿠아"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/48/ff6b9d/ffffff?text=QUA'
                  }}
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-qua-pink-500 to-qua-lavender-500 bg-clip-text text-transparent font-cute">
                  쿠아♪
                </h1>
                <p className="text-xs text-gray-600">물멍이들의 천국 💧</p>
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    relative px-6 py-3 rounded-[1.5rem] font-medium transition-all duration-300
                    ${isActive(item.path)
                      ? 'bg-gradient-to-r from-qua-pink-400 to-qua-lavender-400 text-white shadow-lg scale-105'
                      : 'text-gray-700 hover:bg-white/60'
                    }
                  `}
                >
                  <span className="mr-2">{item.emoji}</span>
                  {item.label}

                  {/* Bunny Ears on Active */}
                  {isActive(item.path) && (
                    <>
                      <div className="absolute -top-3 left-1/4 w-2 h-6 bg-gradient-to-b from-qua-pink-400 to-transparent rounded-full transform -rotate-12" />
                      <div className="absolute -top-3 right-1/4 w-2 h-6 bg-gradient-to-b from-qua-pink-400 to-transparent rounded-full transform rotate-12" />
                    </>
                  )}
                </Link>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.sooplive.co.kr/station/quaorv"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-qua-mint-400 to-qua-mint-600 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md"
                title="SOOP 방송국"
              >
                <span className="text-lg">🎥</span>
              </a>
              <a
                href="https://www.youtube.com/@qua_o0"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md"
                title="YouTube"
              >
                <span className="text-lg">▶</span>
              </a>
              <a
                href="https://cafe.naver.com/quazndk"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md"
                title="네이버 카페"
              >
                <span className="text-lg">📋</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="glass-card mx-4 mb-4 rounded-[2rem] px-4 py-3">
          <div className="flex items-center justify-around">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all
                  ${isActive(item.path)
                    ? 'bg-gradient-to-r from-qua-pink-400 to-qua-lavender-400 text-white scale-110'
                    : 'text-gray-600'
                  }
                `}
              >
                <span className="text-xl">{item.emoji}</span>
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Spacer for mobile */}
      <div className="h-24 md:h-32" />
    </>
  )
}
