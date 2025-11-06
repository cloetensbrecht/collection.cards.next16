import { Block } from "@/alinea/blocks/Blocks.schema";
import React from "react";
import CollectionSetsOverviewBlock from "./collectionsetsoverview/CollectionSetsOverviewBlock";
import IllustratorCardsOverviewBlock from "./illustratorcardsoverview/IllustratorCardsOverviewBlock";
import TextBlock from "./text/TextBlock";

type BlocksProps = {
  blocks: Block[];
};

const Blocks: React.FC<BlocksProps> = ({ blocks }) => {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="flex gap-12 flex-col">
      {blocks.map((block) => {
        switch (block._type) {
          case "TextBlock":
            return <TextBlock {...block} key={block._id} />;
          case "IllustratorCardsOverviewBlock":
            return <IllustratorCardsOverviewBlock {...block} key={block._id} />;
          case "CollectionSetsOverviewBlock":
            return <CollectionSetsOverviewBlock {...block} key={block._id} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

export default Blocks;
