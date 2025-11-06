import { Config, Field, Infer } from "alinea";
import { defaultBlocks } from "../blocks/Blocks.schema";

export type Collections = Infer<typeof Collections>;

export const Collections = Config.type("Collections", {
  fields: {
    title: Field.text("Title", { width: 1 }),
    path: Field.path("Path", { hidden: true, readOnly: true }),
    blocks: Field.list("Blocks", {
      schema: defaultBlocks,
    }),
  },
  contains: ["PokemonCollection"],
});
