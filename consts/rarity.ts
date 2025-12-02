import AceSpecRare from '@/icons/pokemon/rarities/AceSpecRare'
import BlackWhiteRare from '@/icons/pokemon/rarities/BlackWhiteRare'
import Common from '@/icons/pokemon/rarities/Common'
import DoubleRare from '@/icons/pokemon/rarities/DoubleRare'
import HyperRare from '@/icons/pokemon/rarities/HyperRare'
import IllustrationRare from '@/icons/pokemon/rarities/IllustrationRare'
import Rare from '@/icons/pokemon/rarities/Rare'
import SpecialIllustrationRare from '@/icons/pokemon/rarities/SpecialIllustrationRare'
import UltraRare from '@/icons/pokemon/rarities/UltraRare'
import UnCommon from '@/icons/pokemon/rarities/UnCommon'

export type Rarity = keyof typeof rarity

export const rarity = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  'double-rare': 'Double Rare',
  'ace-spec-rare': 'Ace Spec Rare',
  'ultra-rare': 'Ultra Rare',
  'illustration-rare': 'Illustration Rare',
  'special-illustration-rare': 'Special Illustration Rare',
  'hyper-rare': 'Hyper Rare',
  'black-white-rare': 'Black White Rare'
}

export const getRarityIcon = (rarity: Rarity) => {
  switch (rarity) {
    case 'common':
      return Common
    case 'uncommon':
      return UnCommon
    case 'double-rare':
      return DoubleRare
    case 'rare':
      return Rare
    case 'illustration-rare':
      return IllustrationRare
    case 'ultra-rare':
      return UltraRare
    case 'special-illustration-rare':
      return SpecialIllustrationRare
    case 'black-white-rare':
      return BlackWhiteRare
    case 'ace-spec-rare':
      return AceSpecRare
    case 'hyper-rare':
      return HyperRare
  }
}
