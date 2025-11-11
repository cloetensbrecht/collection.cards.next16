import { generation } from "@/consts/generaration";
import { Config, Field, Infer } from "alinea";
import { PokemonCard } from "./PokemonCard";

export type PokemonSet = Infer<typeof PokemonSet>;

const GeneralTab = Field.tab("General", {
  fields: {
    number: Field.number("Number", { width: 0.2 }),
    ptcgoCode: Field.text("PTCGO Code", {
      width: 0.2,
    }),
    releaseDate: Field.date("Release date", { width: 0.3 }),
    generation: Field.select("Generation", {
      options: generation,
      width: 0.3,
    }),
    symbol: Field.image.multiple("Symbol"),
    logo: Field.image("Logo"),
    heroImage: Field.image("Hero"),
  },
});

const CtaTab = Field.tab("CTA", {
  fields: {
    cta_description: Field.richText("Description", { required: true }),
  },
});

export const PokemonSet = Config.type("Pokémon Set", {
  fields: {
    title: Field.text("Title", { width: 0.5 }),
    path: Field.path("Path", { hidden: false, width: 0.5 }),
    ...Field.tabs(GeneralTab, CtaTab),
  },
  contains: ["PokemonCard"],
  orderChildrenBy: { desc: PokemonCard.number },
});
