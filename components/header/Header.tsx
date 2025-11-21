import {Header as HeaderSchema} from '@/alinea/schemas/Header'
import {cms} from '@/cms'
import {Logo} from '@/icons/Logo'
import {cn} from '@/lib/utils'
import {LogInIcon} from 'lucide-react'
import Link from 'next/link'
import {Fragment} from 'react/jsx-runtime'
import ComingSoon from '../comingsoon/ComingSoon'
import ThemeToggle from '../toggles/ThemeToggle'
import {Button} from '../ui/button'

const fetchHeaderData = async () =>
  await cms.first({
    workspace: 'main',
    root: 'general',
    type: HeaderSchema
  })

const Header: React.FC = async () => {
  const headerData = await fetchHeaderData()

  return (
    <header>
      <nav className="border-border bg-background h-16 border-b shadow-sm lg:block">
        <div className="container mx-auto flex h-full items-center justify-between px-6">
          <div className="flex items-center gap-x-4">
            <Link href="/" title="collection.cards">
              <Logo width="32" />
            </Link>
          </div>
          <div className="flex items-center gap-x-4">
            <div className="flex items-center gap-x-1">
              {headerData?.links.map(link => {
                const Component = link.fields.asButton ? Button : Fragment
                return (
                  <Component
                    key={link._id}
                    {...(link.fields.asButton ? {asChild: true} : {})}
                  >
                    <Link
                      key={link._id}
                      className={cn(
                        'font-medium text-sm text-muted-foreground hover:bg-primary/5 hover:text-foreground px-2 py-1 md:px-3 md:py-2 rounded-md',
                        link.fields.hideOnMobile ? 'hidden md:inline' : ''
                      )}
                      href={link.href}
                    >
                      {link.fields.title || link.title}
                    </Link>
                  </Component>
                )
              })}
            </div>
          </div>
          <div className="flex items-center gap-x-2 md:gap-x-4">
            <ThemeToggle />
            <ComingSoon>
              <Button className="cursor-pointer" aria-labelledby="loginlabel">
                <LogInIcon />
                <span className="hidden md:inline" id="loginlabel">
                  Login
                </span>
              </Button>
            </ComingSoon>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
