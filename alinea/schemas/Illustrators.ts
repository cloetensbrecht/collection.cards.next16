import { Config, Field, Infer } from "alinea";
import { Illustrator } from "./Illustrator";

export type Illustrators = Infer<typeof Illustrators>;

export const Illustrators = Config.type("Illustrators", {
  fields: {
    title: Field.text("Title", { width: 0.5 }),
    path: Field.path("Path", { width: 0.5 }),
  },
  contains: ["Illustrator"],
  orderChildrenBy: { asc: Illustrator.title },
});
