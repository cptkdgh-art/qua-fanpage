import { quaProfile } from '../data/quaProfile'
import { motion } from 'framer-motion'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 pb-32">
      {/* Hero Section */}
      <HeroSection />

      {/* Profile Section */}
      <ProfileSection />

      {/* Stats Section */}
      <StatsSection />

      {/* About Section */}
      <AboutSection />

      {/* Rankings Section */}
      <RankingsSection />

      {/* Covers Section */}
      <CoversSection />
    </div>
  )
}

// Hero Section
function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative py-20 text-center"
    >
      {/* Profile Image with Bunny Ears */}
      <div className="relative inline-block mb-8">
        {/* Bunny Ears */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex gap-6">
          <motion.div
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-8 h-24 bg-gradient-to-b from-qua-pink-400 to-qua-pink-200 rounded-full shadow-lg"
            style={{ transform: 'rotate(-15deg)' }}
          />
          <motion.div
            animate={{ rotate: [5, -5, 5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-8 h-24 bg-gradient-to-b from-qua-pink-400 to-qua-pink-200 rounded-full shadow-lg"
            style={{ transform: 'rotate(15deg)' }}
          />
        </div>

        {/* Profile Picture */}
        <div className="relative w-48 h-48 rounded-full overflow-hidden ring-8 ring-white/50 shadow-2xl float-animation">
          <img
            src="/images/hero/qua-profile.webp"
            alt="쿠아"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/200/ff6b9d/ffffff?text=QUA'
            }}
          />
        </div>

        {/* Water Drops around profile */}
        <div className="absolute top-0 left-0 w-4 h-4 bg-qua-mint-400 rounded-full animate-bounce-slow opacity-60" />
        <div className="absolute top-10 right-0 w-3 h-3 bg-qua-lavender-400 rounded-full animate-bounce-slow opacity-60" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-10 left-2 w-5 h-5 bg-qua-pink-400 rounded-full animate-bounce-slow opacity-60" style={{ animationDelay: '1s' }} />
      </div>

      {/* Name */}
      <motion.h1
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="text-7xl font-bold mb-4 font-cute"
      >
        <span className="bg-gradient-to-r from-qua-pink-500 via-qua-lavender-500 to-qua-mint-500 bg-clip-text text-transparent">
          {quaProfile.nickname}
        </span>
      </motion.h1>

      {/* Tags */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <span className="px-4 py-2 bg-gradient-to-r from-qua-pink-400/30 to-qua-pink-500/30 backdrop-blur-sm rounded-full text-qua-pink-700 text-sm font-medium border border-qua-pink-300">
          🐰 토끼
        </span>
        <span className="px-4 py-2 bg-gradient-to-r from-qua-mint-400/30 to-qua-mint-500/30 backdrop-blur-sm rounded-full text-qua-mint-700 text-sm font-medium border border-qua-mint-300">
          💧 물멍이
        </span>
        <span className="px-4 py-2 bg-gradient-to-r from-qua-lavender-400/30 to-qua-lavender-500/30 backdrop-blur-sm rounded-full text-qua-lavender-700 text-sm font-medium border border-qua-lavender-300">
          🎤 버추얼
        </span>
      </div>

      {/* Short Intro */}
      <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
        {quaProfile.intro.short}
      </p>

      {/* Social Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <SocialButton
          href={quaProfile.social.soop}
          icon="🎥"
          label="SOOP 방송국"
          gradient="from-qua-mint-500 to-qua-mint-600"
        />
        <SocialButton
          href={quaProfile.social.youtube}
          icon="▶️"
          label="YouTube"
          gradient="from-red-500 to-red-600"
        />
        <SocialButton
          href={quaProfile.social.cafe}
          icon="☕"
          label="팬카페"
          gradient="from-green-500 to-green-600"
        />
        <SocialButton
          href={quaProfile.social.fancim}
          icon="💝"
          label="팬심"
          gradient="from-qua-pink-500 to-qua-pink-600"
        />
      </div>
    </motion.section>
  )
}

function SocialButton({ href, icon, label, gradient }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`px-6 py-3 bg-gradient-to-r ${gradient} text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2`}
    >
      <span>{icon}</span>
      {label}
    </motion.a>
  )
}

// Profile Section
function ProfileSection() {
  return (
    <section className="py-16">
      <h2 className="text-4xl font-bold text-center mb-12 font-cute bg-gradient-to-r from-qua-pink-500 to-qua-lavender-500 bg-clip-text text-transparent">
        쿠아 프로필 💫
      </h2>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Basic Info Card */}
        <div className="glass-card glass-card-hover rounded-[2rem] p-8">
          <h3 className="text-2xl font-bold mb-6 text-qua-pink-600">기본 정보</h3>
          <div className="space-y-4">
            <InfoRow label="이름" value={quaProfile.name} />
            <InfoRow label="나이" value={`${quaProfile.age}살`} />
            <InfoRow label="생일" value={quaProfile.birthday} />
            <InfoRow label="MBTI" value={quaProfile.mbti} />
            <InfoRow label="소속" value={quaProfile.company} />
            <InfoRow label="데뷔일" value={quaProfile.debutDate} />
          </div>
        </div>

        {/* Preferences Card */}
        <div className="glass-card glass-card-hover rounded-[2rem] p-8">
          <h3 className="text-2xl font-bold mb-6 text-qua-mint-600">취향</h3>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">💕</span>
                <span className="font-semibold text-gray-700">좋아하는 것</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {quaProfile.likes.map((item, i) => (
                  <span key={i} className="px-3 py-1 bg-qua-pink-100 text-qua-pink-700 rounded-full text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">💔</span>
                <span className="font-semibold text-gray-700">싫어하는 것</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {quaProfile.dislikes.map((item, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200/50 pb-3">
      <span className="text-gray-600 font-medium">{label}</span>
      <span className="text-gray-900 font-semibold">{value}</span>
    </div>
  )
}

// Stats Section
function StatsSection() {
  return (
    <section className="py-16">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <StatCard icon="⭐" label="즐겨찾기" value={quaProfile.stats.favorites} gradient="from-qua-pink-400 to-qua-pink-600" />
        <StatCard icon="💝" label="구독자" value={quaProfile.stats.subscribers} gradient="from-qua-lavender-400 to-qua-lavender-600" />
        <StatCard icon="🎬" label="총 VOD" value={quaProfile.stats.totalVODs} gradient="from-qua-mint-400 to-qua-mint-600" />
      </div>
    </section>
  )
}

function StatCard({ icon, label, value, gradient }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-card rounded-[2rem] p-6 text-center"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className={`text-2xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
        {value}
      </div>
    </motion.div>
  )
}

// About Section
function AboutSection() {
  return (
    <section className="py-16">
      <div className="glass-card rounded-[2rem] p-12 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8 font-cute bg-gradient-to-r from-qua-pink-500 to-qua-mint-500 bg-clip-text text-transparent">
          쿠아를 소개합니다! 🐰💧
        </h2>
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
          {quaProfile.intro.long}
        </div>

        {/* Content Tags */}
        <div className="mt-8 pt-8 border-t border-gray-200/50">
          <h3 className="text-xl font-bold mb-4 text-gray-800">방송 컨텐츠</h3>
          <div className="flex flex-wrap gap-3">
            {[...quaProfile.content.main, ...quaProfile.content.games, ...quaProfile.content.special].map((item, i) => (
              <span key={i} className="px-4 py-2 glass-card rounded-full text-sm font-medium text-gray-700 hover:scale-105 transition-transform">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Rankings Section
function RankingsSection() {
  return (
    <section className="py-16">
      <h2 className="text-4xl font-bold text-center mb-12 font-cute bg-gradient-to-r from-qua-lavender-500 to-qua-pink-500 bg-clip-text text-transparent">
        물멍이 랭킹 🏆
      </h2>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Support Fans */}
        <div className="glass-card rounded-[2rem] p-8">
          <h3 className="text-2xl font-bold mb-6 text-qua-pink-600 flex items-center gap-2">
            <span>💖</span> 열혈팬
          </h3>
          <div className="space-y-4">
            {quaProfile.rankings.supportFans.map((fan) => (
              <RankingCard key={fan.rank} fan={fan} />
            ))}
          </div>
        </div>

        {/* Subscribe Fans */}
        <div className="glass-card rounded-[2rem] p-8">
          <h3 className="text-2xl font-bold mb-6 text-qua-mint-600 flex items-center gap-2">
            <span>⭐</span> 구독팬
          </h3>
          <div className="space-y-4">
            {quaProfile.rankings.subscribeFans.map((fan) => (
              <RankingCard key={fan.rank} fan={fan} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function RankingCard({ fan }) {
  const rankColors = {
    1: 'from-yellow-400 to-yellow-600',
    2: 'from-gray-300 to-gray-500',
    3: 'from-orange-400 to-orange-600',
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-white/40 rounded-2xl hover:bg-white/60 transition-all">
      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${rankColors[fan.rank]} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
        {fan.rank}
      </div>
      <div className="flex-1">
        <div className="font-bold text-gray-900">{fan.nickname}</div>
        <div className="text-sm text-gray-600">{fan.id}</div>
      </div>
      {fan.badge && (
        <span className="px-3 py-1 bg-qua-pink-100 text-qua-pink-700 rounded-full text-xs font-medium">
          {fan.badge}
        </span>
      )}
    </div>
  )
}

// Covers Section
function CoversSection() {
  return (
    <section className="py-16">
      <h2 className="text-4xl font-bold text-center mb-12 font-cute bg-gradient-to-r from-qua-mint-500 to-qua-lavender-500 bg-clip-text text-transparent">
        노래 커버 🎵
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {quaProfile.covers.map((cover, i) => (
          <motion.a
            key={i}
            href={cover.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass-card glass-card-hover rounded-[1.5rem] p-6"
          >
            <div className="text-3xl mb-3">🎤</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{cover.title}</h3>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{cover.date}</span>
              <span>👁️ {cover.views}</span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
