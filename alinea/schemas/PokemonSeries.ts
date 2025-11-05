import { Config, Field, Infer } from "alinea";
import { defaultBlocks } from "../blocks/Blocks.schema";

export type PokemonSeries = Infer<typeof PokemonSeries>;

export const PokemonSeries = Config.type("Pokémon series", {
  fields: {
    title: Field.text("Title", { width: 1 }),
    path: Field.path("Path", { hidden: true }),
    blocks: Field.list("Blocks", {
      schema: defaultBlocks,
    }),
  },
  contains: ["PokemonSerie"],
  insertOrder: "first",
});
