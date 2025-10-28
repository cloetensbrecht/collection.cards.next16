import { thumbHashToDataURL } from "thumbhash";

export const blurDataURL = (thumbHash: string) =>
  thumbHashToDataURL(Uint8Array.from(atob(thumbHash), (c) => c.charCodeAt(0)));
