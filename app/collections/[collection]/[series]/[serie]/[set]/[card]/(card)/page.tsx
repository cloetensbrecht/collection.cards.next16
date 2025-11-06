import { PokemonCard } from "@/alinea/schemas/PokemonCard";
import { cms } from "@/cms";
import Container from "@/components/container/Container";
import { Title } from "@/components/title/Title";
import { notFound } from "next/navigation";

const fetchCardData = async (url: string) => {
  return await cms.first({
    type: PokemonCard,
    filter: {
      _status: "published",
      _url: url,
    },
  });
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
    </Container>
  );
}
