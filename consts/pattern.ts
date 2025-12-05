export type HolofoilPattern = keyof typeof holofoilPatterns
export type ReverseHolofoilPattern = keyof typeof reverseHolofoilPatterns
export type Pattern = HolofoilPattern | ReverseHolofoilPattern

export const holofoilPatterns = {
  tinsel: 'Tinsel Holofoil'
}

export const reverseHolofoilPatterns = {
  pokeBall: 'Poké Ball Pattern',
  masterBall: 'Master Ball Pattern'
}
