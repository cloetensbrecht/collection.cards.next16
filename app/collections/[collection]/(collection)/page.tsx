import { PokemonCollection } from "@/alinea/schemas/PokemonCollection";
import { PokemonSet } from "@/alinea/schemas/PokemonSet";
import { cms } from "@/cms";
import Container from "@/components/container/Container";
import { Title } from "@/components/title/Title";
import { serie } from "@/consts/serie";
import { blurDataURL } from "@/lib/blurDataURL";
import { ImageLink, Query, TextDoc } from "alinea";
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
        filter: {
          _status: "published",
        },
        orderBy: { desc: PokemonSet.releaseDate },
      }),
    },
  });

const SetCard: React.FC<{
  href: string;
  image: ImageLink<undefined>;
  subTitle: string;
  symbol?: ImageLink<undefined>;
  text: TextDoc;
  title: string;
}> = ({ href, image, subTitle, symbol, text, title }) => {
  return (
    <Link href={href} className="group">
      <div
        data-slot="card"
        className="text-card-foreground flex flex-col rounded-xl border h-full gap-0 overflow-hidden py-0 shadow-none transition-shadow duration-300 hover:shadow-md xl:flex-row"
      >
        <div
          data-slot="card-content"
          className="relative min-h-55 px-0 max-xl:max-h-55 xl:w-66 overflow-hidden"
        >
          <Image
            className="group-hover:scale-120 transition-transform duration-300 ease-in-out"
            alt={title}
            blurDataURL={blurDataURL(image?.thumbHash)}
            src={`/media${image?.src}`}
            fill={true}
            objectFit="cover"
            placeholder="blur"
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
        </div>
        <div className="flex grow-1 flex-col justify-between">
          <div
            data-slot="card-header"
            className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 gap-5 pt-6 pb-5"
          >
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
            <div
              data-slot="card-description"
              className="text-muted-foreground text-base"
            >
              <RichText doc={text} />
            </div>
          </div>
          <div
            data-slot="card-footer"
            className="flex items-center [.border-t]:pt-6 mx-6 gap-3 border-t border-dashed px-0 !pt-5 pb-6"
          >
            <span className="focus-visible:border-ring aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4 shadow-xs size-7 bg-sky-600/10 text-sky-600 hover:bg-sky-600/20 focus-visible:ring-sky-600/20 dark:bg-sky-400/10 dark:text-sky-400 dark:hover:bg-sky-400/20 dark:focus-visible:ring-sky-400/40">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-facebook size-4.5"
                aria-hidden="true"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
              <span className="sr-only">Check</span>
            </span>
            <span className="focus-visible:border-ring aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4 shadow-xs size-7 bg-amber-600/10 text-amber-600 hover:bg-amber-600/20 focus-visible:ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-400 dark:hover:bg-amber-400/20 dark:focus-visible:ring-amber-400/40">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-twitter size-4.5"
                aria-hidden="true"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
              <span className="sr-only">Check</span>
            </span>
            <span className="focus-visible:border-ring aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4 shadow-xs bg-primary/10 text-primary hover:bg-primary/20 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40 size-7">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-github size-4.5"
                aria-hidden="true"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
              <span className="sr-only">Check</span>
            </span>
            <span className="focus-visible:border-ring aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4 shadow-xs bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 size-7">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-instagram size-4.5"
                aria-hidden="true"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
              <span className="sr-only">Check</span>
            </span>
          </div>
        </div>
      </div>
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
        {(collectionData.sets as (PokemonSet & { _url: string })[]).map(
          (set) => (
            <SetCard
              key={set.path}
              href={set._url}
              image={set.heroImage}
              subTitle={set.serie ? serie[set.serie] : ""}
              symbol={set.symbol?.[0] || undefined}
              text={set.cta_description}
              title={set.title}
            />
          )
        )}
      </div>
    </Container>
  );
}
