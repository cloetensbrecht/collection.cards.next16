import { Config, Field, Infer } from "alinea";
import { defaultBlocks } from "../blocks/Blocks.schema";

export type Page = Infer<typeof Page>;

export const Page = Config.type("Page", {
  fields: {
    title: Field.text("Title", { width: 0.5 }),
    path: Field.path("Path", { width: 0.5 }),
    blocks: Field.list("Blocks", {
      schema: defaultBlocks,
    }),
  },
});
