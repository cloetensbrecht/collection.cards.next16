import {ChevronRight} from 'lucide-react'
import Link from 'next/link'
import {memo} from 'react'
import {Fragment} from 'react/jsx-runtime'

type EvolutionsProps = {
  evolvesFrom?: {title: string; path: string} | null
  evolvesTo?: Array<{title: string; path: string}> | null
  currentPokemonTitle: string
}

const Evolutions: React.FC<EvolutionsProps> = ({
  evolvesFrom,
  evolvesTo,
  currentPokemonTitle
}) => {
  const isEvolvingFrom = evolvesFrom && evolvesFrom.path !== undefined
  const isEvolvingTo = evolvesTo && evolvesTo.length > 0

  if (!isEvolvingFrom && !isEvolvingTo) return null

  return (
    <div className="flex flex-col gap-1 sm:items-end">
      <p className="font-normal text-xs text-muted-foreground">Evolution</p>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5">
        {isEvolvingFrom && (
          <>
            <li className="inline-flex items-center gap-1.5">
              <Link
                href={evolvesFrom.path}
                className="transition-colors hover:text-muted-foreground"
              >
                {evolvesFrom.title}
              </Link>
            </li>
            <li
              aria-hidden="true"
              role="presentation"
              className="text-muted-foreground"
            >
              <ChevronRight className="lucide lucide-chevron-right" size={16} />
            </li>
          </>
        )}
        <span className="text-muted-foreground">{currentPokemonTitle}</span>
        {isEvolvingTo && (
          <li
            aria-hidden="true"
            role="presentation"
            className="text-muted-foreground"
          >
            <ChevronRight className="lucide lucide-chevron-right" size={16} />
          </li>
        )}
        {isEvolvingTo &&
          evolvesTo.map((to, index) => {
            return (
              <Fragment key={to.path}>
                <Link
                  href={to.path}
                  className="transition-colors hover:text-muted-foreground"
                >
                  {to.title}
                </Link>
                {index < evolvesTo.length - 1 ? ' and ' : ''}
              </Fragment>
            )
          })}
      </ol>
    </div>
  )
}

export default memo(Evolutions)
