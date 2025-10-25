import { createCMS } from "alinea/next";
import { Collections } from "./alinea/schemas/Collections";
import { Footer } from "./alinea/schemas/Footer";
import { Illustrator } from "./alinea/schemas/Illustrator";
import { Illustrators } from "./alinea/schemas/Illustrators";
import { Page } from "./alinea/schemas/Page";
import { PokemonCard } from "./alinea/schemas/PokemonCard";
import { PokemonCollection } from "./alinea/schemas/PokemonCollection";
import { PokemonSet } from "./alinea/schemas/PokemonSet";
import { main } from "./alinea/workspaces/main";

export const cms = createCMS({
  // List out available types in your schema
  schema: {
    Collections,
    Footer,
    Illustrator,
    Illustrators,
    Page,
    PokemonCard,
    PokemonCollection,
    PokemonSet,
  },

  // Define the content structure of your CMS
  workspaces: {
    main,
  },

  baseUrl: {
    // Point to your local website
    development: "http://localhost:3000",
    // The production URL of your website
    production: process.env.PUBLIC_SITE_URL ?? "https://example.com",
  },

  // Enable live previews after adding <cms.previews widget /> to your layout
  preview: true,

  // The handler route URL
  handlerUrl: "/api/cms",

  // The admin dashboard will be bundled in this static file
  dashboardFile: "admin.html",
});
