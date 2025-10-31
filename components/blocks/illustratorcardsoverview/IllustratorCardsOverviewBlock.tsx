import { IllustratorCardsOverviewBlock as IllustratorCardsOverviewBlockSchema } from "@/alinea/blocks/illustratorcardsoverview/IllustratorCardsOverviewBlock.schema";
import CardGrid from "@/components/cardgrid/CardGrid";

const IllustratorCardsOverviewBlock: React.FC<
  IllustratorCardsOverviewBlockSchema
> = () => {
  return (
    <div>
      <CardGrid />
    </div>
  );
};

export default IllustratorCardsOverviewBlock;
