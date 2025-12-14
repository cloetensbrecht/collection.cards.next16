import {Pattern as PatternIcon} from '@/icons/Pattern'
import {ImageLink} from 'alinea'
import Image from 'next/image'
import {CardProps} from '../card/Card'
import CardGrid from '../cardgrid/CardGrid'
import {PokemonCardDetailsProps} from '../pokemoncarddetails/PokemonCardDetails'
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

  return (
    <div className="relative bg-white dark:bg-foreground/8 rounded-md shadow-sm overflow-hidden">
      {leftPageIsCoverPage && (
        <div
          className="absolute top-0 right-[50%] bottom-0 left-0 bg-foreground/3 mask-size-[30px_auto] mask-center mask-repeat"
          style={{
            maskImage: maskImage
          }}
        />
      )}
      <div className="flex w-full flex-row">
        <div className="basis-1/2 p-6 pr-12 bg-gradient-to-r from-95% from-foreground/0 dark:from-background/0 to-foreground/10 dark:to-background/50 to-100%">
          {!leftPageIsCoverPage ? (
            <CardGrid
              cards={leftPageCards}
              columns={columns}
              isStacked={isStacked}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
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
        <div className="basis-1/2 p-6 pl-12 bg-gradient-to-l from-95% from-foreground/0 dark:from-background/0 to-foreground/10 dark:to-background/50 to-100%">
          <CardGrid
            cards={rightPageCards}
            columns={columns}
            isStacked={isStacked}
            pockets={pockets}
          />
        </div>
      </div>
    </div>
  )
}

export default Binder
