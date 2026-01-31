import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fashionSeasons, specialOutfits, outfitCategories } from '../data/fashionData'

export default function FashionPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedOutfit, setSelectedOutfit] = useState(null)

  return (
    <div className="container mx-auto px-4 pb-32">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <h1 className="text-6xl font-bold mb-4 font-cute bg-gradient-to-r from-qua-pink-500 via-qua-lavender-500 to-qua-mint-500 bg-clip-text text-transparent">
          쿠아의 패션방 👗✨
        </h1>
        <p className="text-lg text-gray-700">
          시즌별, 컨텐츠별로 달라지는 쿠아의 다양한 의상을 만나보세요!
        </p>
      </motion.div>

      {/* Category Filter */}
      <CategoryFilter
        categories={outfitCategories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Season Timeline */}
      <SeasonTimeline seasons={fashionSeasons} />

      {/* Special Outfits */}
      <SpecialOutfitsSection outfits={specialOutfits} onSelect={setSelectedOutfit} />

      {/* Outfit Modal */}
      <OutfitModal
        outfit={selectedOutfit}
        onClose={() => setSelectedOutfit(null)}
      />
    </div>
  )
}

// Category Filter
function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(category.id)}
          className={`
            px-6 py-3 rounded-[1.5rem] font-medium transition-all shadow-lg
            ${selected === category.id
              ? `bg-gradient-to-r from-${category.color}-400 to-${category.color}-600 text-white scale-105`
              : 'glass-card text-gray-700 hover:bg-white/60'
            }
          `}
        >
          <span className="mr-2">{category.icon}</span>
          {category.name}
        </motion.button>
      ))}
    </div>
  )
}

// Season Timeline
function SeasonTimeline({ seasons }) {
  return (
    <section className="py-8">
      <h2 className="text-4xl font-bold text-center mb-12 font-cute bg-gradient-to-r from-qua-lavender-500 to-qua-pink-500 bg-clip-text text-transparent">
        시즌별 타임라인 📅
      </h2>

      <div className="space-y-8 max-w-5xl mx-auto">
        {seasons.map((season, index) => (
          <SeasonCard key={season.id} season={season} index={index} />
        ))}
      </div>
    </section>
  )
}

function SeasonCard({ season, index }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-[2rem] overflow-hidden"
    >
      {/* Season Header */}
      <div
        className="p-8 cursor-pointer hover:bg-white/40 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ background: `linear-gradient(135deg, ${season.mainColor}30 0%, ${season.mainColor}10 100%)` }}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{season.theme.split(' ')[0]}</span>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{season.season}</h3>
                <p className="text-sm text-gray-600">{season.period}</p>
              </div>
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">{season.theme}</h4>
            <p className="text-gray-700">{season.description}</p>
          </div>

          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="text-3xl text-gray-600"
          >
            ▼
          </motion.div>
        </div>

        {/* Outfit Count */}
        <div className="mt-4 inline-block px-4 py-2 bg-white/60 rounded-full text-sm font-medium text-gray-700">
          의상 {season.outfits.length}벌
        </div>
      </div>

      {/* Outfit Grid */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid md:grid-cols-2 gap-6 p-8 bg-white/20">
              {season.outfits.map((outfit) => (
                <OutfitCard key={outfit.id} outfit={outfit} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function OutfitCard({ outfit }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-card rounded-[1.5rem] overflow-hidden group"
    >
      {/* Image */}
      <div className="relative h-64 bg-gradient-to-br from-qua-pink-100 to-qua-lavender-100 overflow-hidden">
        <img
          src={outfit.imageUrl}
          alt={outfit.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300/ffc9dc/ffffff?text=' + encodeURIComponent(outfit.name)
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Info */}
      <div className="p-6">
        <div className="text-sm text-gray-600 mb-1">{outfit.date}</div>
        <h4 className="text-xl font-bold text-gray-900 mb-2">{outfit.name}</h4>
        <p className="text-gray-700 text-sm mb-4">{outfit.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {outfit.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-gradient-to-r from-qua-pink-100 to-qua-lavender-100 text-gray-700 rounded-full text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// Special Outfits Section
function SpecialOutfitsSection({ outfits, onSelect }) {
  return (
    <section className="py-16">
      <h2 className="text-4xl font-bold text-center mb-12 font-cute bg-gradient-to-r from-qua-mint-500 to-qua-pink-500 bg-clip-text text-transparent">
        방셀 (특별 의상) 🎨
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {outfits.map((outfit) => (
          <SpecialOutfitCard
            key={outfit.id}
            outfit={outfit}
            onClick={() => onSelect(outfit)}
          />
        ))}
      </div>
    </section>
  )
}

function SpecialOutfitCard({ outfit, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="glass-card glass-card-hover rounded-[2rem] overflow-hidden cursor-pointer group"
    >
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-qua-mint-100 via-qua-lavender-100 to-qua-pink-100">
        <img
          src={outfit.imageUrl}
          alt={outfit.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200/5eead4/ffffff?text=' + encodeURIComponent(outfit.name)
          }}
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-bold text-gray-800">
          {outfit.category}
        </div>
      </div>

      {/* Info */}
      <div className="p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-2">{outfit.name}</h4>
        <p className="text-sm text-gray-700 mb-3">{outfit.description}</p>
        <div className="text-xs text-gray-500">{outfit.date}</div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {outfit.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-qua-mint-100 text-qua-mint-700 rounded-full text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// Outfit Modal
function OutfitModal({ outfit, onClose }) {
  if (!outfit) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-card rounded-[2rem] overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Image */}
          <div className="relative h-96 bg-gradient-to-br from-qua-pink-100 to-qua-lavender-100">
            <img
              src={outfit.imageUrl}
              alt={outfit.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600x400/ffc9dc/ffffff?text=' + encodeURIComponent(outfit.name)
              }}
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 hover:bg-white transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="text-sm text-gray-600 mb-2">{outfit.date}</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{outfit.name}</h2>
            {outfit.category && (
              <div className="inline-block px-4 py-2 bg-qua-mint-100 text-qua-mint-700 rounded-full text-sm font-medium mb-4">
                {outfit.category}
              </div>
            )}
            <p className="text-gray-700 leading-relaxed mb-6">{outfit.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {outfit.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-gradient-to-r from-qua-pink-100 to-qua-lavender-100 text-gray-700 rounded-full text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
