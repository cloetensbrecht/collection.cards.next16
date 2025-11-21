import {HomeIcon} from 'lucide-react'

import {cms} from '@/cms'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import {Query} from 'alinea'
import Link from 'next/link'
import {Fragment} from 'react/jsx-runtime'
import Container from '../container/Container'

type breadcrumbsProps = {className?: string; path: string}

const fetchBreadCrumbsData = async (url: string) =>
  await cms.first({
    select: {
      title: Query.title,
      breadcrumbs: Query.parents({
        select: {
          url: Query.url,
          title: Query.title
        }
      })
    },
    filter: {
      _url: url
    }
  })

const BreadCrumbs: React.FC<breadcrumbsProps> = async ({className, path}) => {
  const data = await fetchBreadCrumbsData(path)
  if (!data || !data.breadcrumbs) return null

  return (
    <Container className={className}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild={true}>
              <Link href="/">
                <HomeIcon size={16} aria-hidden="true" />
                <span className="sr-only">Home</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {data.breadcrumbs.map(crumb => (
            <Fragment key={crumb.url}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild={true}>
                  <Link href={crumb.url}>{crumb.title}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
          ))}
          <BreadcrumbItem>
            <BreadcrumbPage>{data.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </Container>
  )
}

export default BreadCrumbs
