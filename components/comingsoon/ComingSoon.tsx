import {PropsWithChildren} from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../ui/tooltip'

const ComingSoon: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>Coming soon</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
export default ComingSoon
