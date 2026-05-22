'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTourContext } from './use-tour-context'

export interface TourArrowTipBaseProps extends PolymorphicProps {}
export interface TourArrowTipProps extends HTMLProps<'div'>, TourArrowTipBaseProps {}

export const TourArrowTip = ({ ref, ...props }: TourArrowTipProps) => {
  const tour = useTourContext()
  const mergedProps = mergeProps(tour.getArrowTipProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
}

TourArrowTip.displayName = 'TourArrowTip'
