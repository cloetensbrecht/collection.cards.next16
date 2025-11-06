import BreadCrumbs from "@/components/breadcrumbs/BreadCrumbs";

export default async function CollectionLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{
    collection: string;
    series: string;
    serie: string;
    set: string;
    card: string;
  }>;
}) {
  const { collection, series, serie, set, card } = await params;

  return (
    <>
      <BreadCrumbs
        path={`/collections/${collection}/${series}/${serie}/${set}/${card}`}
        className="pt-6 pb-6 md:pb-12"
      />
      {children}
    </>
  );
}
