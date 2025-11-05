import { Config, Field, Infer } from "alinea";
import { defaultBlocks } from "../blocks/Blocks.schema";
import { PokemonSet } from "./PokemonSet";

export type PokemonSerie = Infer<typeof PokemonSerie>;

export const PokemonSerie = Config.type("Pokémon series", {
  fields: {
    title: Field.text("Title", { width: 1 }),
    path: Field.path("Path", { hidden: true }),
    blocks: Field.list("Blocks", {
      schema: defaultBlocks,
    }),
  },
  contains: ["PokemonSet"],
  orderChildrenBy: { desc: PokemonSet.releaseDate },
});
