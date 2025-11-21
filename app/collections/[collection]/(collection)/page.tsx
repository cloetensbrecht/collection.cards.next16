import {PokemonCard} from '@/alinea/schemas/PokemonCard'
import {PokemonCollection} from '@/alinea/schemas/PokemonCollection'
import {PokemonSet} from '@/alinea/schemas/PokemonSet'
import {cms} from '@/cms'
import Blocks from '@/components/blocks/Blocks'
import Container from '@/components/container/Container'
import SetCard from '@/components/setcard/SetCard'
import {Title} from '@/components/title/Title'
import {formatDate} from '@/lib/formatDate'
import {Query} from 'alinea'
import {Entry} from 'alinea/core'
import {notFound} from 'next/navigation'

const fetchCollectionData = async (collection: string) =>
  await cms.first({
    type: PokemonCollection,
    filter: {
      _status: 'published',
      path: collection
    },
    select: {
      title: Query.title,
      blocks: PokemonCollection.blocks,
      sets: Query.children({
        depth: 3,
        type: PokemonSet,
        select: {
          ...PokemonSet,
          parents: Query.parents({
            select: {
              _type: Query.type,
              title: Query.title
            }
          }),
          url: Entry.url,
          cards: Query.children({
            type: PokemonCard,
            select: {
              variants: PokemonCard.variants
            }
          })
        },
        filter: {
          _status: 'published'
        },
        orderBy: {desc: PokemonSet.releaseDate}
      })
    }
  })

export async function generateStaticParams() {
  return await cms.find({
    type: PokemonCollection,
    select: {
      collection: Query.path
    }
  })
}

export default async function Collection({
  params
}: {
  params: Promise<{collection: string}>
}) {
  const {collection} = await params
  const collectionData = await fetchCollectionData(collection)
  if (!collectionData) notFound()

  return (
    <Container>
      <Title.H1>{collectionData.title}</Title.H1>
      <Blocks blocks={collectionData.blocks} />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {collectionData.sets.map((set, index) => {
          const numberOfTotalCards = set.cards.reduce(
            (total, card) => total + (card.variants?.length || 1),
            0
          )
          return (
            <SetCard
              date={formatDate(set.releaseDate)}
              key={set.path}
              href={set.url}
              image={set.heroImage}
              numberOfTotalCards={numberOfTotalCards}
              priority={index < 5}
              subTitle={
                set.parents.find(p => p._type === 'PokemonSerie')?.title || ''
              }
              symbol={set.symbol?.[0] || undefined}
              text={set.cta_description}
              title={set.title}
            />
          )
        })}
      </div>
    </Container>
  )
}
