'use client'

import {PokemonCard} from '@/alinea/schemas/PokemonCard'
import {Energy, energy as energyList, getEnergyIcon} from '@/consts/energy'
import {holofoilPatterns, reverseHolofoilPatterns} from '@/consts/pattern'
import {variant, variantPattern} from '@/consts/variant'
import {AnimatePresence, motion} from 'framer-motion'
import {CatIcon, Sparkles} from 'lucide-react'
import Link from 'next/link'
import {createElement, useState} from 'react'
import {Title} from '../title/Title'
import {Button} from '../ui/button'
import {Label} from '../ui/label'

export type PokemonCardDetailsProps = {
  energy: Energy | null
  id: string
  number: string
  pattern?: keyof typeof reverseHolofoilPatterns | keyof typeof holofoilPatterns
  pokemon: PokemonCard['pokemon']
  variant: keyof typeof variant
  title: string
}

export default function PokemonCardDetails({
  nextHandler,
  prevHandler,
  energy,
  id,
  number,
  pattern,
  pokemon,
  title,
  variant
}: PokemonCardDetailsProps & {
  nextHandler?: () => void
  prevHandler?: () => void
}) {
  const [direction, setDirection] = useState<number>(0)

  const handleNext = () => {
    setDirection(1)
    nextHandler?.()
  }

  const handlePrev = () => {
    setDirection(-1)
    prevHandler?.()
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0
    })
  }

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: {type: 'spring', stiffness: 800, damping: 60},
            opacity: {duration: 0.15},
            duration: 0.15,
            ease: 'easeOut'
          }}
        >
          <Title.H2>
            {title}{' '}
            <span className="ml-2 text-gray-400 dark:text-gray-300/75 font-normal text-sm">
              # {number}
            </span>
          </Title.H2>
          <p>
            <Label>
              <Sparkles className="inline-block mr-2 mb-1" size={16} />
              {variantPattern[variant]}
              {pattern && (
                <span className="ml-1.5 text-gray-400 dark:text-gray-300/75 font-normal text-sm italic">
                  {variantPattern[pattern]}
                </span>
              )}
            </Label>
          </p>
          {energy && (
            <p>
              <Label>
                <EnergyIcon energy={energy} />
                {energyList[energy]}
              </Label>
            </p>
          )}
          {pokemon && (
            <p>
              <Label>
                <CatIcon className="inline-block mr-2 mb-1" size={16} />
                <Link href={pokemon.href}>{pokemon.title}</Link>
              </Label>
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-2 mt-4">
        {prevHandler && (
          <Button className="m-0 cursor-pointer" onClick={handlePrev}>
            Previous
          </Button>
        )}
        {nextHandler && (
          <Button className="m-0 cursor-pointer" onClick={handleNext}>
            Next
          </Button>
        )}
      </div>
    </div>
  )
}

const EnergyIcon = ({energy}: {energy: Energy}) => {
  const Icon = getEnergyIcon(energy)
  return createElement(Icon, {
    className: 'inline-block mr-2 mb-1 w-[16px] h-[16px]'
  })
}
