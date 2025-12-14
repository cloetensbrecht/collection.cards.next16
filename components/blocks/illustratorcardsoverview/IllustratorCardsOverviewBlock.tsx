import {IllustratorCardsOverviewBlock as IllustratorCardsOverviewBlockSchema} from '@/alinea/blocks/illustratorcardsoverview/IllustratorCardsOverviewBlock.schema'
import {PokemonCard} from '@/alinea/schemas/PokemonCard'
import {cms} from '@/cms'
import CardGrid, {CardGridProps} from '@/components/cardgrid/CardGrid'
import {fetchPokemonCards} from '@/server/fetchPokemonCards'
import {Query} from 'alinea'

const fetchIllustratorCards = async (
  illustratorId: string
): Promise<CardGridProps['cards']> => {
  const illustratorCardIds = await cms.find({
    type: PokemonCard,
    select: {
      id: Query.id
    },
    filter: {
      illustrator: {has: {_entry: {in: [illustratorId]}}}
    },
    orderBy: {asc: Query.id}
  })

  return await fetchPokemonCards(illustratorCardIds.map(pc => pc.id))
}

const IllustratorCardsOverviewBlock: React.FC<
  IllustratorCardsOverviewBlockSchema
> = async ({illustratorId}) => {
  const cardsData = await fetchIllustratorCards(illustratorId)
  if (!cardsData || cardsData.length === 0) return null

  return (
    <div>
      <CardGrid cards={cardsData} />
    </div>
  )
}

export default IllustratorCardsOverviewBlock
