import type { SlideProps } from '@zag-js/carousel'
import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import type { Assign } from '../types'
import { useCarouselContext } from './carousel-context'

export type CarouselSlideProps = Assign<ComponentPropsWithoutRef<typeof ark.div>, SlideProps>

export const CarouselSlide = forwardRef<HTMLDivElement, CarouselSlideProps>((props, ref) => {
  const { index, ...divProps } = props
  const { getSlideProps } = useCarouselContext()
  const mergedProps = mergeProps(getSlideProps({ index }), divProps)

  return <ark.div {...mergedProps} ref={ref} />
})

CarouselSlide.displayName = 'CarouselSlide'
