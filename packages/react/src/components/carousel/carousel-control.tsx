'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselControlBaseProps extends PolymorphicProps {}
export interface CarouselControlProps extends HTMLProps<'div'>, CarouselControlBaseProps {}

export const CarouselControl = ({ ref, ...props }: CarouselControlProps) => {
  const carousel = useCarouselContext()
  const mergedProps = mergeProps(carousel.getControlProps(), props)

  return <ark.div {...mergedProps} {...props} ref={ref} />
}

CarouselControl.displayName = 'CarouselControl'
