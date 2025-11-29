'use client'

import {AnimatePresence, motion} from 'framer-motion'
import {PropsWithChildren, useEffect} from 'react'
import Card, {CardProps} from '../card/Card'
import CloseButton from '../closebutton/CloseButton'
import TiltCard from '../tiltcard/TiltCard'
import CardModalBackground from './CardModalBackground'

interface ImageModalProps {
  card: CardProps | null
  onClose: () => void
  onExitComplete: () => void
  onOpen: () => void
}

const CardModal: React.FC<PropsWithChildren<ImageModalProps>> = ({
  card,
  onClose,
  onExitComplete,
  onOpen,
  children
}) => {
  // prevent scrolling the body when modal is open
  useEffect(() => {
    if (!card) return

    const docEl = document.documentElement
    const body = document.body
    const sbw = window.innerWidth - docEl.clientWidth

    docEl.style.setProperty('--sbw', `${sbw}px`)
    docEl.classList.add('modal-open')
    body.classList.add('modal-open')

    return () => {
      docEl.classList.remove('modal-open')
      body.classList.remove('modal-open')
      docEl.style.removeProperty('--sbw')
    }
  }, [card])

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {card && (
        <>
          <CardModalBackground onClose={onClose} />
          <motion.div
            layoutId="card-modal-placeholder"
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 px-6"
            onClick={e => e.stopPropagation()}
            onLayoutAnimationComplete={onOpen}
          >
            <div className="relative rounded-lg bg-card shadow-lg overflow-hidden flex flex-col max-h-[90vh]">
              <CloseButton
                className="absolute right-4 top-4 z-10"
                onClose={onClose}
              />
              <div className="flex flex-col sm:flex-row flex-1 h-full gap-6 overflow-auto sm:overflow-hidden p-8 items-center sm:[align-items:unset]">
                <div className="flex w-full max-w-[50%] sm:w-1/3 items-center justify-center aspect-[733/1024] max-h-[100%] z-10">
                  <div className="aspect-[733/1024] w-auto h-full max-w-[100%] max-h-[100%] flex items-center justify-center">
                    <motion.div
                      layoutId="selected-card-image"
                      className="relative w-full h-full content-center"
                    >
                      <TiltCard>
                        <Card {...card} />
                      </TiltCard>
                    </motion.div>
                  </div>
                </div>
                <div className="w-full sm:w-2/3 sm:overflow-auto z-0">
                  <div className="p-4 space-y-4">{children}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CardModal
