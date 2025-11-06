import BreadCrumbs from "@/components/breadcrumbs/BreadCrumbs";

export default async function CollectionLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ collection: string; series: string; serie: string }>;
}) {
  const { collection, series, serie } = await params;

  return (
    <>
      <BreadCrumbs
        path={`/collections/${collection}/${series}/${serie}`}
        className="pt-6 pb-6 md:pb-12"
      />
      {children}
    </>
  );
}
