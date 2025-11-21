import {thumbHashToDataURL} from 'thumbhash'

export const blurDataURL = (thumbHash: string) =>
  thumbHash
    ? thumbHashToDataURL(Uint8Array.from(atob(thumbHash), c => c.charCodeAt(0)))
    : undefined
