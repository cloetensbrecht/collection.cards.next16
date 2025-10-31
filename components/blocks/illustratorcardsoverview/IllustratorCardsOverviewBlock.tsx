import { IllustratorCardsOverviewBlock as IllustratorCardsOverviewBlockSchema } from "@/alinea/blocks/illustratorcardsoverview/IllustratorCardsOverviewBlock.schema";
import { PokemonCard } from "@/alinea/schemas/PokemonCard";
import { cms } from "@/cms";
import CardGrid from "@/components/cardgrid/CardGrid";
import { blurDataURL } from "@/lib/blurDataURL";
import { Query } from "alinea";

const fetchIllustratorCards = async (illustratorId: string) => {
  return (
    await cms.find({
      type: PokemonCard,
      select: {
        card: PokemonCard.card,
        title: PokemonCard.title,
        id: Query.id,
      },
      filter: {
        illustrator: { has: { _entry: { in: [illustratorId] } } },
      },
      orderBy: { asc: Query.id },
    })
  )
    .filter(({ card }) => card !== undefined && card.src !== undefined)
    .map((item) => {
      return {
        averageColor: item.card?.averageColor,
        blurDataURL: blurDataURL(item.card?.thumbHash),
        focus: item.card?.focus,
        id: item.id,
        src: item.card?.src ? `/media${item.card.src}` : undefined,
        title: item.title,
      };
    });
};

const IllustratorCardsOverviewBlock: React.FC<
  IllustratorCardsOverviewBlockSchema
> = async ({ illustratorId }) => {
  const cardsData = await fetchIllustratorCards(illustratorId);
  if (!cardsData || cardsData.length === 0) return null;

  return (
    <div>
      <CardGrid data={cardsData} />
    </div>
  );
};

export default IllustratorCardsOverviewBlock;
