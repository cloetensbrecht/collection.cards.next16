import { Illustrator } from "@/alinea/schemas/Illustrator";
import { PokemonCard } from "@/alinea/schemas/PokemonCard";
import { cms } from "@/cms";
import Container from "@/components/container/Container";
import { blurDataURL } from "@/lib/blurDataURL";
import { Query } from "alinea";
import { Entry } from "alinea/core";
import Image from "next/image";
import Link from "next/link";

const fetchIllustrators = async () => {
  const illustrators = await cms.find({
    type: Illustrator,
    select: {
      ...Entry,
      ...Illustrator,
    },
    orderBy: { asc: Illustrator.title },
  });
  const illustratorsIds = illustrators.map(({ id }) => id);
  const cardsWithIllustrators = await cms.find({
    type: PokemonCard,
    select: {
      id: Query.id,
      card: PokemonCard.card,
      title: PokemonCard.title,
      illustrator: PokemonCard.illustrator,
    },
    filter: {
      illustrator: { has: { _entry: { in: illustratorsIds } } },
    },
    orderBy: { asc: Query.id },
  });

  return illustrators
    .map((illustrator) => {
      return {
        ...illustrator,
        cards: cardsWithIllustrators.filter(
          (card) => card.illustrator?._entry === illustrator.id
        ),
      };
    })
    .filter((illustrator) => illustrator.cards.length > 0);
};

export default async function Illustrators() {
  const illustrators = await fetchIllustrators();

  return (
    <Container>
      <div className="flex w-full flex-wrap justify-center gap-12 lg:gap-x-6 lg:gap-y-12">
        {illustrators.map((illustrator) => {
          return (
            <Link
              key={illustrator.id}
              href={`/illustrators/${illustrator.path}`}
              className="group flex flex-col items-center gap-4 text-center w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/7"
            >
              <div className="flex flex-col items-center gap-4">
                <span
                  data-slot="avatar"
                  className="relative flex size-8 shrink-0 overflow-hidden rounded-full h-16 w-16 border-1 transition-all"
                >
                  <Image
                    className="group-hover:scale-150 transition-transform duration-300 ease-in-out"
                    alt={illustrator.title}
                    src={`/media${illustrator.cards[0]?.card.src}`}
                    style={{
                      objectFit: "cover",
                      transform: "scale(2.5)",
                      transformOrigin: `${
                        illustrator.cards[0]?.card.focus.x * 100
                      }% ${illustrator.cards[0]?.card.focus.y * 100}%`,
                      objectPosition: `${
                        illustrator.cards[0]?.card.focus.x * 100
                      }% ${illustrator.cards[0]?.card.focus.y * 100}%`,
                    }}
                    fill={true}
                    sizes="256px"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={blurDataURL(
                      illustrator.cards[0]?.card.thumbHash
                    )}
                  />
                </span>
                <div className="flex flex-col">
                  <p className="text-foreground text-base font-semibold">
                    {illustrator.title}
                  </p>
                  <p className="text-muted-foreground text-sm">Pokémon</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
