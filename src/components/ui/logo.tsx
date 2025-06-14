import { Wrench, Settings } from 'lucide-react'
import { motion } from 'framer-motion'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
  showText?: boolean
  variant?: 'default' | 'light' | 'dark'
}

const sizeClasses = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8', 
  lg: 'h-12 w-12',
  xl: 'h-16 w-16'
}

const textSizeClasses = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-3xl',
  xl: 'text-4xl'
}

export function Logo({ 
  size = 'md', 
  animated = true, 
  showText = true,
  variant = 'default'
}: LogoProps) {
  const iconVariants = {
    initial: { rotate: 0, scale: 1 },
    hover: { 
      rotate: [0, -15, 15, 0], 
      scale: [1, 1.1, 1],
      transition: { 
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  }

  const textColors = {
    default: 'text-primary',
    light: 'text-white',
    dark: 'text-gray-900'
  }

  const iconColors = {
    default: 'text-primary',
    light: 'text-white',
    dark: 'text-gray-900'
  }

  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <motion.div
          variants={iconVariants}
          initial="initial"
          whileHover={animated ? "hover" : "initial"}
          className="relative"
        >
          {/* Wrench principal */}
          <Wrench className={`${sizeClasses[size]} ${iconColors[variant]} relative z-10`} />
          
          {/* Settings gear en arrière-plan pour l'effet */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={animated ? { rotate: 360 } : {}}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "linear",
              delay: 0.5
            }}
          >
            <Settings className={`${sizeClasses[size]} ${iconColors[variant]} opacity-20 scale-75`} />
          </motion.div>
          
          {/* Effet de brillance */}
          {animated && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
              animate={{ 
                x: [-100, 100],
                opacity: [0, 0.3, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut"
              }}
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                transform: 'skewX(-45deg)'
              }}
            />
          )}
        </motion.div>
      </div>
      
      {showText && (
        <motion.div 
          className="flex items-baseline"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className={`font-bold ${textSizeClasses[size]} ${textColors[variant]}`}>
            Fixeo
          </span>
          <motion.span 
            className={`font-light ${textSizeClasses[size]} ${textColors[variant]} opacity-80 ml-1`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.4 }}
          >
            .Pro
          </motion.span>
        </motion.div>
      )}
    </div>
  )
}