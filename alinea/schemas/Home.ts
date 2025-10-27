import { Config, Field, Infer } from "alinea";
import { defaultBlocks } from "../blocks/Blocks.schema";

export type Home = Infer<typeof Home>;

export const Home = Config.type("Home", {
  fields: {
    title: Field.text("Title", { hidden: true }),
    path: Field.path("Path", { hidden: true }),
    blocks: Field.list("", {
      schema: defaultBlocks,
    }),
  },
});
