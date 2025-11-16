import { PokemonCard } from "@/alinea/schemas/PokemonCard";
import { cms } from "@/cms";
import CardGrid, { CardGridProps } from "@/components/cardgrid/CardGrid";
import Container from "@/components/container/Container";
import { Title } from "@/components/title/Title";
import { blurDataURL } from "@/lib/blurDataURL";
import { notFound } from "next/navigation";

const fetchCardData = async (url: string) => {
  const data = await cms.first({
    type: PokemonCard,
    filter: {
      _status: "published",
      _url: url,
    },
  });

  if (!data) return null;

  const cards = [] as CardGridProps["cards"];

  const basicInfo: CardGridProps["cards"][number] = {
    blurDataURL: blurDataURL(data.card?.thumbHash),
    edgeColor: data.edgeColor,
    focus: data.card?.focus,
    glowColor:
      data.energy || data.subtype
        ? `var(--${data.energy || data.subtype})`
        : undefined,
    id: data._id,
    src: data.card ? `/media${data.card?.src}` : undefined,
    title: data.title,
    variant: "normal",
    // details for PokemonCardDetailsProps:
    isEx: data.isEx,
    isFullArt: data.isFullArt,
    isTrainerGallery: data.isTrainerGallery,
    number: data.number,
    rarity: data.rarity,
  };

  // there are no variants, add the normal card
  if (!data.variants || data.variants.length === 0) {
    cards.push(basicInfo);
  }

  // add the variants
  data.variants?.forEach((variant) => {
    cards.push({
      ...basicInfo,
      id: variant._id,
      foil: variant.foil?.src || undefined,
      mask: variant.mask?.src || undefined,
      pattern: variant.pattern || undefined,
      src:
        variant.variant === "reverse_holofoil" && data.reverseCard?.src
          ? `/media${data.reverseCard?.src}`
          : basicInfo.src,
      title: `${basicInfo.title}`,
      variant: variant.variant || "normal",
    });
  });

  return {
    ...data,
    cards,
  };
};

export default async function Card({
  params,
}: {
  params: Promise<{
    collection: string;
    series: string;
    serie: string;
    set: string;
    card: string;
  }>;
}) {
  const { collection, series, serie, set, card } = await params;
  const cardData = await fetchCardData(
    `/collections/${collection}/${series}/${serie}/${set}/${card}`
  );
  if (!cardData) return notFound();

  return (
    <Container>
      <Title.H1>
        {cardData.title} ({cardData.number})
      </Title.H1>
      <CardGrid cards={cardData.cards} />
    </Container>
  );
}
