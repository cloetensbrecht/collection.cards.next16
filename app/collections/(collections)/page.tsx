import { Collections as CollectionsSchema } from "@/alinea/schemas/Collections";
import { cms } from "@/cms";
import Blocks from "@/components/blocks/Blocks";
import Container from "@/components/container/Container";
import { Title } from "@/components/title/Title";
import { notFound } from "next/navigation";

const fetchPage = async () => {
  return await cms.first({
    type: CollectionsSchema,
    filter: {
      _status: "published",
    },
  });
};

export default async function Collections() {
  const collectionsData = await fetchPage();
  if (!collectionsData) return notFound();

  return (
    <Container>
      <Title.H1>{collectionsData.title}</Title.H1>
      <Blocks blocks={collectionsData.blocks} />
    </Container>
  );
}
