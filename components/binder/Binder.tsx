'use client'

import {stackedCardOffset} from '@/consts/stack'
import {ImageLink} from 'alinea'
import {
  JSX,
  useCallback,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState
} from 'react'
import Book from '../book/Book'
import {CardProps} from '../card/Card'
import CardModal from '../cardmodal/CardModal'
import CardModalPlaceholder from '../cardmodal/CardModalPlaceholder'
import PokemonCardDetails, {
  PokemonCardDetailsProps
} from '../pokemoncarddetails/PokemonCardDetails'
import BinderPockets from './BinderPockets'
import CoverPage from './CoverPage'

type Card = PokemonCardDetailsProps & Omit<CardProps, 'onClick' | 'sizes'>

type BinderProps = {
  cards: (Card | (Card & {variants: Card[]}))[]
  isStacked?: boolean
  logo?: ImageLink<undefined> | JSX.Element
  page?: number
  pockets?: number
  setPage: (newPage: number) => void
}

function chunkArray<T>(arr: T[], size = 9): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size))
  return chunks
}

const addCoverPage = true
const outsidePadding = 24
const insidePadding = 48
const gapSize = 16
const containerPadding = 48
const sizes = `(max-width: 639px) calc(50vw - ${containerPadding}px - ${gapSize}px), (max-width: 676px) 187px, (max-width: 1023px) 230px, (max-width: 1279px) 232px,  (max-width: 1535px) 296px, 360px`

const aspectRatios: Record<number, {fullSize: string; halfSize: string}> = {
  4: {
    fullSize: 'min-h-[calc(100cqw*888/1358)]',
    halfSize: 'min-h-[calc(50cqw*888/1358)]'
  },
  9: {
    fullSize: 'min-h-[calc(100cqw*881/1358)]',
    halfSize: 'min-h-[calc(50cqw*881/1358)]'
  },
  12: {
    fullSize: 'min-h-[calc(100cqw*665/1358)]',
    halfSize: 'min-h-[calc(50cqw*665/1358)]'
  },
  16: {
    fullSize: 'min-h-[calc(100cqw*876/1358)]',
    halfSize: 'min-h-[calc(50cqw*876/1358)]'
  }
}

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

const defaultState: State = {
  currentColumn: 0,
  currentIndex: 0,
  currentPage: 0,
  currentRow: 0,
  nextColumn: null,
  nextIndex: null,
  nextPage: null,
  nextRow: null,
  status: 'closed'
}

