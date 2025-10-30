import { Block } from "@/alinea/blocks/Blocks.schema";
import React from "react";
import IllustratorCardsOverviewBlock from "./illustratorcardsoverview/IllustratorCardsOverviewBlock";
import TextBlock from "./text/TextBlock";

type BlocksProps = {
  blocks: Block[];
};

const Blocks: React.FC<BlocksProps> = ({ blocks }) => {
  if (!blocks || blocks.length === 0) return null;

  return blocks.map((block) => {
    switch (block._type) {
      case "TextBlock":
        return <TextBlock {...block} key={block._id} />;
      case "IllustratorCardsOverviewBlock":
        return <IllustratorCardsOverviewBlock {...block} key={block._id} />;
      default:
        return null;
    }
  });
};

export default Blocks;
