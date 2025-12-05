'use client'

import {cardType, CardType} from '@/consts/cardtype'
import {energy, Energy} from '@/consts/energy'
import {rarity, Rarity, rarityOrder} from '@/consts/rarity'
import {BookOpen, Grid} from 'lucide-react'
import {
  parseAsInteger,
  parseAsStringEnum,
  useQueryState,
  useQueryStates
} from 'nuqs'
import {CardProps} from '../card/Card'
import CardGrid from '../cardgrid/CardGrid'
import {PokemonCardDetailsProps} from '../pokemoncarddetails/PokemonCardDetails'
import Tooltip from '../tooltip/Tooltip'
import {ToggleGroup, ToggleGroupItem} from '../ui/toggle-group'
import EnergyFilter from './filters/EnergyFilter'
import HitPointsFilter from './filters/HitPointsFilter'
import RarityFilter from './filters/RarityFilter'
import TypeFilter from './filters/TypeFilter'

type Card = PokemonCardDetailsProps & Omit<CardProps, 'onClick' | 'sizes'>

type PokemonSetOverviewProps = {
  cards: Card[]
}

const PokemonSetOverview: React.FC<PokemonSetOverviewProps> = ({cards}) => {
  const energyParser = parseAsStringEnum<Energy>(
    Object.keys(energy) as Energy[]
  )
  const rarityParser = parseAsStringEnum<Rarity>(
    Object.keys(rarity) as Rarity[]
  )
  const cardTypeParser = parseAsStringEnum<CardType>(
    Object.keys(cardType) as CardType[]
  )
  const [filters, setFilters] = useQueryStates({
    energy: energyParser,
    hp: parseAsInteger,
    rarity: rarityParser,
    cardtype: cardTypeParser
  })
  const [viewMode, setViewMode] = useQueryState(
    'view',
    parseAsStringEnum(['grid', 'binder']).withDefault('grid')
  )
  const [pockets, setPockets] = useQueryState(
    'pockets',
    parseAsStringEnum(['4', '9', '12', '16']).withDefault('9')
  )

  const selectedEnergy = filters.energy
  const selectedHitPoints = filters.hp
  const selectedRarity = filters.rarity
  const selectedCardType = filters.cardtype

  const availableEnergies = Array.from(
    new Set(cards.map(card => card.energy).filter(Boolean))
  )
    .filter(Boolean)
    .sort((a, b) => a!.localeCompare(b!)) as Energy[]

  const availableHitPoints = Array.from(
    new Set(
      cards
        .map(card => card.hp)
        .filter(hitPoints => hitPoints !== null && hitPoints !== undefined)
    )
  )
    .filter(Boolean)
    .sort((a, b) => a! - b!) as number[]

  const availableRarities = (
    Array.from(new Set(cards.map(card => card.rarity).filter(Boolean))).filter(
      Boolean
    ) as Rarity[]
  ).sort((a, b) => rarityOrder.indexOf(a) - rarityOrder.indexOf(b))

  const availableTypes = Array.from(
    new Set(cards.map(card => card.cardtype).filter(Boolean))
  ).filter(Boolean) as CardType[]

  return (
    <>
      <div className="pb-10 flex gap-4 flex-wrap items-end justify-between">
        <div className="flex items-center gap-2 lg:gap-4 flex-wrap">
          <EnergyFilter
            options={availableEnergies}
            onChange={({value}) => {
              setFilters({energy: value})
            }}
            selected={selectedEnergy}
          />
          <HitPointsFilter
            options={availableHitPoints}
            onChange={({value}) => {
              setFilters({hp: value})
            }}
            selected={selectedHitPoints}
          />
          <RarityFilter
            options={availableRarities}
            onChange={({value}) => {
              setFilters({rarity: value})
            }}
            selected={selectedRarity}
          />
          <TypeFilter
            options={availableTypes}
            onChange={({value}) => {
              setFilters({cardtype: value})
            }}
            selected={selectedCardType}
          />
        </div>
        <div className="flex items-center gap-2 lg:gap-4">
          <div className="flex items-center gap-1 lg:gap-2">
            <span className="hidden text-xs whitespace-nowrap text-muted-foreground xl:inline-block">
              View Mode
            </span>
            <ToggleGroup
              size="sm"
              type="single"
              variant="outline"
              style={{'--radius': '8px'} as React.CSSProperties}
            >
              <Tooltip text="Grid view">
                <ToggleGroupItem
                  aria-checked={viewMode === 'grid' ? 'true' : 'false'}
                  aria-label="Grid view"
                  className="p-1.5 cursor-pointer aria-[checked=true]:bg-accent aria-[checked=true]:text-accent-foreground"
                  onClick={() => {
                    setViewMode('grid')
                    setPockets(null)
                  }}
                  tabIndex={undefined}
                  value="grid"
                >
                  <Grid />
                </ToggleGroupItem>
              </Tooltip>
              <Tooltip text="Binder view">
                <ToggleGroupItem
                  aria-checked={viewMode === 'binder' ? 'true' : 'false'}
                  aria-label="Binder view"
                  className="p-1.5 cursor-pointer font-normal aria-[checked=true]:bg-accent aria-[checked=true]:text-accent-foreground"
                  onClick={() => setViewMode('binder')}
                  tabIndex={undefined}
                  value="binder"
                >
                  <BookOpen />
                </ToggleGroupItem>
              </Tooltip>
            </ToggleGroup>
          </div>
          {viewMode === 'binder' && (
            <div className="flex items-center gap-1 lg:gap-2">
              <span className="hidden text-xs whitespace-nowrap text-muted-foreground xl:inline-block">
                Pockets
              </span>
              <ToggleGroup
                size="sm"
                type="single"
                variant="outline"
                style={{'--radius': '8px'} as React.CSSProperties}
              >
                {(['4', '9', '12', '16'] as (typeof pockets)[]).map(p => (
                  <Tooltip text={`${p}-pocket`} key={p}>
                    <ToggleGroupItem
                      aria-checked={pockets === p ? 'true' : 'false'}
                      aria-label={`${p}-pocket`}
                      className="p-1.5 px-2.5 cursor-pointer font-normal aria-[checked=true]:bg-accent aria-[checked=true]:text-accent-foreground"
                      onClick={() => setPockets(p)}
                      tabIndex={undefined}
                      value={p}
                    >
                      {p}
                    </ToggleGroupItem>
                  </Tooltip>
                ))}
              </ToggleGroup>
            </div>
          )}
        </div>
      </div>
      <CardGrid
        cards={cards.filter(card => {
          if (selectedEnergy && card.energy !== selectedEnergy) return false
          if (selectedHitPoints && card.hp !== selectedHitPoints) return false
          if (selectedRarity && card.rarity !== selectedRarity) return false
          if (selectedCardType && card.cardtype !== selectedCardType)
            return false
          return true
        })}
      />
    </>
  )
}

export default PokemonSetOverview
