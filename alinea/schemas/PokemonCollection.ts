import { Config, Field, Infer } from "alinea";
import { defaultBlocks } from "../blocks/Blocks.schema";

export type PokemonCollection = Infer<typeof PokemonCollection>;

export const PokemonCollection = Config.type("Pokémon", {
  fields: {
    title: Field.text("Title"),
    path: Field.path("Path", { hidden: true }),
    icon: Field.image("Icon"),
    blocks: Field.list("Blocks", {
      schema: defaultBlocks,
    }),
  },
  contains: ["PokemonSeries"],
  insertOrder: "first",
});
