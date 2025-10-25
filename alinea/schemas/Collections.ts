import { Config, Field, Infer } from "alinea";

export type Collections = Infer<typeof Collections>;

export const Collections = Config.type("Collections", {
  fields: {
    title: Field.text("Title", { width: 0.5 }),
    path: Field.path("Path", { width: 0.5 }),
  },
  contains: ["PokemonCollection"],
});
