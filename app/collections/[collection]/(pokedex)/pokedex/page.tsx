import {Pokedex} from '@/alinea/schemas/Pokedex'
import {Pokemon} from '@/alinea/schemas/Pokemon'
import {cms} from '@/cms'
import Blocks from '@/components/blocks/Blocks'
import Container from '@/components/container/Container'
import Pattern from '@/components/pattern/Pattern'
import PokedexGrid from '@/components/pokedexgrid/PokedexGrid'
import {Title} from '@/components/title/Title'
import {Query} from 'alinea'
import {notFound} from 'next/navigation'

const pageData = async () => {
  return await cms.first({
    type: Pokedex,
    select: {
      title: Query.title,
      blocks: Pokedex.blocks
    }
  })
}

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

export async function generateStaticParams() {
  return [
    {
      collection: 'pokemon'
    }
  ]
}

export default async function PokedexPage() {
  const data = await pageData()
  if (!data) return notFound()

  return (
    <>
      <Container>
        <Title.H1>{data.title}</Title.H1>
        <Blocks blocks={data.blocks} />
      </Container>
      <Pattern className="pt-24">
        <Container>
          <PokedexGrid pokedex={pokedex} />
        </Container>
      </Pattern>
    </>
  )
}
