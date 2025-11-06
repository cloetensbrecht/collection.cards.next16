import { PokemonSerie } from "@/alinea/schemas/PokemonSerie";
import { PokemonSet } from "@/alinea/schemas/PokemonSet";
import { cms } from "@/cms";
import Blocks from "@/components/blocks/Blocks";
import Container from "@/components/container/Container";
import { Title } from "@/components/title/Title";
import { Query } from "alinea";
import { notFound } from "next/navigation";

const fetchSerieData = async (url: string) => {
  return await cms.first({
    type: PokemonSerie,
    filter: {
      _status: "published",
      _url: url,
    },
    select: {
      title: Query.title,
      blocks: PokemonSerie.blocks,
      sets: Query.children({
        type: PokemonSet,
        select: {
          id: Query.id,
        },
        filter: {
          _status: "published",
        },
        orderBy: { desc: PokemonSet.releaseDate },
      }),
    },
  });
};

export default async function Serie({
  params,
}: {
  params: Promise<{ collection: string; series: string; serie: string }>;
}) {
  const { collection, series, serie } = await params;
  const serieData = await fetchSerieData(
    `/collections/${collection}/${series}/${serie}`
  );
  if (!serieData) return notFound();

  const blocksWithOverview = serieData.blocks || [];
  const generatedCollectionSetsOverviewBlock = {
    _index: "collection-sets-overview-block-generated",
    _type: "CollectionSetsOverviewBlock" as const,
    _id: "collection-sets-overview-block-generated",
    setIds: serieData.sets.map((set, index) => ({
      _id: `set-${index}`,
      _index: `a${index}`,
      _type: "entry" as const,
      _entry: set.id,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    })) as any[],
  };

  const index = blocksWithOverview.findIndex(
    (block) => block._type === "CollectionSetsOverviewBlock"
  );
  if (index === -1) {
    blocksWithOverview.push(generatedCollectionSetsOverviewBlock);
  } else {
    blocksWithOverview[index] = generatedCollectionSetsOverviewBlock;
  }

  return (
    <Container>
      <Title.H1>{serieData.title}</Title.H1>
      <Blocks blocks={blocksWithOverview} />
    </Container>
  );
}
