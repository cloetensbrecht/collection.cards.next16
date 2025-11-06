import IcOutlineViewColumn from "@/icons/IcOutlineViewColumn";
import { Config, Field, type Infer } from "alinea";

export type CollectionSetsOverviewBlock = Infer<
  typeof CollectionSetsOverviewBlock
>;

export const CollectionSetsOverviewBlock = Config.type("Sets overview", {
  icon: IcOutlineViewColumn,
  fields: {
    // This is a placeholder block; there are no configurable fields
    setIds: Field.entry.multiple("Set", {
      location: { workspace: "main", root: "pages" },
      hidden: true,
    }),
  },
});
