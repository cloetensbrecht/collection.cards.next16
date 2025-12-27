'use client'

import {useWindowVirtualizer} from '@tanstack/react-virtual'
import Link from 'next/link'
import PokedexIcon from '../pokedexicon/PokedexIcon'

type PokedexGridProps = {
  pokedex: {
    number: number | null
    path: string
    title: string
    url: string
  }[]
}

const columns = 6
const rowHeight = 124
const rowGap = 48

const PokedexGrid: React.FC<PokedexGridProps> = ({pokedex}) => {
  const rowCount = Math.ceil(pokedex.length / columns)
  const virtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => rowHeight + rowGap,
    overscan: 12
  })

  return (
    <div
      className="relative w-full"
      style={{height: virtualizer.getTotalSize() - rowGap}}
    >
      {virtualizer.getVirtualItems().map(virtualRow => {
        const rowStartIndex = virtualRow.index * columns
        const rowEndIndex = Math.min(rowStartIndex + columns, pokedex.length)

        return (
          <div
            key={virtualRow.key}
            className={`absolute left-0 top-0 flex w-full justify-center lg:gap-x-6 pb-[${rowGap}px]`}
            style={{
              height: rowHeight + rowGap,
              transform: `translateY(${virtualRow.start}px)`
            }}
          >
            {pokedex.slice(rowStartIndex, rowEndIndex).map(p => (
              <Link
                key={p.path}
                href={p.url}
                className="group flex flex-col items-center gap-4 text-center w-1/3 sm:w-1/4 md:w-1/5"
              >
                <div className="flex flex-col items-center gap-4 z-1">
                  <span
                    data-slot="avatar"
                    className="relative flex size-8 shrink-0 h-16 w-16 transition-all"
                  >
                    {p.number && (
                      <PokedexIcon
                        aria-label={p.title}
                        number={p.number}
                        width={64}
                        height={64}
                        className="group-hover:scale-150 transition-transform duration-300 ease-in-out"
                      />
                    )}
                  </span>
                  <div className="flex flex-col">
                    <p className="text-foreground text-base font-semibold">
                      {p.title}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      # {p.number}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default PokedexGrid
