import {PokemonCard} from '@/alinea/schemas/PokemonCard'
import {PokemonCollection} from '@/alinea/schemas/PokemonCollection'
import {PokemonSerie} from '@/alinea/schemas/PokemonSerie'
import {PokemonSeries} from '@/alinea/schemas/PokemonSeries'
import {PokemonSet} from '@/alinea/schemas/PokemonSet'
import {cms} from '@/cms'
import CardGrid, {CardGridProps} from '@/components/cardgrid/CardGrid'
import Container from '@/components/container/Container'
import {Title} from '@/components/title/Title'
import {blurDataURL} from '@/lib/blurDataURL'
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

  const cards = [] as CardGridProps['cards']

  const basicInfo: CardGridProps['cards'][number] = {
    blurDataURL: blurDataURL(data.card?.thumbHash),
    cardtype: data.cardtype,
    edgeColor: data.edgeColor,
    energy: data.energy,
    focus: data.card?.focus,
    glowColor:
      data.energy || data.subtype
        ? `var(--${data.energy || data.subtype})`
        : undefined,
    hp: data.hp,
    id: data._id,
    pokemon: data.pokemon,
    src: data.card ? `/media${data.card?.src}` : undefined,
    title: data.title,
    variant: 'normal',
    // details for PokemonCardDetailsProps:
    isEx: data.isEx,
    isFullArt: data.isFullArt,
    isTrainerGallery: data.isTrainerGallery,
    number: data.number,
    rarity: data.rarity
  }

  // there are no variants, add the normal card
  if (!data.variants || data.variants.length === 0) {
    cards.push(basicInfo)
  }

  // add the variants
  data.variants?.forEach(variant => {
    cards.push({
      ...basicInfo,
      id: variant._id,
      foil: variant.foil?.src || undefined,
      mask: variant.mask?.src || undefined,
      pattern: variant.pattern || undefined,
      src:
        variant.variant === 'reverse_holofoil' && data.reverseCard?.src
          ? `/media${data.reverseCard?.src}`
          : basicInfo.src,
      title: `${basicInfo.title}`,
      variant: variant.variant || 'normal'
    })
  })

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
