import {
  Illustrator,
  Illustrator as IllustratorSchema
} from '@/alinea/schemas/Illustrator'
import {cms} from '@/cms'
import Blocks from '@/components/blocks/Blocks'
import Container from '@/components/container/Container'
import {Title} from '@/components/title/Title'
import {Query} from 'alinea'
import {notFound} from 'next/navigation'

const fetchIllustrator = async (illustrator: string) => {
  return await cms.first({
    type: IllustratorSchema,
    path: illustrator
  })
}

export async function generateStaticParams() {
  return await cms.find({
    type: Illustrator,
    select: {
      illustrator: Query.path
    }
  })
}

export default async function Illustratorr({
  params
}: {
  params: Promise<{illustrator: string}>
}) {
  const {illustrator} = await params
  const illustratorData = await fetchIllustrator(illustrator)
  if (!illustratorData) return notFound()

  const blocksWithOverview = illustratorData.blocks || []
  const generatedIllustratorCardsOverviewBlock = {
    _index: 'illustrator-cards-overview-block-generated',
    _type: 'IllustratorCardsOverviewBlock' as const,
    _id: 'illustrator-cards-overview-block-generated',
    illustratorId: illustratorData._id
  }

  const index = blocksWithOverview.findIndex(
    block => block._type === 'IllustratorCardsOverviewBlock'
  )
  if (index === -1) {
    blocksWithOverview.push(generatedIllustratorCardsOverviewBlock)
  } else {
    blocksWithOverview[index] = generatedIllustratorCardsOverviewBlock
  }

  return (
    <Container>
      <Title.H1>{illustratorData?.title}</Title.H1>
      <Blocks blocks={blocksWithOverview} />
    </Container>
  )
}
