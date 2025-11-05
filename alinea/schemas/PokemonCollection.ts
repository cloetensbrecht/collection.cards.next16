import { Config, Field, Infer } from "alinea";
import { PokemonSet } from "./PokemonSet";

export type PokemonCollection = Infer<typeof PokemonCollection>;

export const PokemonCollection = Config.type("Pokémon", {
  fields: {
    title: Field.text("Title"),
    path: Field.path("Path", { hidden: true }),
    icon: Field.image("Icon"),
  },
  contains: ["PokemonSeries"],
  insertOrder: "first",
  orderChildrenBy: { desc: PokemonSet.releaseDate },
});
