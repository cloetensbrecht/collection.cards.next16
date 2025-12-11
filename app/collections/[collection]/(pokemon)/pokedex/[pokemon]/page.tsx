import {Pokemon} from '@/alinea/schemas/Pokemon'
import {cms} from '@/cms'
import Container from '@/components/container/Container'
import {Title} from '@/components/title/Title'
import {Query} from 'alinea'
import {notFound} from 'next/navigation'

export default async function PokemonPage({
  params
}: {
  params: Promise<{collection: string; pokemon: string}>
}) {
  const {pokemon} = await params

  const pokemonData = await cms.first({
    type: Pokemon,
    select: {
      title: Query.title,
      number: Pokemon.number
    },
    filter: {
      path: pokemon
    }
  })

  if (!pokemonData) return notFound()

  return (
    <Container>
      <Title.H1>
        {pokemonData.title}
        <span className="ml-2 text-gray-400 dark:text-gray-300/75 font-normal text-sm">
          #{pokemonData.number}
        </span>
      </Title.H1>
    </Container>
  )
}
