import {ChevronRight} from 'lucide-react'
import {Button} from '../ui/button'

type NextButtonProps = {onClick?: () => void; disabled?: boolean}

const NextButton: React.FC<NextButtonProps> = ({onClick, disabled}) => (
  <Button
    variant="outline"
    size="icon"
    onClick={onClick}
    disabled={disabled}
    className="cursor-pointer"
  >
    <ChevronRight className="h-4 w-4" />
  </Button>
)

export default NextButton
