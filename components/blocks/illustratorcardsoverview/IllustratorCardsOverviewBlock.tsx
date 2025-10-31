"use client";

import { IllustratorCardsOverviewBlock as IllustratorCardsOverviewBlockSchema } from "@/alinea/blocks/illustratorcardsoverview/IllustratorCardsOverviewBlock.schema";
import CardGrid from "@/components/cardgrid/CardGrid";

type ImageItem = {
  id: number;
  src: string;
  alt: string;
};

const data: ImageItem[] = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  src: `https://picsum.photos/id/${i % 200}/408/555`,
  alt: `Card ${i + 1}`,
}));

const Card: React.FC<ImageItem> = ({ id, src, alt }) => (
  <div key={id}>
    <div className="relative w-full overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center aspect-[408/555]">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-contain rounded-lg"
      />
    </div>
  </div>
);

const IllustratorCardsOverviewBlock: React.FC<
  IllustratorCardsOverviewBlockSchema
> = () => {
  return (
    <div>
      <CardGrid data={data} CellComponent={Card} />
    </div>
  );
};

export default IllustratorCardsOverviewBlock;
