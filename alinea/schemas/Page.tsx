import { Config, Field, Infer } from "alinea";

export type Page = Infer<typeof Page>;

export const Page = Config.type("Page", {
  fields: {
    title: Field.text("Title"),
    path: Field.path("Path", { hidden: true }),
  },
});
