import {cn} from '@/lib/utils'
import {ChevronRight} from 'lucide-react'
import {memo} from 'react'
import {Button} from '../ui/button'

type NextButtonProps = {
  className?: string
  disabled: boolean
  onClick: () => void
}

const NextButton: React.FC<NextButtonProps> = ({
  className,
  disabled,
  onClick
}) => (
  <Button
    variant={'ghost'}
    size={'icon'}
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "cursor-pointer rounded-full [&_svg:not([class*='size-'])]:size-7 size-10",
      className
    )}
  >
    <ChevronRight />
  </Button>
)

export default memo(NextButton)
