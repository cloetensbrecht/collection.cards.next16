import { Infer } from "alinea";
import { ListRow } from "alinea/core/shape/ListShape";
import { CollectionSetsOverviewBlock } from "./collectionsetsoverview/CollectionSetsOverviewBlock.schema";
import { IllustratorCardsOverviewBlock } from "./illustratorcardsoverview/IllustratorCardsOverviewBlock.schema";
import { TextBlock } from "./text/TextBlock.schema";

export type Block = ListRow & Infer<typeof Block>;

export const defaultBlocks = {
  TextBlock,
};

export const illustratorBlocks = {
  IllustratorCardsOverviewBlock,
};

export const seriesBlocks = {
  CollectionSetsOverviewBlock,
};

export const serieBlocks = {
  CollectionSetsOverviewBlock,
};

export const Block = {
  ...defaultBlocks,
  ...illustratorBlocks,
  ...seriesBlocks,
  ...serieBlocks,
};
