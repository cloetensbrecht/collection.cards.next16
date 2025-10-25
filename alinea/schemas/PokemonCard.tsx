import { edge } from "@/consts/edge";
import { energy as energyOptions } from "@/consts/energy";
import { pokedex } from "@/consts/pokedex";
import { rarity as rarityOptions } from "@/consts/rarity";
import { IcOutlineCropPortrait } from "@/icons/IcRoundCropPortrait";
import { Config, EntryReference, Field, Infer } from "alinea";

export type PokemonCard = Infer<typeof PokemonCard>;

const ReverseHoloPatterns = {
  pokeBall: "Poké Ball Pattern",
  masterBall: "Master Ball Pattern",
};

const HoloPatterns = {
  tinsel: "Tinsel Holofoil",
};

const VariantField = Field.select("Variant", {
  options: {
    normal: "Normal",
    holofoil: "Holofoil",
    reverse_holofoil: "Reverse Holofoil",
  },
  required: true,
  width: 0.5,
});

const VariantPattern = Field.select("Pattern", {
  options: {
    ...ReverseHoloPatterns,
    ...HoloPatterns,
  },
  width: 0.5,
});

const VariantMask = Field.image("Mask", {
  help: "Optional mask to apply to the card image",
  width: 1,
});

const VariantFoil = Field.image("Foil", {
  help: "Optional foil to apply to the card image",
  width: 1,
});

const Variant = Config.type("Variant", {
  fields: {
    variant: VariantField,
    pattern: VariantPattern,
    mask: VariantMask,
    foil: VariantFoil,
  },
});

const cardtype = Field.select("Card Type", {
  options: {
    pokemon: "Pokémon",
    trainer: "Trainer",
    energy: "Energy",
  },
  width: 0.3,
  required: true,
});

const subtype = Field.select("Subtype", {
  options: {
    item: "Item",
    pokemontool: "Pokémon Tool",
    stadium: "Stadium",
    supporter: "Supporter",
  },
  width: 0.4,
});

const pokemon = Field.select("Pokémon", {
  options: pokedex.reduce((acc, curr) => {
    return { ...acc, [curr.name]: curr.name };
  }, {}),
  width: 0.5,
});

const stage = Field.select("Stage", {
  options: {
    basic: "Basic",
    stage1: "Stage 1",
    stage2: "Stage 2",
  },
  width: 0.3,
});

const energy = Field.select("Energy", {
  options: energyOptions,
  width: 0.3,
});

const rarity = Field.select("Rarity", {
  options: rarityOptions,
  width: 0.5,
  required: true,
});

const illustrator = Field.entry("Illustrator", {
  location: { workspace: "main", root: "pages" },
  condition: { _type: "Illustrator" },
  width: 1,
  required: true,
});

// Make variant field wider when pattern and mask are hidden
Config.track.options(Variant.variant, (get) => ({
  width:
    get(Variant.variant) === undefined || get(Variant.variant) === "normal"
      ? 1
      : 0.5,
}));

// Hide pattern when variant is normal
Config.track.options(Variant.pattern, (get) => ({
  hidden:
    get(Variant.variant) === undefined || get(Variant.variant) === "normal",
  options: (get(VariantField) === "holofoil"
    ? HoloPatterns
    : get(VariantField) === "reverse_holofoil"
    ? ReverseHoloPatterns
    : undefined) as undefined,
}));

// Hide mask when variant is normal
Config.track.options(VariantMask, (get) => ({
  hidden:
    get(Variant.variant) === undefined ||
    get(Variant.variant) === "normal" ||
    (get(Variant.variant) === "reverse_holofoil" &&
      get(Variant.pattern) === "pokeBall") ||
    (get(Variant.variant) === "reverse_holofoil" &&
      get(Variant.pattern) === "masterBall"),
}));

// Hide foil when variant is normal
Config.track.options(VariantFoil, (get) => ({
  hidden:
    get(Variant.variant) === undefined ||
    get(Variant.variant) === "normal" ||
    (get(Variant.variant) === "reverse_holofoil" &&
      get(Variant.pattern) === "pokeBall") ||
    (get(Variant.variant) === "reverse_holofoil" &&
      get(Variant.pattern) === "masterBall"),
}));

Config.track.options(subtype, (get) => ({
  // Hide subtype when cardtype is not trainer
  hidden: get(cardtype) === undefined || get(cardtype) !== "trainer",
}));

Config.track.options(pokemon, (get) => ({
  // Hide pokemon when cardtype is not pokémon
  hidden: get(cardtype) === undefined || get(cardtype) !== "pokemon",
  // Require pokemon when cardtype is pokémon
  required: get(cardtype) === "pokemon",
}));

Config.track.options(stage, (get) => ({
  // Hide stage when cardtype is not pokémon
  hidden: get(cardtype) === undefined || get(cardtype) !== "pokemon",
  // Require stage when cardtype is pokémon
  required: get(cardtype) === "pokemon",
}));

// Hide energy when cardtype is not pokémon or energy
Config.track.options(energy, (get) => ({
  hidden:
    get(cardtype) === undefined ||
    (get(cardtype) !== "pokemon" && get(cardtype) !== "energy"),
  required: get(cardtype) === "pokemon",
}));

Config.track.options(rarity, (get) => ({
  // Require rarity when cardtype is not energy
  required: get(cardtype) != "energy",
}));

Config.track.options(illustrator, (get) => ({
  // On energty cards, there are no illustrators
  required: get(cardtype) !== "energy",
}));

export const PokemonCard = Config.type("Card", {
  fields: {
    title: Field.text("Title", { width: 0.5, required: true }),
    path: Field.path("Path", { width: 0.5, required: true }),
    number: Field.text("Number", { width: 0.25, required: true }),
    edgeColor: Field.select("Edge color", {
      initialValue: "#97999b",
      options: edge,
      width: 0.25,
      required: true,
    }),
    rarity,
    cardtype,
    hp: Field.number("HP", { width: 0.2 }),
    subtype,
    pokemon,
    energy,
    stage,
    illustrator,
    card: Field.image("Card", { width: 1, required: true }),
    reverseCard: Field.image("Reverse Card", {
      width: 1,
      required: false,
      help: "The card with reverse logo/illustrator name. Is used for reverse holofoil cards.",
    }),
    variants: Field.list("Variants", {
      schema: {
        Variant,
      },
      initialValue: [
        {
          _type: "Variant",
          foil: null as unknown as EntryReference,
          mask: null as unknown as EntryReference,
          pattern: null,
          variant: "normal",
        },
      ],
      required: true,
    }),
    isEx: Field.check("Ex"),
    isTrainerGallery: Field.check("Trainer Gallery", {
      help: "Trainer & Pokémon together on one card",
    }),
    isFullArt: Field.check("Full art"),
  },
  insertOrder: "first",
  icon: IcOutlineCropPortrait,
});
