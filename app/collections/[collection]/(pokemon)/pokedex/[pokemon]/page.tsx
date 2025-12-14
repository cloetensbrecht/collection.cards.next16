import {Pokemon} from '@/alinea/schemas/Pokemon'
import {PokemonCard} from '@/alinea/schemas/PokemonCard'
import {cms} from '@/cms'
import {CardGridProps} from '@/components/cardgrid/CardGrid'
import Container from '@/components/container/Container'
import PokemonSetOverview from '@/components/pokemonsetoverview/PokemonSetOverview'
import {Title} from '@/components/title/Title'
import {blurDataURL} from '@/lib/blurDataURL'
import {Query} from 'alinea'
import {notFound} from 'next/navigation'
import {Suspense} from 'react'

const fetchPocemonCards = async (
  pokemonCardIds: string[]
): Promise<CardGridProps['cards']> => {
  const cardsData = await cms.find({
    type: PokemonCard,
    filter: {
      _id: {in: pokemonCardIds}
    }
  })

  const cards = [] as CardGridProps['cards']

  cardsData.forEach(data => {
    if (!data) return

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
  })

  return cards
}

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

  return await fetchPocemonCards(pokemonCardIds.map(pc => pc.id))
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
      number: Pokemon.number
    },
    filter: {
      path: pokemon
    }
  })

  if (!pokemonData) return notFound()

  const cards = await fetchPokemonData(pokemonData.id)

  return (
    <Container>
      <Title.H1>
        {pokemonData.title}
        <span className="ml-2 text-gray-400 dark:text-gray-300/75 font-normal text-sm">
          #{pokemonData.number}
        </span>
      </Title.H1>
      <Suspense>
        <PokemonSetOverview cards={cards} />
      </Suspense>
    </Container>
  )
}
