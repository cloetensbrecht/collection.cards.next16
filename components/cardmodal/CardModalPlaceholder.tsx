import {motion} from 'framer-motion'
import {memo} from 'react'
import Card, {CardProps} from '../card/Card'
import TiltCard from '../tiltcard/TiltCard'

const modalOpenDuration = 0.3
const modalPositioningDuration = 0
const modalCloseDuration = 0.3

type ModalState = 'positioning' | 'opening' | 'open' | 'closing' | 'closed'

type CardModalPlaceholderProps = {
  card: CardProps | null
  columnWidth: number
  gapSize: number
  height: number
  modalState: ModalState
  nextSelectionCol: number
  onAnimationComplete: () => void
  top: number
}

const CardModalPlaceholder: React.FC<CardModalPlaceholderProps> = ({
  card,
  columnWidth,
  gapSize,
  height,
  modalState,
  nextSelectionCol,
  onAnimationComplete,
  top
}) => (
  <motion.div
    layoutId="card-modal-placeholder"
    className="absolute bg-card rounded-[10px] md:rounded-[4.15%/2.98%] pointer-events-none z-0"
    onAnimationComplete={onAnimationComplete}
    transition={{
      duration: ['positioning', 'open'].includes(modalState)
        ? modalPositioningDuration
        : ['closing'].includes(modalState)
        ? modalCloseDuration
        : modalOpenDuration
    }}
    animate={{
      zIndex: ['opening', 'open', 'closing'].includes(modalState) ? 10 : 0,
      opacity: ['closed'].includes(modalState) ? 0 : 1,
      top,
      left:
        (nextSelectionCol || 0) * columnWidth +
        (nextSelectionCol || 0) * gapSize
    }}
    style={{
      height: `${height}px`,
      width: columnWidth
    }}
  >
    <motion.div layoutId="selected-card-image">
      <TiltCard className="h-full">
        {card && (
          <Card {...card} glowColor={undefined} className="shadow-none" />
        )}
      </TiltCard>
    </motion.div>
  </motion.div>
)

export default memo(CardModalPlaceholder)
