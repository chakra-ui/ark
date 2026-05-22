'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselPrevTriggerBaseProps extends PolymorphicProps {}
export interface CarouselPrevTriggerProps extends HTMLProps<'button'>, CarouselPrevTriggerBaseProps {}

export const CarouselPrevTrigger = ({ ref, ...props }: CarouselPrevTriggerProps) => {
  const carousel = useCarouselContext()
  const mergedProps = mergeProps(carousel.getPrevTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
}

CarouselPrevTrigger.displayName = 'CarouselPrevTrigger'
