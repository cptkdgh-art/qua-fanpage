import { useEffect, useState } from 'react'

export default function WaterDrops() {
  const [drops, setDrops] = useState([])

  useEffect(() => {
    // Generate 15 water drops with random positions and delays
    const generatedDrops = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${3 + Math.random() * 3}s`,
      size: `${6 + Math.random() * 6}px`,
    }))
    setDrops(generatedDrops)
  }, [])

  return (
    <div className="water-drops">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="water-drop"
          style={{
            left: drop.left,
            width: drop.size,
            height: drop.size,
            '--delay': drop.delay,
            '--duration': drop.duration,
          }}
        />
      ))}
    </div>
  )
}
