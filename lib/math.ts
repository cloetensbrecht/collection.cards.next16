export const round = (value: number, precision: number = 3) =>
  parseFloat(value.toFixed(precision))

export const clamp = (value: number, min: number = 0, max: number = 100) =>
  Math.min(Math.max(value, min), max)

export const adjust = (
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number
) => round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin))
