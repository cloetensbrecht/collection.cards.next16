import BreadCrumbs from "@/components/breadcrumbs/BreadCrumbs";

export default async function IllustratorLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ illustrator: string }>;
}) {
  const { illustrator } = await params;

  return (
    <>
      <BreadCrumbs
        path={`/illustrators/${illustrator}`}
        className="pt-6 pb-6 md:pb-12"
      />
      {children}
    </>
  );
}
