import Glare from '@/components/glare/Glare'
import {cn} from '@/lib/utils'

const ReverseHolofoilPokeBall: React.FC = () => {
  return (
    <>
      <div
        style={
          {
            '--seedx': 0.8896912913884358,
            '--seedy': 0.5311618334967552
          } as React.CSSProperties
        }
        className={cn(
          'reverse-holofoil-poke-ball absolute w-full h-full z-1',
          'mix-blend-color-dodge',
          '[background-image:linear-gradient(45deg,hsla(0,0%,calc(0.8*50%))_15%,hsla(0,0%,calc(0.8*25%))_45%,hsla(0,0%,calc(0.8*25%))_55%,hsla(0,0%,calc(0.8*50%))_85%)] [background-position:var(--pointer-x)_var(--pointer-y)]',
          '[filter:brightness(.75)_contrast(1)_saturate(1)]',
          'bg-size-[200%] backface-hidden',
          '[contain:paint]',
          'will-change-[background-position-x,background-position-y]',
          'before:absolute before:inset-0 before:opacity-60 group-hover/card:before:opacity-100',
          'before:mask-[url(/_next/image?url=%2Fpatterns%2Fpokeball-inner.webp&w=750&q=75)] before:mask-subtract before:mask-alpha before:[mask-position:calc(var(--seedx)*500px)_calc(var(--seedy)*500px),center_center] before:mix-blend-lighten before:[mask-size:40%_auto,cover] before:[filter:brightness(.75)_contrast(2)_saturate(calc(var(--pointer-from-center)))] before:bg-size[170%_170%,300px_300px,300px_300px]',
          'before:[background-blend-mode:darken,color-burn]',
          'before:[background-image:linear-gradient(225deg,var(--sunpillar-4),var(--sunpillar-5),var(--sunpillar-6),var(--sunpillar-1),var(--sunpillar-2),var(--sunpillar-3),var(--sunpillar-4),var(--sunpillar-5),var(--sunpillar-6),var(--sunpillar-1),var(--sunpillar-2),var(--sunpillar-3),var(--sunpillar-4)),url(/_next/image?url=%2Fpatterns%2Fnoise-base.webp&w=750&q=75),url(/_next/image?url=%2Fpatterns%2Firi-1.webp&w=750&q=75)] before:[background-position:var(--pointer-y)_var(--pointer-x),calc(var(--seedx)*500px)_calc(var(--seedy)*500px),calc(var(--seedx)*500px)_calc(var(--seedy)*500px)]',
          'before:will-change-[opacity]',
          'after:mask-[url(/_next/image?url=%2Fpatterns%2Fpokeball-outer.webp&w=750&q=75),radial-gradient(farthest-corner_at_var(--pointer-x)_var(--pointer-y),#fff_20%,transparent_80%)] after:absolute after:inset-0 after:[mask-size:40%_auto,cover] after:[mask-position:calc(var(--seedx)*500px)_calc(var(--seedy)*500px),center_center] after:mask-subtract after:mask-alpha after:opacity-60 group-hover/card:after:opacity-100 after:[background-image:linear-gradient(45deg,var(--sunpillar-4),var(--sunpillar-5),var(--sunpillar-6),var(--sunpillar-1),var(--sunpillar-2),var(--sunpillar-3),var(--sunpillar-4),var(--sunpillar-5),var(--sunpillar-6),var(--sunpillar-1),var(--sunpillar-2),var(--sunpillar-3),var(--sunpillar-4))] after:mix-blend-screen after:[filter:brightness(0.55)_contrast(1.8)_saturate(calc(var(--pointer-from-center)*1.1))] after:bg-size-[200%_200%] after:[background-position:var(--pointer-x)_var(--pointer-y)]',
          'after:will-change-[opacity]'
        )}
      />
      <Glare />
      <div
        className={cn(
          'absolute inset-0 backface-hidden [background-image:radial-gradient(farthest-corner_circle_at_var(--pointer-x)_var(--pointer-y),hsla(0,0%,80%,.8)_10%,hsla(0,0%,80%,.65)_20%,hsla(0,0%,60%,.5)_90%)]',
          '[contain:paint]',
          'mix-blend-multiply opacity-95 group-hover/card:opacity-100 outline-[1px] outline-transparent will-change-[background-image,opacity,transform]'
        )}
      />
    </>
  )
}

export default ReverseHolofoilPokeBall
