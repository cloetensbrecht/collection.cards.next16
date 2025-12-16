'use client'

import {Pattern as PatternIcon} from '@/icons/Pattern'
import {cn} from '@/lib/utils'
import {ImageLink} from 'alinea'
import {ChevronLeft, ChevronRight} from 'lucide-react'
import Image from 'next/image'
import {useEffect, useState} from 'react'
import {CardProps} from '../card/Card'
import CardGrid from '../cardgrid/CardGrid'
import {PokemonCardDetailsProps} from '../pokemoncarddetails/PokemonCardDetails'
import {Button} from '../ui/button'
const {renderToString} = await import('react-dom/server')

type Card = PokemonCardDetailsProps & Omit<CardProps, 'onClick' | 'sizes'>

type BinderProps = {
  isStacked?: boolean
  logo?: ImageLink<undefined>
  pages: (Card | (Card & {variants: Card[]}))[][]
  page: number
  pockets: number
  setPage: (newPage: number) => void
}

const Binder: React.FC<BinderProps> = ({
  isStacked,
  logo,
  pages,
  page,
  pockets,
  setPage
}) => {
  const columns = pockets === 4 ? 2 : pockets === 9 ? 3 : 4
  const leftPageCards = pages[page - 2] || []
  const rightPageCards = pages[page - 1] || []
  const maskImage = `url(\'data:image/svg+xml;utf8,${renderToString(
    <PatternIcon />
  )}\')`
  const leftPageIsCoverPage = leftPageCards.length === 0
  const rightPageIsCoverPage = rightPageCards.length === 0

  const [totalLeftHeight, setTotalLeftHeight] = useState(0)
  const [totalRightHeight, setTotalRightHeight] = useState(0)
  const [totalHeight, setTotalHeight] = useState(0)

  useEffect(() => {
    setTotalHeight(Math.max(totalLeftHeight, totalRightHeight))
  }, [totalLeftHeight, totalRightHeight])

  return (
    <div className="relative px-24">
      <Button
        variant={'ghost'}
        size={'icon'}
        onClick={() => setPage(page - 2)}
        disabled={page <= 1}
        className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer rounded-full [&_svg:not([class*='size-'])]:size-7 size-10"
      >
        <ChevronLeft />
      </Button>
      <div className="relative bg-white dark:bg-foreground/8 rounded-md shadow-sm overflow-hidden">
        {leftPageIsCoverPage && (
          <div
            className="absolute top-0 right-[50%] bottom-0 left-0 bg-foreground/3 mask-size-[30px_auto] mask-center mask-repeat"
            style={{
              maskImage: maskImage
            }}
          />
        )}
        <div className={`w-full`}>
          <div
            className={cn('flex w-full flex-row min-h-full')}
            style={{height: totalHeight ? `${totalHeight + 48}px` : 'auto'}}
          >
            <div
              className={cn(
                'min-h-full basis-1/2 p-6 pr-12 bg-gradient-to-r from-95% from-foreground/0 dark:from-background/0 to-foreground/10 dark:to-background/50 to-100%'
              )}
            >
              {!leftPageIsCoverPage ? (
                <CardGrid
                  key={`page_${page}`}
                  cards={leftPageCards}
                  columns={columns}
                  isStacked={isStacked}
                  pockets={pockets}
                  setTotalHeight={setTotalLeftHeight}
                />
              ) : (
                <div className="w-full min-h-full flex items-center justify-center">
                  {logo && (
                    <Image
                      src={`/media${logo.src}`}
                      alt={logo.title}
                      width={logo.width}
                      height={logo.height}
                      className="w-[40%] h-auto"
                      sizes={'269px'}
                    />
                  )}
                </div>
              )}
            </div>
            <div
              className={cn(
                'min-h-full basis-1/2 p-6 pl-12 bg-gradient-to-l from-95% from-foreground/0 dark:from-background/0 to-foreground/10 dark:to-background/50 to-100%'
              )}
            >
              {!rightPageIsCoverPage && (
                <CardGrid
                  key={`page_${page + 1}`}
                  cards={rightPageCards}
                  columns={columns}
                  isStacked={isStacked}
                  pockets={pockets}
                  setTotalHeight={setTotalRightHeight}
                />
              )}
            </div>
          </div>
        </div>
        {rightPageIsCoverPage && (
          <div
            className="absolute top-0 left-[50%] bottom-0 right-0 bg-foreground/3 mask-size-[30px_auto] mask-center mask-repeat"
            style={{
              maskImage: maskImage
            }}
          />
        )}
      </div>
      <Button
        variant={'ghost'}
        size={'icon'}
        onClick={() => setPage(page + 2)}
        disabled={page >= pages.length}
        className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer rounded-full [&_svg:not([class*='size-'])]:size-7 size-10"
      >
        <ChevronRight />
      </Button>
    </div>
  )
}

export default Binder
