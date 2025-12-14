import {PokemonCard} from '@/alinea/schemas/PokemonCard'
import {cms} from '@/cms'
import {CardGridProps} from '@/components/cardgrid/CardGrid'
import {blurDataURL} from '@/lib/blurDataURL'

export const fetchPokemonCards = async (
  pokemonCardIds: string[]
): Promise<CardGridProps['cards']> => {
  const cardsData = (
    await cms.find({
      type: PokemonCard,
      filter: {
        _id: {in: pokemonCardIds}
      }
    })
  ).sort(
    (a, b) => pokemonCardIds.indexOf(a._id) - pokemonCardIds.indexOf(b._id)
  )

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
      return
    }

    // add the variants
    data.variants.forEach(variant => {
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
