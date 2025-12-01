import {PropsWithChildren} from 'react'
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip as UiTooltip
} from '../ui/tooltip'

type TooltipProps = {
  text: string
}

const Tooltip: React.FC<PropsWithChildren<TooltipProps>> = ({
  children,
  text
}) => (
  <TooltipProvider>
    <UiTooltip delayDuration={0}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{text}</p>
      </TooltipContent>
    </UiTooltip>
  </TooltipProvider>
)

export default Tooltip
