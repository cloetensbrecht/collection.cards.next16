import {holofoilPatterns, reverseHolofoilPatterns} from './pattern'

export type Variant = keyof typeof variant

export const variant = {
  normal: 'Normal',
  holofoil: 'Holofoil',
  reverse_holofoil: 'Reverse Holofoil'
}

export const variantPattern = {
  normal: 'Normal',
  holofoil: 'Holofoil',
  ...holofoilPatterns,
  reverse_holofoil: 'Reverse Holofoil',
  ...reverseHolofoilPatterns
}
