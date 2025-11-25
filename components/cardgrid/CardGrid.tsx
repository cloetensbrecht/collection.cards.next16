'use client'

import {useWindowVirtualizer} from '@tanstack/react-virtual'
import {motion} from 'framer-motion'
import {useEffect, useMemo, useRef, useState} from 'react'
import Card, {CardProps} from '../card/Card'
import CardModal from '../cardmodal/CardModal'
import PokemonCardDetails, {
  PokemonCardDetailsProps
} from '../pokemoncarddetails/PokemonCardDetails'
import {TiltCard} from '../tiltcard/TiltCard'

const gapSize = 16
const containerPadding = 48
const sizes = `(max-width: 639px) calc(50vw - ${containerPadding}px - ${gapSize}px), (max-width: 676px) 187px, (max-width: 1023px) 230px, (max-width: 1279px) 232px,  (max-width: 1535px) 296px, 360px`

function getColumnCount(width: number): number {
  if (width < 640) return 2 // mobile
  if (width < 1024) return 3 // tablet
  return 4 // desktop
}

function getColumnWidth(width: number, columnCount: number): number {
  const gapWidth = gapSize * (columnCount - 1)
  if (width < 640) return (width - containerPadding - gapWidth) / columnCount // mobile
  if (width < 768) return (640 - containerPadding - gapWidth) / columnCount // tablet
  if (width < 1024) return (768 - containerPadding - gapWidth) / columnCount // tablet
  if (width < 1280) return (1024 - containerPadding - gapWidth) / columnCount // tablet
  if (width < 1536) return (1280 - containerPadding - gapWidth) / columnCount // tablet
  return (1488 - gapWidth) / columnCount // desktop
}

export type CardGridProps = {
  cards: (PokemonCardDetailsProps & Omit<CardProps, 'onClick' | 'sizes'>)[]
}

const CardGrid: React.FC<CardGridProps> = ({cards}) => {
  const gridRef = useRef<HTMLDivElement>(null)
  const [windowWidth, setWindowWidth] = useState(0)
  const [highlightFinished, setHighlightFinished] = useState(true)
  const [modalIsOpening, setModalIsOpening] = useState(false)
  const [modalIsClosing, setModalIsClosing] = useState<string | null>(null)
  const [modalLayoutId, setModalLayoutId] = useState<string | undefined>(
    'selected-card'
  )
  const [selection, setSelection] = useState<{
    col: number
    row: number
    index: number | null
  }>({col: 0, row: 0, index: null})

  const selectedCard = selection.index !== null ? cards[selection.index] : null
  const hasNextButton =
    selectedCard &&
    selection.index !== null &&
    selection.index < cards.length - 1
  const hasPrevButton =
    selectedCard && selection.index !== null && selection.index > 0

  // Track screen width for responsiveness
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const columnCount = useMemo(() => getColumnCount(windowWidth), [windowWidth])
  const columnWidth = getColumnWidth(windowWidth, columnCount)
  const rowHeight = Math.floor(columnWidth * (1024 / 733) + gapSize) // maintain 408:555 ratio
  const rowCount = Math.ceil(cards.length / columnCount)

  const virtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => rowHeight,
    overscan: 1
  })

  const nextHandler = hasNextButton
    ? () => {
        setModalLayoutId(undefined)
        setModalIsOpening(false)
        const newSelectedIndex =
          selection.index !== null ? selection.index + 1 : 0
        setHighlightFinished(false)
        setSelection({
          col: newSelectedIndex % columnCount,
          row: Math.floor(newSelectedIndex / columnCount),
          index: newSelectedIndex
        })
      }
    : undefined
  const prevHandler = hasPrevButton
    ? () => {
        setModalLayoutId(undefined)
        setModalIsOpening(false)
        const newSelectedIndex =
          selection.index !== null ? selection.index - 1 : 0
        setHighlightFinished(false)
        setSelection({
          col: newSelectedIndex % columnCount,
          row: Math.floor(newSelectedIndex / columnCount),
          index: newSelectedIndex
        })
      }
    : undefined
  const closeModalHandler = () => {
    setModalIsClosing(selectedCard?.id || null)
    setSelection(sel => ({...sel, index: null}))
  }

  const onExitComplete = () => {
    setSelection(sel => ({...sel, index: null}))
    setModalIsClosing(null)
  }

  // Scroll to selected card row
  useEffect(() => {
    if (selection.index !== null && selection.row !== null) {
      virtualizer.scrollToIndex(selection.row, {
        align: 'start',
        behavior: 'smooth'
      })
    }
  }, [selection.row, selection.index, virtualizer])

  useEffect(() => {
    virtualizer.measure()
  }, [rowHeight, columnCount, virtualizer])

  if (cards.length === 0) return null
  if (windowWidth === 0) return <div className="h-screen" />

  return (
    <>
      <div
        ref={gridRef}
        className="relative"
        style={{height: virtualizer.getTotalSize() - gapSize}}
      >
        {virtualizer.getVirtualItems().map(virtualRow => {
          const start = virtualRow.index * columnCount
          const end = start + columnCount
          const rowItems = cards.slice(start, end)

          return (
            <div
              key={virtualRow.key}
              className={
                'absolute top-0 left-0 grid w-full gap-4 z-1 hover:z-[10]'
              }
              style={{
                transform: `translateY(${virtualRow.start}px)`,
                gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
                height: `${rowHeight - gapSize}px`
              }}
            >
              {rowItems.map((item, index) => {
                const cardLayoutId =
                  (modalIsOpening && item.id === selectedCard?.id) ||
                  (modalIsClosing !== null && item.id === modalIsClosing)
                    ? 'selected-card-image'
                    : undefined

                return (
                  <motion.div
                    key={`${item.id}_${index}`}
                    layoutId={cardLayoutId}
                  >
                    <TiltCard className="h-full">
                      <Card
                        {...item}
                        asButton={true}
                        onClick={() => {
                          setModalLayoutId('selected-card')
                          setModalIsOpening(true)
                          setModalIsClosing(null)
                          setSelection({
                            col: index,
                            row: virtualRow.index,
                            index: start + index
                          })
                          if (
                            selection.row !== virtualRow.index ||
                            selection.col !== index
                          ) {
                            setHighlightFinished(false)
                          }
                        }}
                        sizes={sizes}
                      />
                    </TiltCard>
                  </motion.div>
                )
              })}
            </div>
          )
        })}
        <motion.div
          layoutId={modalLayoutId}
          className="absolute bg-card rounded-[10px] md:rounded-[4.15%/2.98%] pointer-events-none z-0"
          onAnimationComplete={() => setHighlightFinished(true)}
          transition={{
            duration: selectedCard ? 0 : 0.3
          }}
          animate={{
            top: (selection.row || 0) * rowHeight,
            left:
              (selection.col || 0) * columnWidth +
              (selection.col || 0) * gapSize
          }}
          style={{
            height: `${rowHeight - gapSize}px`,
            width: columnWidth
          }}
        />
      </div>
      <CardModal
        card={
          highlightFinished && selectedCard ? {...selectedCard, sizes} : null
        }
        onClose={closeModalHandler}
        onExitComplete={onExitComplete}
      >
        {highlightFinished && selectedCard && (
          <PokemonCardDetails
            {...selectedCard}
            nextHandler={nextHandler}
            prevHandler={prevHandler}
          />
        )}
      </CardModal>
    </>
  )
}
export default CardGrid
