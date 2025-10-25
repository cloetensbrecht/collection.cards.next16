import { IcOutlineSettings } from "@/icons/IcOutlineSettings";
import { Config } from "alinea";

export const main = Config.workspace("collection.cards", {
  source: "content",
  mediaDir: "public/media",
  roots: {
    pages: Config.root("Pages", {
      contains: ["Page", "Collections", "Illustrators"],
    }),
    general: Config.root("General", {
      contains: [],
      icon: IcOutlineSettings,
      preview: false,
    }),
    media: Config.media(),
  },
});
