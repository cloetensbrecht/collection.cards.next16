import {motion} from 'framer-motion'
import {memo} from 'react'

const modalOpenDuration = 0.3
const modalPositioningDuration = 0
const modalCloseDuration = 0.3

type ModalState = 'positioning' | 'opening' | 'open' | 'closing' | 'closed'

type CardModalPlaceholderProps = {
  columnWidth: number
  gapSize: number
  modalState: ModalState
  nextSelectionCol: number
  nextSelectionRow: number
  onAnimationComplete: () => void
  rowHeight: number
}

const CardModalPlaceholder: React.FC<CardModalPlaceholderProps> = ({
  columnWidth,
  gapSize,
  modalState,
  nextSelectionCol,
  nextSelectionRow,
  onAnimationComplete,
  rowHeight
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
      top: (nextSelectionRow || 0) * rowHeight,
      left:
        (nextSelectionCol || 0) * columnWidth +
        (nextSelectionCol || 0) * gapSize
    }}
    style={{
      height: `${rowHeight - gapSize}px`,
      width: columnWidth
    }}
  />
)

export default memo(CardModalPlaceholder)
