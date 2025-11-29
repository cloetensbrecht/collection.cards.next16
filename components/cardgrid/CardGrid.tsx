'use client'

import {useWindowVirtualizer} from '@tanstack/react-virtual'
import {useEffect, useMemo, useRef, useState} from 'react'
import Card, {CardProps} from '../card/Card'
import CardModal from '../cardmodal/CardModal'
import CardModalPlaceholder from '../cardmodal/CardModalPlaceholder'
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

type Card = PokemonCardDetailsProps & Omit<CardProps, 'onClick' | 'sizes'>

export type CardGridProps = {
  cards: Card[]
}

const CardGrid: React.FC<CardGridProps> = ({cards}) => {
  const gridRef = useRef<HTMLDivElement>(null)
  const [windowWidth, setWindowWidth] = useState(0)
  const [modalState, setModalState] = useState<
    'positioning' | 'opening' | 'open' | 'closing' | 'closed'
  >('closed')
  const [activeCard, setActiveCard] = useState<Card>(cards[0])
  const [selection, setSelection] = useState<{
    col: number
    row: number
    index: number | null
  }>({col: 0, row: 0, index: null})
  const [nextSelection, setNextSelection] = useState<{
    col: number
    row: number
    index: number | null
  }>({col: 0, row: 0, index: null})

  const selectedCard = useMemo(
    () => (selection.index !== null ? cards[selection.index] : null),
    [selection.index, cards]
  )
  const activeCardIndex = useMemo(
    () => cards.findIndex(c => c.id === activeCard?.id),
    [activeCard, cards]
  )
  const columnCount = useMemo(() => getColumnCount(windowWidth), [windowWidth])
  const columnWidth = getColumnWidth(windowWidth, columnCount)
  const rowHeight = Math.floor(columnWidth * (1024 / 733) + gapSize) // maintain 408:555 ratio
  const rowCount = Math.ceil(cards.length / columnCount)
  const hasNextButton = activeCardIndex < cards.length - 1
  const hasPrevButton = activeCardIndex > 0

  const virtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => rowHeight,
    overscan: 1
  })

  // Track screen width for responsiveness
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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

  const nextHandler = hasNextButton
    ? () => {
        const newNextSelectedIndex =
          selection.index !== null ? selection.index + 1 : 0
        setActiveCard(cards[newNextSelectedIndex])
        setNextSelection({
          col: newNextSelectedIndex % columnCount,
          row: Math.floor(newNextSelectedIndex / columnCount),
          index: newNextSelectedIndex
        })
      }
    : undefined

  const prevHandler = hasPrevButton
    ? () => {
        const newNextSelectedIndex =
          selection.index !== null ? selection.index - 1 : 0
        setActiveCard(cards[newNextSelectedIndex])
        setNextSelection({
          col: newNextSelectedIndex % columnCount,
          row: Math.floor(newNextSelectedIndex / columnCount),
          index: newNextSelectedIndex
        })
      }
    : undefined

  const onCloseModalHandler = () => {
    setModalState('closing')
    setSelection(sel => ({...sel, index: null}))
  }

  const onExitCompleteHandler = () => {
    setModalState('closed')
    setNextSelection(sel => ({...sel, index: null}))
  }

  const onOpenModalHandler = () => {
    if (modalState === 'opening') setModalState('open')
  }

  const onPlaceholderAnimationCompleteHandler = () => {
    // positioning the placeholder finished, open the modal
    if (modalState === 'positioning') setModalState('opening')
    setSelection(nextSelection)
  }

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
              {rowItems.map((item, column) => {
                const isActiveCard =
                  modalState === 'open' && activeCard.id === item.id
                const onClickHandler = () => {
                  if (
                    selection.row !== virtualRow.index ||
                    selection.col !== column
                  ) {
                    setModalState('positioning')
                  } else {
                    setModalState('opening')
                    setSelection({
                      col: column,
                      row: virtualRow.index,
                      index: start + column
                    })
                  }
                  setNextSelection({
                    col: column,
                    row: virtualRow.index,
                    index: start + column
                  })
                  setActiveCard(item)
                }

                return (
                  <TiltCard className="h-full" key={`${item.id}_${column}`}>
                    <Card
                      {...item}
                      isActive={isActiveCard}
                      asButton={true}
                      onClick={onClickHandler}
                      sizes={sizes}
                    />
                  </TiltCard>
                )
              })}
            </div>
          )
        })}
        <CardModalPlaceholder
          columnWidth={columnWidth}
          gapSize={gapSize}
          modalState={modalState}
          nextSelectionCol={nextSelection.col}
          nextSelectionRow={nextSelection.row}
          onAnimationComplete={onPlaceholderAnimationCompleteHandler}
          rowHeight={rowHeight}
          card={{...activeCard, sizes}}
        />
      </div>
      <CardModal
        card={selectedCard ? {...selectedCard, sizes} : null}
        onClose={onCloseModalHandler}
        onExitComplete={onExitCompleteHandler}
        onOpen={onOpenModalHandler}
      >
        {selectedCard && (
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
