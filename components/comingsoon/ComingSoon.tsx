import {PropsWithChildren} from 'react'
import Tooltip from '../tooltip/Tooltip'

const ComingSoon: React.FC<PropsWithChildren> = ({children}) => (
  <Tooltip text="Coming soon">{children}</Tooltip>
)

export default ComingSoon
