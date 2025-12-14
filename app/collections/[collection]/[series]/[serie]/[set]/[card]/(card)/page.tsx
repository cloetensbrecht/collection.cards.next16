import {PokemonCard} from '@/alinea/schemas/PokemonCard'
import {PokemonCollection} from '@/alinea/schemas/PokemonCollection'
import {PokemonSerie} from '@/alinea/schemas/PokemonSerie'
import {PokemonSeries} from '@/alinea/schemas/PokemonSeries'
import {PokemonSet} from '@/alinea/schemas/PokemonSet'
import {cms} from '@/cms'
import CardGrid from '@/components/cardgrid/CardGrid'
import Container from '@/components/container/Container'
import {Title} from '@/components/title/Title'
import {fetchPokemonCards} from '@/server/fetchPokemonCards'
import {Query} from 'alinea'
import {notFound} from 'next/navigation'

const fetchCardData = async (url: string) => {
  const data = await cms.first({
    type: PokemonCard,
    filter: {
      _status: 'published',
      _url: url
    }
  })

  if (!data) return null

  const cards = await fetchPokemonCards([data._id])
  return {
    ...data,
    cards
  }
}

export async function generateStaticParams() {
  const data = await cms.find({
    type: PokemonCollection,
    select: {
      collection: Query.path,
      series: Query.children({
        type: PokemonSeries,
        select: {
          series: Query.path,
          serie: Query.children({
            type: PokemonSerie,
            select: {
              serie: Query.path,
              set: Query.children({
                type: PokemonSet,
                select: {
                  set: Query.path,
                  card: Query.children({
                    type: PokemonCard,
                    select: {
                      card: Query.path
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  })

  return data.flatMap(col =>
    col.series.flatMap(ser =>
      ser.serie.flatMap(seri =>
        seri.set.flatMap(set =>
          set.card.map(card => ({
            collection: col.collection,
            series: ser.series,
            serie: seri.serie,
            set: set.set,
            card: card.card
          }))
        )
      )
    )
  )
}

export default async function Card({
  params
}: {
  params: Promise<{
    collection: string
    series: string
    serie: string
    set: string
    card: string
  }>
}) {
  const {collection, series, serie, set, card} = await params
  const cardData = await fetchCardData(
    `/collections/${collection}/${series}/${serie}/${set}/${card}`
  )
  if (!cardData) return notFound()

  return (
    <Container>
      <Title.H1>
        {cardData.title} ({cardData.number})
      </Title.H1>
      <CardGrid cards={cardData.cards} />
    </Container>
  )
}
