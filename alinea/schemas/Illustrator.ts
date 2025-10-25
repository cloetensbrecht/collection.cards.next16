import { IcOutlinePalette } from "@/icons/IcOutlinePalette";
import { Config, Field, Infer } from "alinea";

export type Illustrator = Infer<typeof Illustrator>;

export const Illustrator = Config.type("Illustrator", {
  fields: {
    title: Field.text("Name", { width: 0.5 }),
    path: Field.path("Path", { width: 0.5 }),
  },
  insertOrder: "first",
  icon: IcOutlinePalette,
});
