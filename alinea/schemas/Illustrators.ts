import { Config, Field, Infer } from "alinea";
import { Illustrator } from "./Illustrator";

export type Illustrators = Infer<typeof Illustrators>;

export const Illustrators = Config.type("Illustrators", {
  fields: {
    title: Field.text("Title", { width: 1 }),
    path: Field.path("Path", { hidden: true, readOnly: true }),
  },
  contains: ["Illustrator"],
  orderChildrenBy: { asc: Illustrator.title },
});
