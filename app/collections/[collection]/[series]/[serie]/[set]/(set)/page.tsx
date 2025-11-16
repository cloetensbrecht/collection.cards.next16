import { PokemonCard } from "@/alinea/schemas/PokemonCard";
import { PokemonSet } from "@/alinea/schemas/PokemonSet";
import { cms } from "@/cms";
import CardGrid, { CardGridProps } from "@/components/cardgrid/CardGrid";
import Container from "@/components/container/Container";
import { Title } from "@/components/title/Title";
import { blurDataURL } from "@/lib/blurDataURL";
import { Query } from "alinea";
import { notFound } from "next/navigation";

const fetchSetData = async (url: string) => {
  const data = await cms.first({
    type: PokemonSet,
    select: {
      ...PokemonSet,
      cards: Query.children({
        type: PokemonCard,
        orderBy: { asc: PokemonCard.number },
      }),
    },
    filter: {
      _status: "published",
      _url: url,
    },
  });

  return data
    ? {
        ...data,
        cards: (data.cards as (PokemonCard & { _id: string })[]).reduce(
          (acc, item) => {
            if (!item.card?.src) return acc;

            const basicInfo: CardGridProps["cards"][number] = {
              blurDataURL: blurDataURL(item.card?.thumbHash),
              edgeColor: item.edgeColor,
              focus: item.card?.focus,
              glowColor:
                item.energy || item.subtype
                  ? `var(--${item.energy || item.subtype})`
                  : undefined,
              id: item._id,
              src: `/media${item.card.src}`,
              title: item.title,
              variant: "normal",
              // details for PokemonCardDetailsProps:
              isEx: item.isEx,
              isFullArt: item.isFullArt,
              isTrainerGallery: item.isTrainerGallery,
              number: item.number,
              rarity: item.rarity,
            };

            // there are no variants, add the normal card
            if (!item.variants || item.variants.length === 0) {
              acc.push(basicInfo);
              return acc;
            }

            // add the variants
            item.variants?.forEach((variant) => {
              acc.push({
                ...basicInfo,
                id: variant._id,
                foil: variant.foil?.src || undefined,
                mask: variant.mask?.src || undefined,
                pattern: variant.pattern || undefined,
                src:
                  variant.variant === "reverse_holofoil" &&
                  item.reverseCard?.src
                    ? `/media${item.reverseCard?.src}`
                    : basicInfo.src,
                title: `${basicInfo.title}`,
                variant: variant.variant || "normal",
              });
            });
            return acc;
          },
          [] as CardGridProps["cards"]
        ),
      }
    : null;
};

export default async function Set({
  params,
}: {
  params: Promise<{
    collection: string;
    series: string;
    serie: string;
    set: string;
  }>;
}) {
  const { collection, series, serie, set } = await params;
  const setData = await fetchSetData(
    `/collections/${collection}/${series}/${serie}/${set}`
  );
  if (!setData) return notFound();

  return (
    <Container>
      <Title.H1>{setData.title}</Title.H1>
      <CardGrid cards={setData.cards} />
    </Container>
  );
}
