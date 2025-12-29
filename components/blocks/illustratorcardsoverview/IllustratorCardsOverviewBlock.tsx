import {IllustratorCardsOverviewBlock as IllustratorCardsOverviewBlockSchema} from '@/alinea/blocks/illustratorcardsoverview/IllustratorCardsOverviewBlock.schema'
import {PokemonCard} from '@/alinea/schemas/PokemonCard'
import {cms} from '@/cms'
import CardGrid, {CardGridProps} from '@/components/cardgrid/CardGrid'
import NoResults from '@/components/noresults/NoResults'
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

  if (!cardsData || cardsData.length === 0)
    return (
      <NoResults
        contribute={true}
        title="This illustrator has no cards yet"
        description={`No cards have been added for this illustrator.\nBe the first to contribute and help the community grow.`}
      />
    )

  return (
    <div>
      <CardGrid cards={cardsData} />
    </div>
  )
}

export default IllustratorCardsOverviewBlock
