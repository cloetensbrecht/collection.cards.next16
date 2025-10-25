import { Config, Field, Infer } from "alinea";

export type Header = Infer<typeof Header>;

export const Header = Config.type("Header", {
  fields: {
    title: Field.text("Title", { hidden: true, readOnly: true }),
    path: Field.path("Path", { hidden: true, readOnly: true }),
    links: Field.link.multiple("Links", {
      location: { workspace: "main", root: "pages" },
      fields: {
        asButton: Field.check("As button"),
        hideOnMobile: Field.check("Hide on mobile"),
      },
    }),
  },
});
