import { Infer } from "alinea";
import { ListRow } from "alinea/core/shape/ListShape";
import { TextBlock } from "./text/TextBlock.schema";

export type Block = ListRow & Infer<typeof Block>;

export const defaultBlocks = {
  TextBlock,
};

export const extendedBlocks = {};

export const Block = { ...defaultBlocks, ...extendedBlocks };
