import {PokedexIcons} from '@/icons/pokemon/pokedex'
import type {SVGProps} from 'react'

type PokedexIconProps = {
  number: number
} & SVGProps<SVGSVGElement>

const PokedexIcon: React.FC<PokedexIconProps> = ({number, ...props}) => {
  const Comp = PokedexIcons[number as keyof typeof PokedexIcons]
  return Comp ? <Comp {...props} /> : null
}

export default PokedexIcon
