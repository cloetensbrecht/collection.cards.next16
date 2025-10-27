import IcOutlineFormatAlignLeft from "@/icons/IcOutlineFormatAlignLeft";
import { Config, Field, type Infer } from "alinea";

export type TextBlock = Infer.ListItem<typeof TextBlock>;

export const TextBlock = Config.type("Text", {
  icon: IcOutlineFormatAlignLeft,
  fields: {
    text: Field.richText("Text", {
      required: true,
      searchable: true,
    }),
  },
});
