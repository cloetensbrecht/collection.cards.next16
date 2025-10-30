import IcOutlineViewColumn from "@/icons/IcOutlineViewColumn";
import { Config, type Infer } from "alinea";

export type IllustratorCardsOverviewBlock = Infer<
  typeof IllustratorCardsOverviewBlock
>;

export const IllustratorCardsOverviewBlock = Config.type("Cards overview", {
  icon: IcOutlineViewColumn,
  fields: {
    // This is a placeholder block; there are no configurable fields
  },
});
