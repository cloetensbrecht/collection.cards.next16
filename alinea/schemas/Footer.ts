import { Config, Field, Infer } from "alinea";

export type Footer = Infer<typeof Footer>;

export const Footer = Config.type("Footer", {
  fields: {
    title: Field.text("Title", { hidden: true, readOnly: true }),
    path: Field.path("Path", { hidden: true, readOnly: true }),
    ...Field.tabs(
      Field.tab("Primary footer", {
        fields: {
          columns: Field.list("Columns", {
            schema: {
              Column: Config.type("Column", {
                fields: {
                  title: Field.text("Title"),
                  items: Field.list("Items", {
                    schema: {
                      Icons: Config.type("Icons", {
                        fields: {
                          links: Field.link.multiple("Link", {
                            inline: true,
                            location: { workspace: "main", root: "pages" },
                            fields: {
                              icon: Field.select("Icon", {
                                options: {
                                  discord: "Discord",
                                  github: "GitHub",
                                  reddit: "Reddit",
                                },
                                required: true,
                              }),
                            },
                          }),
                        },
                      }),
                      Link: Config.type("Link", {
                        fields: {
                          link: Field.link("Link", {
                            location: { workspace: "main", root: "pages" },
                          }),
                        },
                      }),
                      Text: Config.type("Text", {
                        fields: {
                          text: Field.richText("Text"),
                        },
                      }),
                    },
                  }),
                },
              }),
            },
          }),
        },
      }),
      Field.tab("Legal footer", {
        fields: {
          copyright: Field.text("Copyright"),
          disclaimer: Field.richText("Disclaimer"),
          legal_links: Field.entry.multiple("Legal Links", {
            location: { workspace: "main", root: "pages" },
            condition: { _type: "Page" },
          }),
        },
      })
    ),
  },
});
