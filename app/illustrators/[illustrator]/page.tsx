import { Illustrator as IllustratorSchema } from "@/alinea/schemas/Illustrator";
import { cms } from "@/cms";
import Blocks from "@/components/blocks/Blocks";
import Container from "@/components/container/Container";
import { Title } from "@/components/title/Title";
import { notFound } from "next/navigation";

const fetchIllustrator = async (illustrator: string) => {
  return await cms.first({
    type: IllustratorSchema,
    path: illustrator,
  });
};

export default async function Illustratorr({
  params,
}: {
  params: Promise<{ illustrator: string }>;
}) {
  const { illustrator } = await params;
  const illustratorData = await fetchIllustrator(illustrator);
  if (!illustratorData) return notFound();

  const blocksWithOverview = illustratorData.blocks || [];
  const generatedIllustratorCardsOverviewBlock = {
    _index: "illustrator-cards-overview-block-generated",
    _type: "IllustratorCardsOverviewBlock" as const,
    _id: "illustrator-cards-overview-block-generated",
  };
  if (
    blocksWithOverview.length === 0 ||
    !blocksWithOverview.find(
      (block) => block._type === "IllustratorCardsOverviewBlock"
    )
  ) {
    blocksWithOverview.push(generatedIllustratorCardsOverviewBlock);
  }

  return (
    <Container>
      <Title.H1>{illustratorData?.title}</Title.H1>
      <Blocks blocks={blocksWithOverview} />
    </Container>
  );
}
