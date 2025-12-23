'use client'

import {useEffect, useRef} from 'react'
import {CardProps} from '../card/Card'
import CardGridRow from '../cardgrid/CardGridRow'
import {PokemonCardDetailsProps} from '../pokemoncarddetails/PokemonCardDetails'

type Card = PokemonCardDetailsProps & Omit<CardProps, 'onClick' | 'sizes'>

type State = {
  currentColumn: number
  currentIndex: number
  currentPage: number
  currentRow: number
  nextColumn: number | null
  nextIndex: number | null
  nextPage: number | null
  nextRow: number | null
  status: 'positioning' | 'opening' | 'open' | 'closing' | 'closed'
}

type BinderPocketsProps = {
  cards: (Card | (Card & {variants: Card[]}))[]
  gridWidth: number
  page: number
  pockets: number
  state: State
  setState: React.Dispatch<React.SetStateAction<State>>
  setGridWidth: React.Dispatch<React.SetStateAction<number>>
}

const gapSize = 16
const containerPadding = 48
const sizes = `(max-width: 639px) calc(50vw - ${containerPadding}px - ${gapSize}px), (max-width: 676px) 187px, (max-width: 1023px) 230px, (max-width: 1279px) 232px,  (max-width: 1535px) 296px, 360px`

const BinderPockets: React.FC<BinderPocketsProps> = ({
  cards,
  gridWidth,
  page,
  pockets,
  state,
  setState,
  setGridWidth
}) => {
  const gridRef = useRef<HTMLDivElement>(null)
  const columns = pockets === 4 ? 2 : pockets === 9 ? 3 : 4
  const columnWidth = (gridWidth - (columns - 1) * gapSize) / columns
  const rowHeight = Math.floor(columnWidth * (1024 / 733) + gapSize) // maintain 408:555 ratio
  const currentCard =
    page === state.currentPage ? cards[state.currentIndex] : null

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      setGridWidth(entries[0].contentRect.width)
    })

    const currentGrid = gridRef.current
    if (currentGrid) {
      observer.observe(currentGrid)
    }

    return () => {
      if (currentGrid) {
        observer.unobserve(currentGrid)
      }
    }
  }, [setGridWidth])

  const rows = []
  for (let i = 0; i < cards.length; i += columns) {
    rows.push(cards.slice(i, i + columns))
  }
  for (let i = rows.length; i < pockets / columns; i++) {
    rows.push([])
  }

  return (
    <div
      ref={gridRef}
      className="relative p-6 w-full h-full group-[.is-left]/page:pr-12 group-[.is-right]/page:pl-12 gap-4 flex flex-col overflow-hidden will-change-transform [transform:translateZ(0)]"
    >
      {gridWidth > 0 &&
        rows.map((row, rowIndex) => {
          const start = rowIndex * columns

          const onClickHandler = (column: number) => {
            setState(s => ({
              ...s,
              nextColumn: column,
              nextIndex: start + column,
              nextPage: page,
              nextRow: rowIndex,
              status: 'positioning'
            }))
          }

          return (
            <CardGridRow
              key={rowIndex}
              activeCardId={
                state.status === 'open' ? currentCard?.id : undefined
              }
              cards={row}
              cardSizes={sizes}
              columns={columns}
              height={rowHeight - gapSize}
              relative={true}
              onClickHandler={onClickHandler}
            />
          )
        })}
    </div>
  )
}

export default BinderPockets
