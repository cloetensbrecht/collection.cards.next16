'use client'

import {useWindowVirtualizer} from '@tanstack/react-virtual'
import {
  useCallback,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState
} from 'react'
import Card, {CardProps} from '../card/Card'
import CardModal from '../cardmodal/CardModal'
import CardModalPlaceholder from '../cardmodal/CardModalPlaceholder'
import PokemonCardDetails, {
  PokemonCardDetailsProps
} from '../pokemoncarddetails/PokemonCardDetails'
import CardGridRow from './CardGridRow'

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

type State = {
  currentColumn: number
  currentRow: number
  currentIndex: number
  nextColumn: number | null
  nextRow: number | null
  nextIndex: number | null
  status: 'positioning' | 'opening' | 'open' | 'closing' | 'closed'
}

const CardGrid: React.FC<CardGridProps> = ({cards}) => {
  const gridRef = useRef<HTMLDivElement>(null)
  const [windowWidth, setWindowWidth] = useState(0)
  const [state, setState] = useState<State>({
    currentColumn: 0,
    currentRow: 0,
    currentIndex: 0,
    nextColumn: null,
    nextRow: null,
    nextIndex: null,
    status: 'closed'
  })

  const currentCard = cards[state.currentIndex]
  const extendedCard = useMemo(() => ({...currentCard, sizes}), [currentCard])
  const columnCount = useMemo(() => getColumnCount(windowWidth), [windowWidth])
  const columnWidth = getColumnWidth(windowWidth, columnCount)
  const rowHeight = Math.floor(columnWidth * (1024 / 733) + gapSize) // maintain 408:555 ratio
  const rowCount = Math.ceil(cards.length / columnCount)
  const hasNextButton = state.currentIndex < cards.length - 1
  const hasPrevButton = state.currentIndex > 0

  const virtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => rowHeight,
    overscan: 1
  })

  const scrollToRow = useCallback(
    (rowIndex: number) => {
      virtualizer.scrollToIndex(rowIndex, {
        align: 'start',
        behavior: 'smooth'
      })
    },
    [virtualizer]
  )

  const handlePositioning = useEffectEvent(() => {
    if (
      state.currentRow === state.nextRow &&
      state.currentColumn === state.nextColumn
    ) {
      // already in position, skip to opening
      setState(s => ({
        ...s,
        status: 'opening'
      }))
    }
  })

  useEffect(() => {
    switch (state.status) {
      case 'positioning':
        handlePositioning()
        break
      case 'open':
        if (state.nextRow !== null && state.currentRow !== state.nextRow)
          scrollToRow(state.nextRow)
        break
    }
  }, [state, scrollToRow])

  // Track screen width for responsiveness
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    virtualizer.measure()
  }, [rowHeight, columnCount, virtualizer])

  const nextHandler = useCallback(() => {
    const newNextSelectedIndex =
      state.currentIndex !== null ? state.currentIndex + 1 : 0
    setState(s => ({
      ...s,
      nextColumn: newNextSelectedIndex % columnCount,
      nextRow: Math.floor(newNextSelectedIndex / columnCount),
      nextIndex: newNextSelectedIndex,
      status: 'open'
    }))
  }, [state.currentIndex, columnCount])

  const prevHandler = useCallback(() => {
    const newNextSelectedIndex =
      state.currentIndex !== null ? state.currentIndex - 1 : 0
    setState(s => ({
      ...s,
      nextColumn: newNextSelectedIndex % columnCount,
      nextRow: Math.floor(newNextSelectedIndex / columnCount),
      nextIndex: newNextSelectedIndex,
      status: 'open'
    }))
  }, [state.currentIndex, columnCount])

  const onCloseModalHandler = useCallback(() => {
    setState(s => ({
      ...s,
      status: 'closing'
    }))
  }, [])

  const onExitCompleteHandler = useCallback(() => {
    setState(s => ({
      ...s,
      status: 'closed'
    }))
  }, [])

  const onOpenModalHandler = useCallback(() => {
    setState(s => ({
      ...s,
      status: s.status === 'opening' ? 'open' : s.status
    }))
  }, [])

  const onPlaceholderAnimationCompleteHandler = useCallback(() => {
    if (state.status !== 'closed') {
      // positioning the placeholder finished, open the modal
      setState(s => ({
        ...s,
        currentColumn: s.nextColumn!,
        currentRow: s.nextRow!,
        currentIndex: s.nextIndex!,
        status: s.status === 'positioning' ? 'opening' : s.status
      }))
    }
  }, [state.status])

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
          const onClickHandler = (column: number) => {
            setState(s => ({
              ...s,
              nextColumn: column,
              nextRow: virtualRow.index,
              nextIndex: start + column,
              status: 'positioning'
            }))
          }

          return (
            <CardGridRow
              activeCardId={
                state.status === 'open' ? currentCard.id : undefined
              }
              cards={rowItems}
              cardSizes={sizes}
              columns={columnCount}
              height={rowHeight - gapSize}
              key={virtualRow.key}
              onClickHandler={onClickHandler}
              virtualRow={virtualRow}
            />
          )
        })}
        <CardModalPlaceholder
          columnWidth={columnWidth}
          gapSize={gapSize}
          modalState={state.status}
          nextSelectionCol={
            state.nextColumn !== null ? state.nextColumn : state.currentColumn
          }
          nextSelectionRow={
            state.nextRow !== null ? state.nextRow : state.currentRow
          }
          onAnimationComplete={onPlaceholderAnimationCompleteHandler}
          rowHeight={rowHeight}
          card={extendedCard}
        />
      </div>
      <CardModal
        card={
          ['opening', 'open'].includes(state.status) && currentCard
            ? extendedCard
            : null
        }
        onClose={onCloseModalHandler}
        onExitComplete={onExitCompleteHandler}
        onOpen={onOpenModalHandler}
      >
        {currentCard && (
          <PokemonCardDetails
            {...currentCard}
            nextHandler={hasNextButton ? nextHandler : undefined}
            prevHandler={hasPrevButton ? prevHandler : undefined}
          />
        )}
      </CardModal>
    </>
  )
}
export default CardGrid
