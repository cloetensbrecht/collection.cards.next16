import {VirtualItem} from '@tanstack/react-virtual'
import {memo} from 'react'
import Card, {CardProps} from '../card/Card'
import TiltCard from '../tiltcard/TiltCard'

const stackedCardOffset = 20

type Card = Omit<CardProps, 'onClick' | 'sizes'>

type CardGridRowProps = {
  activeCardId?: Card['id']
  cards: (Card | (Card & {variants: Card[]}))[]
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
      <div key={`${card.id}_${column}`} className="relative">
        {(card as Card & {variants: Card[]}).variants?.map((variant, index) => {
          return (
            <div
              className="absolute w-full h-full pointer-events-none"
              key={variant.id}
              style={
                {
                  top: `${(index + 1) * stackedCardOffset * -1}px`,
                  zIndex: -index * 10,
                  '--pointer-x': '50%',
                  '--pointer-y': '50%',
                  '--background-x': '50%',
                  '--background-y': '50%',
                  '--pointer-from-center': '0',
                  '--pointer-from-left': '0.5',
                  '--pointer-from-top': '0.5',
                  '--tilt-x': '0deg',
                  '--tilt-y': '0deg',
                  '--scale': '1'
                } as React.CSSProperties
              }
            >
              <Card
                key={variant.id}
                {...variant}
                isActive={false}
                asButton={true}
                sizes={cardSizes}
                glowColor={undefined}
              />
            </div>
          )
        })}
        <TiltCard className="h-full">
          <Card
            {...card}
            isActive={activeCardId === card.id}
            asButton={true}
            onClick={() => onClickHandler(column)}
            sizes={cardSizes}
          />
        </TiltCard>
      </div>
    ))}
  </div>
)

export default memo(CardGridRow)
