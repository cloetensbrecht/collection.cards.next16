'use client'

import {cn} from '@/lib/utils'
import {motion} from 'framer-motion'
import {useEffect, useState} from 'react'
import NextButton from './NextButton'
import Page from './Page'
import PrevButton from './PrevButton'

type BookProps = {
  currentPage?: number
  className?: string
  onPageChange?: (newPage: number) => void
  pages: React.ReactNode[]
}

const Book: React.FC<React.PropsWithChildren<BookProps>> = ({
  children,
  className,
  currentPage: initialPage = 0,
  onPageChange,
  pages
}) => {
  const totalPages = pages.length
  const [currentPage, setCurrentPage] = useState<number>(initialPage)
  const [flipPages, setFlipPages] = useState<{
    front: React.ReactNode
    back: React.ReactNode
    side: 'left' | 'right'
  } | null>(null)

  const PrevLeftPage =
    currentPage - 2 >= 0 ? (
      <Page className="absolute inset-0 z-0" side="left">
        {pages[currentPage - 2]}
      </Page>
    ) : null

  const PrevRightPage =
    currentPage - 1 >= 0 ? (
      <Page
        className="absolute inset-0 backface-hidden rotate-y-180 z-10"
        side="right"
      >
        {pages[currentPage - 1]}
      </Page>
    ) : null

  const CurrentLeftPage =
    currentPage <= totalPages - 1 ? (
      <Page className="z-20" side="left">
        {pages[currentPage]}
      </Page>
    ) : null

  const CurrentRightPage =
    currentPage + 1 < totalPages ? (
      <Page className="z-20" side="right">
        {pages[currentPage + 1]}
      </Page>
    ) : null

  const NextLeftPage =
    currentPage + 2 <= totalPages - 1 ? (
      <Page
        className="absolute inset-0 backface-hidden rotate-y-180 z-10"
        side="left"
      >
        {pages[currentPage + 2]}
      </Page>
    ) : null

  const NextRightPage =
    currentPage + 3 < totalPages ? (
      <Page className="absolute inset-0 z-0" side="right">
        {pages[currentPage + 3]}
      </Page>
    ) : null

  const isPrevButtonDisabled = flipPages !== null || currentPage <= 0
  const isNextButtonDisabled =
    flipPages !== null || currentPage >= totalPages - 2

  const goToNextPage = () => {
    if (flipPages || (!CurrentRightPage && !NextLeftPage)) return
    setFlipPages({
      front: CurrentRightPage,
      back: NextLeftPage,
      side: 'right'
    })
  }

  const goToPrevPage = () => {
    if (flipPages || (!PrevLeftPage && !PrevRightPage)) return
    setFlipPages({
      front: CurrentLeftPage,
      back: PrevRightPage,
      side: 'left'
    })
  }

  useEffect(() => {
    setCurrentPage(initialPage)
  }, [initialPage])

  useEffect(() => {
    if (!flipPages) return
    setFlipPages(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  return (
    <>
      <div className={cn('flex flex-col items-center gap-8 w-full', className)}>
        <div className="relative flex items-center justify-center gap-8 w-full">
          <PrevButton onClick={goToPrevPage} disabled={isPrevButtonDisabled} />
          <div
            className="relative w-full shadow-2xl rounded-lg flex items-stretch [container-type:inline-size] "
            style={{perspective: '2000px'}}
          >
            {/* Left side */}
            <div
              className={cn(
                'w-1/2 relative',
                flipPages && flipPages.side === 'left' ? 'z-10' : 'z-0'
              )}
              style={{transformStyle: 'preserve-3d'}}
            >
              {(!flipPages || flipPages.side === 'right') && CurrentLeftPage}
              {flipPages && flipPages.side === 'left' && (
                <>
                  {PrevLeftPage}
                  <motion.div
                    className="h-full"
                    style={{
                      transformStyle: 'preserve-3d',
                      transformOrigin: 'right center'
                    }}
                    animate={{
                      rotateY: 180
                    }}
                    transition={{
                      duration: 0.8,
                      ease: [0.43, 0.13, 0.23, 0.96]
                    }}
                    onAnimationComplete={() => {
                      if (onPageChange) {
                        onPageChange(Math.max(currentPage - 2, 0))
                      } else {
                        setCurrentPage(cp => Math.max(cp - 2, 0))
                      }
                    }}
                  >
                    {flipPages.front}
                    {flipPages.back}
                  </motion.div>
                </>
              )}
            </div>

            {/* Right side */}
            <div
              className="w-1/2 relative z-0"
              style={{transformStyle: 'preserve-3d'}}
            >
              {(!flipPages || flipPages.side === 'left') && CurrentRightPage}
              {flipPages && flipPages.side === 'right' && (
                <>
                  {NextRightPage}
                  <motion.div
                    className="h-full"
                    style={{
                      transformStyle: 'preserve-3d',
                      transformOrigin: 'left center'
                    }}
                    animate={{
                      rotateY: -180
                    }}
                    transition={{
                      duration: 0.8,
                      ease: [0.43, 0.13, 0.23, 0.96]
                    }}
                    onAnimationComplete={() => {
                      if (onPageChange) {
                        onPageChange(Math.min(currentPage + 2, totalPages - 1))
                      } else {
                        setCurrentPage(cp => Math.min(cp + 2, totalPages - 1))
                      }
                    }}
                  >
                    {flipPages.front}
                    {flipPages.back}
                  </motion.div>
                </>
              )}
            </div>
            {children}
          </div>
          <NextButton onClick={goToNextPage} disabled={isNextButtonDisabled} />
        </div>
      </div>
      {/* <div className="flex gap-8 justify-between w-full h-[200px]">
        <div className="relative w-full h-full">{PrevLeftPage}</div>
        <div className="relative w-full h-full">{PrevRightPage}</div>
        <div className="relative w-full h-full">{CurrentLeftPage}</div>
        <div className="relative w-full h-full">{CurrentRightPage}</div>
        <div className="relative w-full h-full">{NextLeftPage}</div>
        <div className="relative w-full h-full">{NextRightPage}</div>
      </div> */}
    </>
  )
}

export default Book
