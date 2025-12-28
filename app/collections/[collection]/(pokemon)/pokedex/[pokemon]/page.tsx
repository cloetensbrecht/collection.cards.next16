import {Pokemon} from '@/alinea/schemas/Pokemon'
import {PokemonCard} from '@/alinea/schemas/PokemonCard'
import {cms} from '@/cms'
import Blocks from '@/components/blocks/Blocks'
import Container from '@/components/container/Container'
import NoResults from '@/components/noresults/NoResults'
import PokedexIcon from '@/components/pokedexicon/PokedexIcon'
import PokemonSetOverview from '@/components/pokemonsetoverview/PokemonSetOverview'
import {Title} from '@/components/title/Title'
import {fetchPokemonCards} from '@/server/fetchPokemonCards'
import {Query} from 'alinea'
import {notFound} from 'next/navigation'
import {Suspense} from 'react'

const fetchPokemonData = async (pokemonId: string) => {
  const pokemonCardIds = await cms.find({
    type: PokemonCard,
    select: {id: Query.id},
    filter: {
      _status: 'published',
      pokemon: {has: {_entry: {in: [pokemonId]}}}
    },
    orderBy: {asc: Query.id}
  })

  return await fetchPokemonCards(pokemonCardIds.map(pc => pc.id))
}

export default async function PokemonPage({
  params
}: {
  params: Promise<{collection: string; pokemon: string}>
}) {
  const {pokemon} = await params

  const pokemonData = await cms.first({
    type: Pokemon,
    select: {
      id: Query.id,
      title: Query.title,
      number: Pokemon.number,
      blocks: Pokemon.blocks
    },
    filter: {
      path: pokemon
    }
  })

  if (!pokemonData) return notFound()

  const cards = await fetchPokemonData(pokemonData.id)

  return (
    <Container>
      <div className="flex gap-4 pb-5 items-start justify-between">
        <Title.H1>
          {pokemonData.title}
          <span className="ml-2 text-gray-400 dark:text-gray-300/75 font-normal text-sm">
            #{pokemonData.number}
          </span>
        </Title.H1>
        {pokemonData.number && (
          <PokedexIcon number={pokemonData.number} width={48} height={48} />
        )}
      </div>
      <Blocks blocks={pokemonData.blocks} />
      {!cards || cards.length === 0 ? (
        <NoResults
          description={`It looks like there are no cards added for ${pokemonData.title} yet.\n\rMissing cards?`}
        />
      ) : (
        <Suspense>
          <PokemonSetOverview cards={cards} />
        </Suspense>
      )}
    </Container>
  )
}
