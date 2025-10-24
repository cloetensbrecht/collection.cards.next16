import { Config } from "alinea";

export const main = Config.workspace("collection.cards", {
  source: "content",
  mediaDir: "public/media",
  roots: {
    pages: Config.root("Pages", {
      contains: ["Page", "Collections", "Illustrators"],
    }),
    media: Config.media(),
  },
});
