'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface CountdownTimerProps {
  targetDate: string
}

interface FlipNumberProps {
  value: number
  label: string
  index: number
}

function FlipNumber({ value, label, index }: FlipNumberProps) {
  const formattedValue = value.toString().padStart(2, '0')

  return (
    <motion.div
      className="countdown-card group relative overflow-hidden"
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
    >
      <div className="relative h-16 md:h-20 lg:h-24 flex items-center justify-center perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={value}
            className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text absolute flip-number"
            initial={{
              rotateX: 90,
              y: -30,
              opacity: 0,
              scale: 0.7,
              filter: "blur(8px)"
            }}
            animate={{
              rotateX: [90, -10, 0],
              y: [-30, 5, 0],
              opacity: [0, 0.8, 1],
              scale: [0.7, 1.1, 1],
              filter: ["blur(8px)", "blur(2px)", "blur(0px)"]
            }}
            exit={{
              rotateX: [0, 10, -90],
              y: [0, -5, 30],
              opacity: [1, 0.8, 0],
              scale: [1, 1.1, 0.7],
              filter: ["blur(0px)", "blur(2px)", "blur(8px)"]
            }}
            transition={{
              duration: 0.8,
              ease: [0.34, 1.56, 0.64, 1],
              times: [0, 0.6, 1]
            }}
            style={{
              transformStyle: 'preserve-3d',
              transformOrigin: 'center center'
            }}
          >
            {formattedValue}

            {/* Number shadow effect */}
            <motion.div
              className="absolute inset-0 text-3xl md:text-4xl lg:text-5xl font-bold text-primary-400/20 -z-10"
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 2, opacity: 0.3 }}
              exit={{ y: 8, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {formattedValue}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Particle effect on number change */}
        <AnimatePresence>
          <motion.div
            key={`particles-${value}`}
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary-400 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                initial={{
                  scale: 0,
                  x: 0,
                  y: 0,
                  opacity: 1
                }}
                animate={{
                  scale: [0, 1, 0],
                  x: (Math.random() - 0.5) * 60,
                  y: (Math.random() - 0.5) * 60,
                  opacity: [1, 0.8, 0]
                }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="text-sm md:text-base text-gray-400 uppercase tracking-wider font-medium mt-2">
        {label}
      </div>

      {/* Enhanced decorative elements */}
      <motion.div
        className="absolute top-2 right-2 w-2 h-2 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100"
        whileHover={{ scale: 1.5, boxShadow: "0 0 10px rgba(34, 197, 94, 0.8)" }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute bottom-2 left-2 w-1 h-1 bg-accent-400 rounded-full opacity-0 group-hover:opacity-100"
        whileHover={{ scale: 2, boxShadow: "0 0 8px rgba(16, 185, 129, 0.8)" }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />

      {/* Enhanced flip effect background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-primary-500/10 via-transparent to-accent-500/10 opacity-0 group-hover:opacity-100 rounded-2xl"
        whileHover={{
          background: "linear-gradient(to bottom, rgba(34, 197, 94, 0.15), transparent, rgba(16, 185, 129, 0.15))"
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const calculateTimeLeft = (): TimeLeft => {
      const difference = +new Date(targetDate) - +new Date()
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        }
      }
      
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    // Set initial time
    setTimeLeft(calculateTimeLeft())

    return () => clearInterval(timer)
  }, [targetDate])

  if (!mounted) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="countdown-card animate-pulse">
            <div className="h-12 bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ]

  return (
    <div className="space-y-6">
      <motion.h2 
        className="text-2xl md:text-3xl font-semibold text-center gradient-text"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Launch Countdown
      </motion.h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {timeUnits.map((unit, index) => (
          <FlipNumber
            key={unit.label}
            value={unit.value}
            label={unit.label}
            index={index}
          />
        ))}
      </div>
      
      <motion.div 
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <p className="text-gray-400 text-sm md:text-base">
          Until the big reveal on{' '}
          <span className="text-primary-400 font-semibold">
            July 26, 2025
          </span>
        </p>
      </motion.div>
    </div>
  )
}
