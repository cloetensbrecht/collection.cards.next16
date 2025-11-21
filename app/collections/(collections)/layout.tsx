import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs'

export default async function CollectionsLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BreadCrumbs path={'/collections'} className="pt-6 pb-6 md:pb-12" />
      {children}
    </>
  )
}
