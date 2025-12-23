import {cn} from '@/lib/utils'
import {PropsWithChildren} from 'react'

type PageProps = {
  className?: string
  side: 'left' | 'right'
  style?: React.CSSProperties
}

const Page: React.FC<PropsWithChildren<PageProps>> = ({
  children,
  className,
  side,
  style
}) => {
  return (
    <div
      className={cn(
        `group/page is-${side}`,
        'min-h-fit w-full h-full z-0 overflow-hidden bg-white dark:bg-background',
        side === 'right' ? 'rounded-r-lg' : 'rounded-l-lg',
        className
      )}
      style={style}
    >
      {children}
      <div
        className={cn(
          'absolute inset-0 w-full h-full pointer-events-none',
          'from-95% from-foreground/0 dark:from-background/0 to-foreground/10 dark:to-background/50 to-100%',
          side === 'left' ? 'bg-gradient-to-r' : 'bg-gradient-to-l'
        )}
      ></div>
    </div>
  )
}

export default Page
