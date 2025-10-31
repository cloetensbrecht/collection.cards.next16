"use client";

import { useWindowVirtualizer } from "@tanstack/react-virtual";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

const gapSize = 16;
const containerPadding = 48;

function getColumnCount(width: number): number {
  if (width < 640) return 2; // mobile
  if (width < 1024) return 3; // tablet
  return 4; // desktop
}

function getColumnWidth(width: number, columnCount: number): number {
  const gapWidth = gapSize * (columnCount - 1);
  if (width < 640) return (width - containerPadding - gapWidth) / columnCount; // mobile
  if (width < 768) return (640 - containerPadding - gapWidth) / columnCount; // tablet
  if (width < 1024) return (768 - containerPadding - gapWidth) / columnCount; // tablet
  if (width < 1280) return (1024 - containerPadding - gapWidth) / columnCount; // tablet
  if (width < 1536) return (1280 - containerPadding - gapWidth) / columnCount; // tablet
  return (1488 - gapWidth) / columnCount; // desktop
}

type CardGridProps<T> = {
  data: T[];
};

type ImageItem = {
  averageColor?: string;
  blurDataURL?: string;
  focus?: { x: number; y: number };
  id: string;
  src: string;
  title: string;
};

const Card: React.FC<ImageItem> = ({ blurDataURL, focus, id, src, title }) => (
  <div key={id}>
    <div className="relative w-full overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center aspect-[733/1024]">
      <Image
        alt={title}
        blurDataURL={blurDataURL}
        fetchPriority="high"
        layout="fill"
        objectFit="contain"
        placeholder="blur"
        preload={true}
        src={src}
        style={{
          objectFit: "contain",
          objectPosition: focus
            ? `${focus.x * 100}% ${focus.y * 100}%`
            : undefined,
        }}
        sizes={`(max-width: 639px) calc(50vw - ${containerPadding}px - ${gapSize}px), (max-width: 676px) 187px, (max-width: 1023px) 230px, (max-width: 1279px) 232px,  (max-width: 1535px) 296px, 360px`}
      />
    </div>
  </div>
);

export default function CardGrid<T>({ data }: CardGridProps<T>) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(0);

  // Track screen width for responsiveness
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const columnCount = useMemo(() => getColumnCount(windowWidth), [windowWidth]);
  const columnWidth = getColumnWidth(windowWidth, columnCount);
  const rowHeight = Math.floor(columnWidth * (1024 / 733) + gapSize); // maintain 408:555 ratio
  const rowCount = Math.ceil(data.length / columnCount);

  const virtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => rowHeight,
    overscan: 3,
  });

  useEffect(() => {
    virtualizer.measure();
  }, [rowHeight, columnCount, virtualizer]);

  if (data.length === 0) return null;
  if (windowWidth === 0) return <div className="h-screen" />;

  return (
    <div
      ref={gridRef}
      className="relative"
      style={{ height: virtualizer.getTotalSize() - gapSize }}
    >
      {virtualizer.getVirtualItems().map((virtualRow) => {
        const rowIndex = virtualRow.index;
        const start = rowIndex * columnCount;
        const end = start + columnCount;
        const rowItems = data.slice(start, end);

        return (
          <div
            key={virtualRow.key}
            className="absolute top-0 left-0 grid w-full gap-4"
            style={{
              transform: `translateY(${virtualRow.start}px)`,
              gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
              height: `${rowHeight - gapSize}px`,
            }}
          >
            {rowItems.map((item, index) => (
              <Card
                key={(item as ImageItem).id || index}
                {...(item as ImageItem)}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
