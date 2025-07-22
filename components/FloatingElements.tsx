'use client'

import { useState, useEffect, memo } from 'react'
import { motion } from 'framer-motion'
import { Code, Terminal, Cpu, Zap, GitBranch, Database } from 'lucide-react'

const icons = [Code, Terminal, Cpu, Zap, GitBranch, Database]

// Pre-defined positions to avoid hydration mismatch
const iconPositions = [
  { left: 15, top: 20 },
  { left: 85, top: 15 },
  { left: 25, top: 80 },
  { left: 75, top: 70 },
  { left: 45, top: 25 },
  { left: 65, top: 85 },
]

const particlePositions = [
  { left: 10, top: 30 }, { left: 90, top: 40 }, { left: 30, top: 60 }, { left: 70, top: 20 },
  { left: 50, top: 90 }, { left: 20, top: 10 }, { left: 80, top: 80 }, { left: 40, top: 50 },
  { left: 60, top: 30 }, { left: 35, top: 75 }, { left: 75, top: 45 }, { left: 15, top: 65 },
  { left: 85, top: 25 }, { left: 25, top: 85 }, { left: 55, top: 15 }, { left: 45, top: 70 },
  { left: 65, top: 55 }, { left: 35, top: 35 }, { left: 75, top: 65 }, { left: 25, top: 45 },
]

const FloatingElements = memo(function FloatingElements() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {icons.map((Icon, index) => {
        const position = iconPositions[index]
        return (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: `${position.left}%`,
              top: `${position.top}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, (index % 2 === 0 ? 10 : -10), 0],
              rotate: [0, (index % 2 === 0 ? 5 : -5), 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 6 + (index * 0.5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.8,
            }}
          >
            <Icon
              className="w-6 h-6 text-primary-400/20"
              strokeWidth={1}
            />
          </motion.div>
        )
      })}

      {/* Floating Particles */}
      {particlePositions.map((position, index) => (
        <motion.div
          key={`particle-${index}`}
          className="absolute w-1 h-1 bg-primary-400/30 rounded-full"
          style={{
            left: `${position.left}%`,
            top: `${position.top}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 8 + (index * 0.2),
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.4,
          }}
        />
      ))}
    </div>
  )
})

export default FloatingElements
