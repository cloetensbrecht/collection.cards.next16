import { IllustratorCardsOverviewBlock as IllustratorCardsOverviewBlockSchema } from "@/alinea/blocks/illustratorcardsoverview/IllustratorCardsOverviewBlock.schema";
import { PokemonCard } from "@/alinea/schemas/PokemonCard";
import { cms } from "@/cms";
import CardGrid, { CardGridProps } from "@/components/cardgrid/CardGrid";
import { blurDataURL } from "@/lib/blurDataURL";
import { Query } from "alinea";

const fetchIllustratorCards = async (
  illustratorId: string
): Promise<CardGridProps["cards"]> => {
  return (
    await cms.find({
      type: PokemonCard,
      select: {
        ...PokemonCard,
        id: Query.id,
      },
      filter: {
        illustrator: { has: { _entry: { in: [illustratorId] } } },
      },
      orderBy: { asc: Query.id },
    })
  )
    .filter(({ card }) => card !== undefined && card.src)
    .map((item) => {
      return {
        averageColor: item.card?.averageColor,
        blurDataURL: blurDataURL(item.card?.thumbHash),
        edgeColor: item.edgeColor,
        focus: item.card?.focus,
        foil: item.variants?.[0]?.foil?.src || undefined,
        glowColor:
          item.energy || item.subtype
            ? `var(--${item.energy || item.subtype})`
            : undefined,
        id: item.id,
        mask: item.variants?.[0]?.mask?.src || undefined,
        src: `/media${item.card.src}`,
        title: item.title,
        variant: item.variants?.[0]?.variant || "normal",
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
      <CardGrid cards={cardsData} />
    </div>
  );
};

export default IllustratorCardsOverviewBlock;
