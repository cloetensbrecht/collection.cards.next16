import { Infer } from "alinea";
import { ListRow } from "alinea/core/shape/ListShape";
import { IllustratorCardsOverviewBlock } from "./illustratorcardsoverview/IllustratorCardsOverviewBlock.schema";
import { TextBlock } from "./text/TextBlock.schema";

export type Block = ListRow & Infer<typeof Block>;

export const defaultBlocks = {
  TextBlock,
};

export const illustratorBlocks = {
  IllustratorCardsOverviewBlock,
};

export const Block = { ...defaultBlocks, ...illustratorBlocks };
