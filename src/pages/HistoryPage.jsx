import { useState } from 'react'
import { motion } from 'framer-motion'
import { quaProfile } from '../data/quaProfile'
import { servers, serverCategories } from '../data/historyData'

export default function HistoryPage() {
  return (
    <div className="container mx-auto px-4 pb-32">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <h1 className="text-6xl font-bold mb-4 font-cute bg-gradient-to-r from-qua-lavender-500 via-qua-pink-500 to-qua-mint-500 bg-clip-text text-transparent">
          쿠아의 히스토리 📜✨
        </h1>
        <p className="text-lg text-gray-700">
          물멍이들과 함께한 특별한 순간들
        </p>
      </motion.div>

      {/* Servers & Competitions Section */}
      <ServersSection servers={servers} />

      {/* Timeline */}
      <TimelineSection achievements={quaProfile.achievements} />

      {/* Period Cards */}
      <PeriodsSection periods={quaProfile.periods} />
    </div>
  )
}

// Servers & Competitions Section
function ServersSection({ servers }) {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredServers = selectedCategory === 'all'
    ? servers
    : servers.filter(s => s.type === selectedCategory)

  return (
    <section className="py-12 mb-16">
      <h2 className="text-4xl font-bold text-center mb-8 font-cute bg-gradient-to-r from-qua-mint-500 to-qua-lavender-500 bg-clip-text text-transparent">
        참여한 서버 & 대회 🎮
      </h2>

      {/* Category Filter */}
      <div className="flex justify-center gap-3 mb-12">
        {serverCategories.map((cat) => (
          <motion.button
            key={cat.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(cat.id)}
            className={`
              px-6 py-3 rounded-[1.5rem] font-medium transition-all shadow-lg
              ${selectedCategory === cat.id
                ? 'bg-gradient-to-r from-qua-mint-400 to-qua-mint-600 text-white scale-105'
                : 'glass-card text-gray-700 hover:bg-white/60'
              }
            `}
          >
            <span className="mr-2">{cat.icon}</span>
            {cat.name}
          </motion.button>
        ))}
      </div>

      {/* Server Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredServers.map((server, index) => (
          <ServerCard key={server.id} server={server} index={index} />
        ))}
      </div>

      {filteredServers.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-6xl mb-4">🎮</div>
          <p className="text-lg">해당 카테고리의 활동이 없습니다</p>
        </div>
      )}
    </section>
  )
}

function ServerCard({ server, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass-card glass-card-hover rounded-[2rem] p-6 relative overflow-hidden"
    >
      {/* Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${server.color} opacity-10`}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon & Period */}
        <div className="flex items-start justify-between mb-4">
          <div className="text-5xl">{server.icon}</div>
          <div className="flex flex-col items-end gap-1">
            <span className="px-3 py-1 bg-white/40 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700">
              {server.period}
            </span>
            {server.endDate === null && (
              <span className="px-2 py-0.5 bg-gradient-to-r from-qua-mint-400 to-qua-mint-600 text-white rounded-full text-xs font-bold">
                진행중
              </span>
            )}
          </div>
        </div>

        {/* Name */}
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {server.name}
        </h3>

        {/* Host */}
        {server.host && (
          <p className="text-sm text-gray-600 mb-2">
            주최: {server.host}
          </p>
        )}

        {/* Description */}
        <p className="text-gray-700 mb-4">
          {server.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {server.tags.map((tag, i) => (
            <span
              key={i}
              className={`px-3 py-1 bg-gradient-to-r ${server.color} bg-opacity-20 rounded-full text-xs font-medium`}
              style={{ opacity: 0.8 }}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Type Badge */}
        <div className="mt-4 pt-4 border-t border-gray-200/50">
          <span className="text-xs font-bold text-gray-500 uppercase">
            {server.type === 'server' ? '🗄️ 서버' : '🏆 대회'}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

function TimelineSection({ achievements }) {
  return (
    <section className="py-12 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12 font-cute bg-gradient-to-r from-qua-pink-500 to-qua-lavender-500 bg-clip-text text-transparent">
        주요 활동 타임라인 ⏰
      </h2>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-qua-pink-300 via-qua-lavender-300 to-qua-mint-300 transform -translate-x-1/2 hidden md:block" />

        {/* Timeline Items */}
        <div className="space-y-12">
          {achievements.map((achievement, index) => (
            <TimelineItem
              key={index}
              achievement={achievement}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function TimelineItem({ achievement, index }) {
  const isLeft = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col gap-8`}
    >
      {/* Content Card */}
      <div className="flex-1 md:w-1/2">
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className="glass-card glass-card-hover rounded-[2rem] p-8"
        >
          {/* Date Badge */}
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-qua-pink-400 to-qua-lavender-400 text-white rounded-full text-sm font-bold mb-4">
            {achievement.date}
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            {achievement.title}
          </h3>

          <p className="text-gray-700 leading-relaxed">
            {achievement.detail}
          </p>

          {/* Decorative Element */}
          <div className="mt-4 flex gap-2">
            <span className="text-2xl">✨</span>
            <span className="text-2xl">🎉</span>
            <span className="text-2xl">💫</span>
          </div>
        </motion.div>
      </div>

      {/* Timeline Dot */}
      <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3 }}
          className="w-6 h-6 rounded-full bg-gradient-to-br from-qua-pink-500 to-qua-lavender-500 ring-4 ring-white shadow-lg"
        />
      </div>

      {/* Spacer */}
      <div className="hidden md:block flex-1" />
    </motion.div>
  )
}

function PeriodsSection({ periods }) {
  return (
    <section className="py-16">
      <h2 className="text-4xl font-bold text-center mb-12 font-cute bg-gradient-to-r from-qua-pink-500 to-qua-mint-500 bg-clip-text text-transparent">
        활동 기간 🗓️
      </h2>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* 구쿠아 */}
        <motion.div
          whileHover={{ y: -8 }}
          className="glass-card rounded-[2rem] p-8 bg-gradient-to-br from-qua-pink-50/50 to-qua-lavender-50/50"
        >
          <div className="text-5xl mb-4">🐰</div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            {periods.old.name}
          </h3>
          <div className="text-lg text-gray-700 mb-6">
            {periods.old.start} - {periods.old.end}
          </div>
          <p className="text-gray-600 leading-relaxed">
            쿠아의 첫 시작! 물멍이들과의 첫 만남부터 함께 성장한 소중한 시간들.
            노래, 게임, 소통으로 가득했던 행복한 순간들의 모음집.
          </p>
        </motion.div>

        {/* 뉴쿠아 */}
        <motion.div
          whileHover={{ y: -8 }}
          className="glass-card rounded-[2rem] p-8 bg-gradient-to-br from-qua-mint-50/50 to-qua-lavender-50/50 ring-2 ring-qua-mint-300"
        >
          <div className="text-5xl mb-4">🌟</div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            {periods.new.name}
            <span className="px-3 py-1 bg-gradient-to-r from-qua-mint-400 to-qua-mint-600 text-white rounded-full text-sm">
              NOW
            </span>
          </h3>
          <div className="text-lg text-gray-700 mb-6">
            {periods.new.start} - 현재
          </div>
          <p className="text-gray-600 leading-relaxed">
            새로운 시작! 더욱 성장한 쿠아와 물멍이들의 새로운 여정.
            더 많은 컨텐츠, 더 깊은 소통으로 함께 만들어가는 이야기.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
