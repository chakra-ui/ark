import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTourContext } from './use-tour-context'

export interface TourArrowTipBaseProps extends PolymorphicProps {}
export interface TourArrowTipProps extends HTMLProps<'div'>, TourArrowTipBaseProps {}

export const TourArrowTip = forwardRef<HTMLDivElement, TourArrowTipProps>((props, ref) => {
  const tour = useTourContext()
  const mergedProps = mergeProps(tour.getArrowTipProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

TourArrowTip.displayName = 'TourArrowTip'
