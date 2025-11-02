import BreadCrumbs from "@/components/breadcrumbs/BreadCrumbs";

export default async function CollectionLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ collection: string; set: string }>;
}) {
  const { collection, set } = await params;

  return (
    <>
      <BreadCrumbs
        path={`/collections/${collection}/${set}`}
        className="pt-6 pb-6 md:pb-12"
      />
      {children}
    </>
  );
}
