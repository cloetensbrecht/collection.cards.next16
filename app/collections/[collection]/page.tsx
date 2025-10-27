import { PokemonCollection } from "@/alinea/schemas/PokemonCollection";
import { PokemonSet } from "@/alinea/schemas/PokemonSet";
import { cms } from "@/cms";
import Paragraph from "@/components/paragraph/Paragraph";
import { Title } from "@/components/title/Title";
import { Query } from "alinea";
import { notFound } from "next/navigation";

const fetchCollectionData = async (collection: string) => {
  return await cms.first({
    type: PokemonCollection,
    filter: {
      _status: "published",
      path: collection,
    },
    select: {
      title: Query.title,
      sets: Query.children({
        type: PokemonSet,
        filter: {
          _status: "published",
        },
        orderBy: { desc: PokemonSet.releaseDate },
      }),
    },
  });
};

export default async function Collection({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  const collectionData = await fetchCollectionData(collection);
  if (!collectionData) notFound();

  return (
    <div>
      <Title.H1>{collectionData.title}</Title.H1>
      <Title.H2>{collectionData.title}</Title.H2>
      <Title.H3>{collectionData.title}</Title.H3>
      <Paragraph>{collectionData.title}</Paragraph>
      <Paragraph className="text-foreground">{collectionData.title}</Paragraph>
    </div>
  );
}
