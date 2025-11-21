import {cn} from '@/lib/utils'
import {PropsWithChildren} from 'react'

type ContainerProps = {
  className?: string
}

const Container: React.FC<PropsWithChildren<ContainerProps>> = ({
  children,
  className
}) => {
  return (
    <div className={cn(`container mx-auto px-6`, className)}>{children}</div>
  )
}

export default Container
