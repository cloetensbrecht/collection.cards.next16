import { PokemonSet } from "@/alinea/schemas/PokemonSet";
import { cms } from "@/cms";
import Container from "@/components/container/Container";
import { Title } from "@/components/title/Title";
import { notFound } from "next/navigation";

const fetchSetData = async (url: string) => {
  return await cms.first({
    type: PokemonSet,
    filter: {
      _status: "published",
      _url: url,
    },
  });
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
    </Container>
  );
}
