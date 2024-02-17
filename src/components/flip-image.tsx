'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import { motion } from 'framer-motion'
import { ComponentType, useRef, useState } from 'react'

// Spring animation parameters
const spring = {
  type: 'spring',
  stiffness: 300,
  damping: 40,
}

interface WithClickProps {
  width: string
  height: string
  [key: string]: any // Para permitir props adicionais
}

export function withClick<T extends WithClickProps>(
  Component: ComponentType<T>,
) {
  return (props: T) => {
    const [isFlipped, setIsFlipped] = useState(false)

    const handleClick = () => {
      setIsFlipped((prevState) => !prevState)
    }

    const ref = useRef<HTMLDivElement>(null)

    return (
      <motion.div
        className="cursor-pointer px-6"
        onClick={handleClick}
        transition={spring}
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d',
          width: `clamp(calc(${props.width}/2), 100vw, ${props.width})`,
          height: `clamp(calc(${props.height}/2 - 3rem), 50vh, calc(${props.height} - 3rem))`,
        }}
      >
        <motion.div
          ref={ref}
          whileHover={{ scale: 1.1 }} // Change the scale of zooming in when hovering
          transition={spring}
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <div
            style={{
              perspective: '1200px',
              transformStyle: 'preserve-3d',
              width: '100%',
              height: '100%',
            }}
          >
            <motion.div
              animate={{ rotateY: isFlipped ? -180 : 0 }}
              transition={spring}
              style={{
                width: '100%',
                height: '100%',
                zIndex: isFlipped ? 0 : 1,
                backfaceVisibility: 'hidden',
                position: 'absolute',
              }}
            >
              <Component
                {...props}
                variant="front"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </motion.div>
            <motion.div
              initial={{ rotateY: 180 }}
              animate={{ rotateY: isFlipped ? 0 : 180 }}
              transition={spring}
              style={{
                width: '100%',
                height: '100%',
                zIndex: isFlipped ? 1 : 0,
                backfaceVisibility: 'hidden',
                position: 'absolute',
              }}
            >
              <Component
                {...props}
                variant="back"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    )
  }
}
