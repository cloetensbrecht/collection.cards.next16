import {ChevronLeft} from 'lucide-react'
import {Button} from '../ui/button'

type PrevButtonProps = {onClick?: () => void; disabled?: boolean}

const PrevButton: React.FC<PrevButtonProps> = ({onClick, disabled}) => (
  <Button
    variant="outline"
    size="icon"
    onClick={onClick}
    disabled={disabled}
    className="cursor-pointer"
  >
    <ChevronLeft className="h-4 w-4" />
  </Button>
)

export default PrevButton
