import { FloatingPortal, useFloating, arrow, shift, offset } from '@floating-ui/react'
import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
}
export default function Popover({ children, renderPopover, className }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const arrowRef = useRef<HTMLElement>(null)
  const { refs, middlewareData, x, y, strategy } = useFloating({
    middleware: [shift(), offset(6), arrow({ element: arrowRef })]
  })

  const showPopover = () => {
    setIsOpen(true)
  }
  const hidePopover = () => {
    setIsOpen(false)
  }
  return (
    <div className={className} ref={refs.setReference} onMouseEnter={showPopover} onMouseLeave={hidePopover}>
      {children}
      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <motion.div className='z-40 '
              ref={refs.setFloating}
              style={{ position: strategy, left: x, top: y }}
              initial={{ x: 100, opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
            >
              <div className='relative border-separate rounded-sm border-gray-200 bg-teal-400 shadow-sm mt-5 '>
                <span
                  ref={arrowRef}
                  className='absolute translate-y-[-95%] border-[11px] border-x-transparent border-b-white border-t-transparent'
                  style={{ left: middlewareData?.x, top: middlewareData?.y }}
                ></span>
                {renderPopover}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </div>
  )
}
