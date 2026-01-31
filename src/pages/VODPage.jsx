import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { vodCategories, vodList, catchList, vodSeasons, vodSeries, categorizeVOD, extractTags } from '../data/vodData'

export default function VODPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewType, setViewType] = useState('vod') // 'vod' or 'catch'
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [selectedMonth, setSelectedMonth] = useState('all')
  const [selectedSeries, setSelectedSeries] = useState('all')

  // 현재 보기 유형에 따른 VOD 목록
  const currentVods = viewType === 'vod' ? vodList : catchList

  // 월별 필터 생성
  const monthFilters = useMemo(() => {
    const months = new Set()
    currentVods.forEach(vod => {
      const month = vod.reg_date.substring(0, 7) // YYYY-MM
      months.add(month)
    })
    return ['all', ...Array.from(months).sort().reverse()]
  }, [currentVods, viewType])

  // 시리즈별 매칭 함수
  const matchSeries = (vod, seriesId) => {
    if (seriesId === 'rilpa-forest') return /릴동파|릴파/i.test(vod.title)
    if (seriesId === 'mulmongi-village') return /물멍이.*마을/i.test(vod.title)
    if (seriesId === 'christmas-roulette') return /크리스마스.*룰렛/i.test(vod.title)
    if (seriesId === 'sunimun-server') return /수니문/i.test(vod.title)
    if (seriesId === 'dawn-qua') return /새벽쿠|잔잔쿠/i.test(vod.title)
    if (seriesId === 'vrchat') return /브챗|VRChat/i.test(vod.title)
    return false
  }

  // 필터링된 VOD
  const filteredVods = useMemo(() => {
    return currentVods.filter(vod => {
      // 자동 카테고리 분류 적용
      const autoCategories = categorizeVOD(vod.title)
      const categoryMatch = selectedCategory === 'all' ||
                          vod.category.includes(selectedCategory) ||
                          autoCategories.includes(selectedCategory)

      const monthMatch = selectedMonth === 'all' ||
                        vod.reg_date.startsWith(selectedMonth)

      const seriesMatch = selectedSeries === 'all' ||
                         matchSeries(vod, selectedSeries)

      return categoryMatch && monthMatch && seriesMatch
    })
  }, [currentVods, selectedCategory, selectedMonth, selectedSeries])

  // 통계
  const stats = useMemo(() => {
    const byCategory = {}
    vodCategories.forEach(cat => {
      byCategory[cat.id] = 0
    })

    currentVods.forEach(vod => {
      const autoCategories = categorizeVOD(vod.title)
      const allCategories = [...new Set([...vod.category, ...autoCategories])]
      allCategories.forEach(cat => {
        if (byCategory[cat] !== undefined) {
          byCategory[cat]++
        }
      })
    })

    return byCategory
  }, [currentVods])

  return (
    <div className="container mx-auto px-4 pb-32">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <h1 className="text-6xl font-bold mb-4 font-cute bg-gradient-to-r from-qua-mint-500 via-qua-lavender-500 to-qua-pink-500 bg-clip-text text-transparent">
          VOD & 캐치 🎬
        </h1>
        <p className="text-lg text-gray-700 mb-2">
          쿠아의 방송 다시보기와 하이라이트 클립을 만나보세요!
        </p>
        <p className="text-sm text-gray-600">
          총 {vodList.length + catchList.length}개의 VOD (다시보기 {vodList.length}개 / 클립 {catchList.length}개)
        </p>
      </motion.div>

      {/* View Type Toggle */}
      <div className="flex justify-center gap-4 mb-8">
        <ViewTypeButton
          active={viewType === 'vod'}
          onClick={() => { setViewType('vod'); setSelectedCategory('all'); }}
          icon="📺"
          label="다시보기"
          count={vodList.length}
        />
        <ViewTypeButton
          active={viewType === 'catch'}
          onClick={() => { setViewType('catch'); setSelectedCategory('all'); }}
          icon="✂️"
          label="캐치/클립"
          count={catchList.length}
        />
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-3 text-center">카테고리별 분류</p>
        <CategoryFilter
          categories={vodCategories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
          stats={stats}
        />
      </div>

      {/* Month Filter */}
      <div className="mb-8">
        <p className="text-sm text-gray-600 mb-3 text-center">월별 필터</p>
        <MonthFilter
          months={monthFilters}
          selected={selectedMonth}
          onSelect={setSelectedMonth}
        />
      </div>

      {/* Series Section - VOD만 보여주기 */}
      {viewType === 'vod' && (
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-6 font-cute bg-gradient-to-r from-qua-lavender-500 to-qua-mint-500 bg-clip-text text-transparent">
            시리즈별 컨텐츠 📂
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {vodSeries.map((series) => (
              <motion.div
                key={series.id}
                whileHover={{ y: -4 }}
                className={`
                  glass-card rounded-[1.5rem] p-5 relative overflow-hidden
                  transition-all duration-300
                  ${selectedSeries === series.id
                    ? 'ring-2 ring-qua-mint-500 shadow-lg'
                    : 'hover:shadow-lg'
                  }
                `}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${series.color} opacity-10`} />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-4xl">{series.icon}</span>
                    <div className="flex flex-col items-end gap-1">
                      <span className="px-2 py-1 bg-white/60 backdrop-blur-sm rounded-full text-xs font-bold text-gray-700">
                        {series.count}개
                      </span>
                      <button
                        onClick={() => setSelectedSeries(selectedSeries === series.id ? 'all' : series.id)}
                        className="px-2 py-1 bg-qua-mint-500 hover:bg-qua-mint-600 text-white rounded-full text-xs font-bold transition-colors"
                      >
                        {selectedSeries === series.id ? '필터해제' : '필터'}
                      </button>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {series.name}
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    {series.description}
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    📅 {series.period}
                  </p>

                  {/* VOD Links */}
                  {series.vodUrls && series.vodUrls.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs font-bold text-gray-700 mb-2">🎬 바로가기</p>
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {series.vodUrls.slice(0, 5).map((vod) => (
                          <a
                            key={vod.title_no}
                            href={vod.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-xs text-qua-mint-700 hover:text-qua-mint-900 hover:bg-qua-mint-50 px-2 py-1 rounded transition-colors truncate"
                            onClick={(e) => e.stopPropagation()}
                          >
                            ▶ {vod.title}
                          </a>
                        ))}
                        {series.vodUrls.length > 5 && (
                          <p className="text-xs text-gray-500 px-2">+{series.vodUrls.length - 5}개 더</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Selected Indicator */}
                {selectedSeries === series.id && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-qua-mint-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          {selectedSeries !== 'all' && (
            <div className="text-center mt-4">
              <button
                onClick={() => setSelectedSeries('all')}
                className="text-sm text-qua-mint-600 hover:text-qua-mint-700 font-medium underline"
              >
                시리즈 필터 해제
              </button>
            </div>
          )}
        </div>
      )}

      {/* Active Filters */}
      {(selectedCategory !== 'all' || selectedMonth !== 'all' || selectedSeries !== 'all') && (
        <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
          <span className="text-sm text-gray-600">필터:</span>
          {selectedCategory !== 'all' && (
            <span className="px-3 py-1 bg-qua-pink-100 text-qua-pink-700 rounded-full text-sm font-medium">
              {vodCategories.find(c => c.id === selectedCategory)?.icon} {vodCategories.find(c => c.id === selectedCategory)?.name}
            </span>
          )}
          {selectedMonth !== 'all' && (
            <span className="px-3 py-1 bg-qua-mint-100 text-qua-mint-700 rounded-full text-sm font-medium">
              📅 {selectedMonth}
            </span>
          )}
          {selectedSeries !== 'all' && (
            <span className="px-3 py-1 bg-qua-lavender-100 text-qua-lavender-700 rounded-full text-sm font-medium">
              {vodSeries.find(s => s.id === selectedSeries)?.icon} {vodSeries.find(s => s.id === selectedSeries)?.name}
            </span>
          )}
          <button
            onClick={() => { setSelectedCategory('all'); setSelectedMonth('all'); setSelectedSeries('all'); }}
            className="text-sm text-gray-600 hover:text-gray-900 underline"
          >
            초기화
          </button>
        </div>
      )}

      {/* Result Count */}
      <p className="text-center text-gray-700 mb-8">
        <span className="font-bold text-qua-pink-600">{filteredVods.length}</span>개의 결과
      </p>

      {/* Season Stats */}
      <SeasonStats seasons={vodSeasons} />

      {/* VOD Grid */}
      <VODGrid
        vods={filteredVods}
        onSelect={setSelectedVideo}
      />

      {/* Video Player Modal */}
      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  )
}

function ViewTypeButton({ active, onClick, icon, label, count }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        relative px-8 py-4 rounded-[1.5rem] font-bold text-lg transition-all shadow-lg
        ${active
          ? 'bg-gradient-to-r from-qua-mint-400 to-qua-mint-600 text-white scale-105'
          : 'glass-card text-gray-700'
        }
      `}
    >
      <span className="mr-2 text-2xl">{icon}</span>
      {label}
      <span className={`ml-2 px-2 py-1 ${active ? 'bg-white/30' : 'bg-qua-mint-100'} rounded-full text-sm`}>
        {count}
      </span>
    </motion.button>
  )
}

function CategoryFilter({ categories, selected, onSelect, stats }) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map((category) => {
        const count = stats[category.id] || 0
        return (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(category.id)}
            className={`
              px-6 py-3 rounded-[1.5rem] font-medium transition-all shadow-lg flex items-center gap-2
              ${selected === category.id
                ? `bg-gradient-to-r from-${category.color}-400 to-${category.color}-600 text-white scale-105`
                : 'glass-card text-gray-700 hover:bg-white/60'
              }
            `}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
            {category.id !== 'all' && (
              <span className="text-xs opacity-70">({count})</span>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}

function MonthFilter({ months, selected, onSelect }) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {months.map((month) => (
        <motion.button
          key={month}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(month)}
          className={`
            px-4 py-2 rounded-xl text-sm font-medium transition-all
            ${selected === month
              ? 'bg-gradient-to-r from-qua-mint-400 to-qua-mint-600 text-white'
              : 'glass-card text-gray-700 hover:bg-white/60'
            }
          `}
        >
          {month === 'all' ? '전체' : month}
        </motion.button>
      ))}
    </div>
  )
}

function SeasonStats({ seasons }) {
  return (
    <section className="py-8 mb-12">
      <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
        시즌별 통계 📊
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {seasons.map((season) => (
          <motion.div
            key={season.id}
            whileHover={{ y: -5 }}
            className="glass-card rounded-[1.5rem] p-6"
          >
            <h4 className="text-lg font-bold text-gray-900 mb-2">{season.name}</h4>
            <div className="text-sm text-gray-600 mb-3">{season.period}</div>
            <div className="text-3xl font-bold text-qua-pink-600 mb-3">{season.count}개</div>
            <p className="text-sm text-gray-700 mb-3">{season.description}</p>
            <div className="flex flex-wrap gap-2">
              {season.highlights.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-qua-mint-100 text-qua-mint-700 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function VODGrid({ vods, onSelect }) {
  if (vods.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <div className="text-6xl mb-4">🎬</div>
        <p className="text-lg">해당 조건의 VOD가 없습니다</p>
      </div>
    )
  }

  return (
    <section className="py-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {vods.map((vod) => (
          <VODCard key={vod.title_no} vod={vod} onClick={() => onSelect(vod)} />
        ))}
      </div>
    </section>
  )
}

function VODCard({ vod, onClick }) {
  // 자동 태그 추출
  const autoTags = extractTags(vod.title)
  const allTags = [...new Set([...vod.tags, ...autoTags])]

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="glass-card glass-card-hover rounded-[1.5rem] overflow-hidden cursor-pointer group"
    >
      {/* Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-qua-pink-100 to-qua-lavender-100 overflow-hidden">
        <img
          src={vod.thumbnail}
          alt={vod.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/400x300/ffc9dc/ffffff?text=${encodeURIComponent('쿠아 VOD')}`
          }}
        />

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-white text-sm font-medium">
          {vod.duration}
        </div>

        {/* Type Badge */}
        {vod.type === 'catch' && (
          <div className="absolute top-2 left-2 px-3 py-1 bg-qua-mint-500 text-white rounded-full text-xs font-bold">
            클립
          </div>
        )}

        {/* Play Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-qua-pink-500 to-qua-lavender-500 flex items-center justify-center shadow-2xl">
            <div className="w-0 h-0 border-l-[16px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-qua-pink-600 transition-colors">
          {vod.title}
        </h4>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <span>{vod.reg_date}</span>
          <span>👁️ {vod.view_cnt.toLocaleString()}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {allTags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-gradient-to-r from-qua-pink-100 to-qua-lavender-100 text-gray-700 rounded-full text-xs"
            >
              #{tag}
            </span>
          ))}
          {allTags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
              +{allTags.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function VideoModal({ video, onClose }) {
  if (!video) return null

  const embedUrl = `https://vod.sooplive.co.kr/player/${video.title_no}/embed`

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-card rounded-[2rem] overflow-hidden max-w-6xl w-full"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 hover:bg-white transition-colors shadow-lg"
          >
            ✕
          </button>

          {/* Video Player */}
          <div className="relative w-full pb-[56.25%] bg-black">
            <iframe
              src={embedUrl}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
              allow="autoplay; fullscreen; encrypted-media"
              title={video.title}
            />
          </div>

          {/* Video Info */}
          <div className="p-8 bg-white/40">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{video.title}</h2>

            <div className="flex flex-wrap gap-4 text-sm text-gray-700 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">📅</span>
                <span>{video.reg_date}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">👁️</span>
                <span>{video.view_cnt.toLocaleString()} 조회</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">⏱️</span>
                <span>{video.duration}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[...video.tags, ...extractTags(video.title)].map((tag, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-gradient-to-r from-qua-pink-100 to-qua-lavender-100 text-gray-700 rounded-full text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Link to SOOP */}
            <a
              href={`https://vod.sooplive.co.kr/player/${video.title_no}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-qua-mint-500 to-qua-mint-600 text-white rounded-full font-medium hover:scale-105 transition-transform shadow-lg"
            >
              <span>🔗</span>
              SOOP에서 보기
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
