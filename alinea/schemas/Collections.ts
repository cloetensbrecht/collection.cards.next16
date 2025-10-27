import { Config, Field, Infer } from "alinea";

export type Collections = Infer<typeof Collections>;

export const Collections = Config.type("Collections", {
  fields: {
    title: Field.text("Title", { width: 1 }),
    path: Field.path("Path", { hidden: true, readOnly: true }),
  },
  contains: ["PokemonCollection"],
});
