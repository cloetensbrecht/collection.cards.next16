import {cn} from '@/lib/utils'
import {ChevronLeft} from 'lucide-react'
import {memo} from 'react'
import {Button} from '../ui/button'

type PrevButtonProps = {
  className?: string
  disabled: boolean
  onClick: () => void
}

const PrevButton: React.FC<PrevButtonProps> = ({
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
    <ChevronLeft />
  </Button>
)

export default memo(PrevButton)
