import { PokemonCard } from "@/alinea/schemas/PokemonCard";
import { PokemonCollection } from "@/alinea/schemas/PokemonCollection";
import { PokemonSet } from "@/alinea/schemas/PokemonSet";
import { cms } from "@/cms";
import Container from "@/components/container/Container";
import { Title } from "@/components/title/Title";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { serie } from "@/consts/serie";
import IcOutlineCalendarMonth from "@/icons/IcOutlineCalendarMonth";
import IcOutlineNumbers from "@/icons/IcOutlineNumbers";
import { blurDataURL } from "@/lib/blurDataURL";
import { formatDate } from "@/lib/formatDate";
import { ImageLink, Query, TextDoc } from "alinea";
import { Entry } from "alinea/core";
import { RichText } from "alinea/ui";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const fetchCollectionData = async (collection: string) =>
  await cms.first({
    type: PokemonCollection,
    filter: {
      _status: "published",
      path: collection,
    },
    select: {
      title: Query.title,
      sets: Query.children({
        type: PokemonSet,
        select: {
          ...PokemonSet,
          url: Entry.url,
          cards: Query.children({
            type: PokemonCard,
            select: {
              variants: PokemonCard.variants,
            },
          }),
        },
        filter: {
          _status: "published",
        },
        orderBy: { desc: PokemonSet.releaseDate },
      }),
    },
  });

const SetCard: React.FC<{
  date: string;
  href: string;
  image: ImageLink<undefined>;
  numberOfTotalCards: number;
  priority: boolean;
  subTitle: string;
  symbol?: ImageLink<undefined>;
  text: TextDoc;
  title: string;
}> = ({
  date,
  href,
  image,
  numberOfTotalCards,
  priority,
  subTitle,
  symbol,
  text,
  title,
}) => {
  return (
    <Link href={href} className="group">
      <Card className="py-0 gap-0 overflow-hidden xl:flex-row shadow-none transition-shadow duration-300 group-hover:shadow-md">
        <CardContent className="relative min-h-55 max-xl:max-h-55 xl:w-66 overflow-hidden">
          <Image
            className="group-hover:scale-120 transition-transform duration-300 ease-in-out"
            alt={title}
            blurDataURL={blurDataURL(image?.thumbHash)}
            src={`/media${image?.src}`}
            fill={true}
            objectFit="cover"
            placeholder="blur"
            fetchPriority={priority ? "high" : "auto"}
            preload={priority}
            style={{
              backgroundColor: image?.averageColor,
              objectFit: "cover",
              transform: "scale(1.2)",
              transformOrigin: `${image.focus.x * 100}% ${
                image.focus.y * 100
              }%`,
              objectPosition: image?.focus
                ? `${image.focus.x * 100}% ${image.focus.y * 100}%`
                : undefined,
            }}
          />
        </CardContent>
        <div className="flex grow-1 flex-col justify-between">
          <CardHeader className="gap-5 pt-6 pb-5">
            <div>
              <div className="flex items-center justify-between gap-2">
                <Title.H2 className="pb-0" data-slot="card-title">
                  {title}
                </Title.H2>
                {symbol && (
                  <div className="relative w-8 h-8">
                    <Image
                      alt={title}
                      src={`/media${symbol?.src}`}
                      fill={true}
                      objectFit="contain"
                      sizes="32px"
                      style={{
                        objectFit: "contain",
                        objectPosition: symbol?.focus
                          ? `${symbol.focus.x * 100}% ${symbol.focus.y * 100}%`
                          : undefined,
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="text-muted-foreground">{subTitle}</div>
            </div>
            <CardDescription className="text-base">
              <RichText doc={text} />
            </CardDescription>
          </CardHeader>
          <CardFooter className="mx-6 gap-3 border-t border-dashed px-0 !pt-5 pb-6">
            <Badge
              variant="outline"
              className="rounded-full p-1 pr-2 text-muted-foreground"
            >
              <div className="size-6 rounded-full flex items-center justify-center text-muted-foreground bg-primary/10 mr-1">
                <IcOutlineCalendarMonth />
              </div>
              {date}
            </Badge>
            <Badge
              variant="outline"
              className="rounded-full p-1 pr-2 text-muted-foreground"
            >
              <div className="size-6 rounded-full flex items-center justify-center text-muted-foreground bg-primary/10 mr-1">
                <IcOutlineNumbers />
              </div>
              {`${numberOfTotalCards} card${
                numberOfTotalCards !== 1 ? "s" : ""
              }`}
            </Badge>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
};

export default async function Collection({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  const collectionData = await fetchCollectionData(collection);
  if (!collectionData) notFound();

  return (
    <Container>
      <Title.H1>{collectionData.title}</Title.H1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {collectionData.sets.map((set, index) => {
          const numberOfTotalCards = set.cards.reduce(
            (total, card) => total + (card.variants?.length || 1),
            0
          );
          return (
            <SetCard
              date={formatDate(set.releaseDate)}
              key={set.path}
              href={set.url}
              image={set.heroImage}
              numberOfTotalCards={numberOfTotalCards}
              priority={index < 5}
              subTitle={set.serie ? serie[set.serie] : ""}
              symbol={set.symbol?.[0] || undefined}
              text={set.cta_description}
              title={set.title}
            />
          );
        })}
      </div>
    </Container>
  );
}
