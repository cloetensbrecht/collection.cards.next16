import {Pokemon} from '@/alinea/schemas/Pokemon'
import {cms} from '@/cms'
import Container from '@/components/container/Container'
import Pattern from '@/components/pattern/Pattern'
import PokedexGrid from '@/components/pokedexgrid/PokedexGrid'
import {Query} from 'alinea'

export default async function PokedexPage() {
  const pokedex = await cms.find({
    type: Pokemon,
    select: {
      number: Pokemon.number,
      path: Query.path,
      title: Query.title,
      url: Query.url
    },
    orderBy: {
      asc: Pokemon.number
    }
  })

  return (
    <Pattern className="pt-24">
      <Container>
        <PokedexGrid pokedex={pokedex} />
      </Container>
    </Pattern>
  )
}
