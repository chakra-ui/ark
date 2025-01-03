import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTourContext } from './use-tour-context'

export interface TourArrowBaseProps extends PolymorphicProps {}
export interface TourArrowProps extends HTMLProps<'div'>, TourArrowBaseProps {}

export const TourArrow = forwardRef<HTMLDivElement, TourArrowProps>((props, ref) => {
  const tour = useTourContext()
  const mergedProps = mergeProps(tour.getArrowProps(), props)

  return tour.step?.arrow ? <ark.div {...mergedProps} ref={ref} /> : null
})

TourArrow.displayName = 'TourArrow'