const Binder: React.FC<BinderProps> = ({
  cards,
  isStacked,
  logo,
  page = 1,
  pockets = 9,
  setPage
}) => {
  const [gridWidth, setGridWidth] = useState<number>(0)
  const [state, setState] = useState<State>({
    ...defaultState,
    currentPage: page - 1
  })

  useEffect(() => {
    const closestEvenPage =
      state.currentPage % 2 === 0 ? state.currentPage : state.currentPage - 1
    if (page !== closestEvenPage + 1) setPage(closestEvenPage + 1)
  }, [state.currentPage, setPage, page])

  const currentPage = state.currentPage - (addCoverPage ? 1 : 0)

  const currentCard = cards[state.currentIndex + currentPage * pockets]
  const hasNextButton =
    state.currentIndex + currentPage * pockets < cards.length - 1
  const hasPrevButton = state.currentIndex + currentPage * pockets > 0
  const columnCount = pockets === 4 ? 2 : pockets === 9 ? 3 : 4

  const rowCount = Math.ceil(cards.length / columnCount)
  const columnWidth = (gridWidth - (columnCount - 1) * gapSize) / columnCount
  const rowHeight = Math.floor(columnWidth * (1024 / 733) + gapSize)

  const rowHeights = useMemo(() => {
    const heights: number[] = []
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      const start = rowIndex * columnCount
      const end = start + columnCount
      const rowItems = cards.slice(start, end)
      const maxVariantsInRow = Math.max(
        0,
        ...rowItems.map(card =>
          (card as Card & {variants: Card[]}).variants
            ? (card as Card & {variants: Card[]}).variants.length
            : 0
        )
      )

      const newRowHeight = rowHeight + stackedCardOffset * maxVariantsInRow

      heights[rowIndex] = newRowHeight === 1 ? 0 : newRowHeight
    }
    return heights
  }, [cards, columnCount, rowCount, rowHeight])

  const rowHeightsFromCurrentPage = rowHeights.slice(
    currentPage * Math.ceil(pockets / columnCount),
    (currentPage + 1) * Math.ceil(pockets / columnCount)
  )

  const top =
    (rowHeightsFromCurrentPage.length > 0
      ? rowHeightsFromCurrentPage.reduce(
          (acc, height, index) =>
            index < (state.nextRow !== null ? state.nextRow : state.currentRow)
              ? acc + height
              : acc,
          0
        ) +
        rowHeightsFromCurrentPage[
          state.nextRow !== null
            ? state.nextRow
            : state.currentRow !== null
            ? state.currentRow
            : 0
        ] -
        rowHeight
      : 0) + 24

  const nextHandler = useCallback(() => {
    let addPage = 0
    let newNextSelectedIndex =
      state.currentIndex !== null ? state.currentIndex + 1 : 0
    if (newNextSelectedIndex >= pockets) {
      newNextSelectedIndex = 0
      addPage = 1
    }

    setState(s => ({
      ...s,
      nextColumn: newNextSelectedIndex % columnCount,
      nextIndex: newNextSelectedIndex,
      nextPage: s.currentPage + addPage,
      nextRow: Math.floor(newNextSelectedIndex / columnCount),
      status: 'open'
    }))
  }, [state.currentIndex, columnCount, pockets])

  const prevHandler = useCallback(() => {
    let addPage = 0
    let newNextSelectedIndex =
      state.currentIndex !== null ? state.currentIndex - 1 : 0
    if (newNextSelectedIndex < 0) {
      newNextSelectedIndex = pockets - 1
      addPage = -1
    }
    setState(s => ({
      ...s,
      nextColumn: newNextSelectedIndex % columnCount,
      nextIndex: newNextSelectedIndex,
      nextPage: s.currentPage + addPage,
      nextRow: Math.floor(newNextSelectedIndex / columnCount),
      status: 'open'
    }))
  }, [state.currentIndex, columnCount, pockets])

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
        currentIndex: s.nextIndex!,
        currentPage: s.nextPage!,
        currentRow: s.nextRow!,
        status: s.status === 'positioning' ? 'opening' : s.status
      }))
    }
  }, [state.status])

  const cardPages = useMemo(
    () =>
      chunkArray(cards, pockets || 9).map((pageCards, index) => (
        <BinderPockets
          key={index}
          cards={pageCards}
          gridWidth={gridWidth}
          page={index + (addCoverPage ? 1 : 0)}
          pockets={pockets || 9}
          state={state}
          setState={setState}
          setGridWidth={setGridWidth}
        />
      )),
    [cards, pockets, gridWidth, state]
  )

  const pocketPages = useMemo(
    () =>
      [
        addCoverPage ? <CoverPage key="cover-page" image={logo} /> : null,
        ...cardPages,
        (cardPages.length + (addCoverPage ? 1 : 0)) % 2 === 1 ? (
          <CoverPage key="back-cover-page" />
        ) : null
      ].filter(Boolean),
    [cardPages, logo]
  )

  const resetPageEvent = useEffectEvent(() => {
    setState({
      ...defaultState,
      currentPage: 0
    })
    setPage(1)
  })

  const didMount = useRef(false)
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
      return
    }
    resetPageEvent()
  }, [cards.length, isStacked, pockets])

  const onPageChange = (newPage: number) => {
    setState({...defaultState, currentPage: newPage})
  }

  return (
    <>
      <Book
        currentPage={page - 1}
        className={aspectRatios[pockets || 9].fullSize}
        leftPageClassName={aspectRatios[pockets || 9].halfSize}
        onPageChange={onPageChange}
        pages={pocketPages}
        rightPageClassName={aspectRatios[pockets || 9].halfSize}
      >
        <CardModalPlaceholder
          card={{...currentCard, sizes}}
          columnWidth={columnWidth}
          gapSize={gapSize}
          height={rowHeight - gapSize}
          leftPadding={
            state.currentPage === 0 && addCoverPage
              ? outsidePadding + gridWidth + insidePadding * 2
              : outsidePadding +
                ((state.nextPage || state.currentPage) % 2 !== 0
                  ? gridWidth + insidePadding * 2
                  : 0)
          }
          modalState={state.status}
          nextSelectionCol={
            state.nextColumn !== null ? state.nextColumn : state.currentColumn
          }
          onAnimationComplete={onPlaceholderAnimationCompleteHandler}
          top={top}
        />
      </Book>
      <CardModal
        card={
          ['opening', 'open'].includes(state.status) && currentCard
            ? {...currentCard, sizes}
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

export default Binder
