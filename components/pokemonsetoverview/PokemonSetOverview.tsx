'use client'

import {energy, Energy} from '@/consts/energy'
import {parseAsStringEnum, useQueryStates} from 'nuqs'
import {CardProps} from '../card/Card'
import CardGrid from '../cardgrid/CardGrid'
import {PokemonCardDetailsProps} from '../pokemoncarddetails/PokemonCardDetails'
import EnergyFilter from './filters/EnergyFilter'

type Card = PokemonCardDetailsProps & Omit<CardProps, 'onClick' | 'sizes'>

type PokemonSetOverviewProps = {
  cards: Card[]
}

const PokemonSetOverview: React.FC<PokemonSetOverviewProps> = ({cards}) => {
  const energyParser = parseAsStringEnum<keyof Energy>(
    Object.keys(energy) as (keyof Energy)[]
  )
  const [filters, setFilters] = useQueryStates({
    energy: energyParser
  })

  const selectedEnergy = filters.energy

  const availableEnergies = Array.from(
    new Set(cards.map(card => card.energy).filter(Boolean))
  )
    .filter(Boolean)
    .sort((a, b) => a!.localeCompare(b!)) as (keyof Energy)[]

  return (
    <>
      <div className="pb-10">
        <EnergyFilter
          options={availableEnergies}
          onChange={({value}) => {
            setFilters({energy: value})
          }}
          selected={selectedEnergy}
        />
      </div>
      <CardGrid
        cards={cards.filter(card => {
          if (selectedEnergy && card.energy !== selectedEnergy) return false
          return true
        })}
      />
    </>
  )
}

export default PokemonSetOverview
