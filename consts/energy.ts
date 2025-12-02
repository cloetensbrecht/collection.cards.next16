import Colorless from '@/icons/pokemon/energies/Colorless'
import Darkness from '@/icons/pokemon/energies/Darkness'
import Dragon from '@/icons/pokemon/energies/Dragon'
import Fairy from '@/icons/pokemon/energies/Fairy'
import Fighting from '@/icons/pokemon/energies/Fighting'
import Fire from '@/icons/pokemon/energies/Fire'
import Grass from '@/icons/pokemon/energies/Grass'
import Lightning from '@/icons/pokemon/energies/Lightning'
import Metal from '@/icons/pokemon/energies/Metal'
import Psychic from '@/icons/pokemon/energies/Psychic'
import Water from '@/icons/pokemon/energies/Water'

export type Energy = keyof typeof energy

export const energy = {
  colorless: 'Colorless',
  darkness: 'Darkness',
  dragon: 'Dragon',
  fairy: 'Fairy',
  fighting: 'Fighting',
  fire: 'Fire',
  grass: 'Grass',
  lightning: 'Lightning',
  metal: 'Metal',
  psychic: 'Psychic',
  water: 'Water'
}

export const getEnergyIcon = (energy: Energy) => {
  switch (energy) {
    case 'colorless':
      return Colorless
    case 'darkness':
      return Darkness
    case 'dragon':
      return Dragon
    case 'fairy':
      return Fairy
    case 'fighting':
      return Fighting
    case 'fire':
      return Fire
    case 'grass':
      return Grass
    case 'lightning':
      return Lightning
    case 'metal':
      return Metal
    case 'psychic':
      return Psychic
    case 'water':
      return Water
  }
}
