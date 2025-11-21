import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs'

export default async function SlugLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{slug: string[]}>
}) {
  const {slug} = await params

  return (
    <>
      <BreadCrumbs path={`/${slug.join('/')}`} className="pt-6 pb-6 md:pb-12" />
      {children}
    </>
  )
}
