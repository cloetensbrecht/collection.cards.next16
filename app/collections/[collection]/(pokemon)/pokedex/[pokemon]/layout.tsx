import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs'

export default async function CollectionLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{collection: string; pokemon: string}>
}) {
  const {collection, pokemon} = await params

  return (
    <>
      <BreadCrumbs
        path={`/collections/${collection}/pokedex/${pokemon}`}
        className="pt-6 pb-6 md:pb-12"
      />
      {children}
    </>
  )
}
