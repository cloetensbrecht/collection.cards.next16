import {VirtualItem} from '@tanstack/react-virtual'
import {memo} from 'react'
import Card, {CardProps} from '../card/Card'
import TiltCard from '../tiltcard/TiltCard'

type Card = Omit<CardProps, 'onClick' | 'sizes'>

type CardGridRowProps = {
  activeCardId?: Card['id']
  cards: Card[]
  cardSizes: string
  columns: number
  height: number
  onClickHandler: (column: number) => void
  virtualRow: VirtualItem
}

const CardGridRow: React.FC<CardGridRowProps> = ({
  activeCardId,
  cards,
  cardSizes,
  columns,
  height,
  onClickHandler,
  virtualRow
}) => (
  <div
    className={'absolute top-0 left-0 grid w-full gap-4 z-1 hover:z-[10]'}
    style={{
      transform: `translateY(${virtualRow.start}px)`,
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      height: `${height}px`
    }}
  >
    {cards.map((card, column) => (
      <TiltCard className="h-full" key={`${card.id}_${column}`}>
        <Card
          {...card}
          isActive={activeCardId === card.id}
          asButton={true}
          onClick={() => onClickHandler(column)}
          sizes={cardSizes}
        />
      </TiltCard>
    ))}
  </div>
)

export default memo(CardGridRow)
