'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselIndicatorGroupBaseProps extends PolymorphicProps {}
export interface CarouselIndicatorGroupProps extends HTMLProps<'div'>, CarouselIndicatorGroupBaseProps {}

export const CarouselIndicatorGroup = ({ ref, ...props }: CarouselIndicatorGroupProps) => {
  const carousel = useCarouselContext()
  const mergedProps = mergeProps(carousel.getIndicatorGroupProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
}

CarouselIndicatorGroup.displayName = 'CarouselIndicatorGroup'
