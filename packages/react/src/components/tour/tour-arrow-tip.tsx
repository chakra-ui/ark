'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useTourContext } from './use-tour-context.ts'

export interface TourArrowTipBaseProps extends PolymorphicProps {}
export interface TourArrowTipProps extends HTMLProps<'div'>, TourArrowTipBaseProps {}

export const TourArrowTip = forwardRef<HTMLDivElement, TourArrowTipProps>((props, ref) => {
  const tour = useTourContext()
  const mergedProps = mergeProps(tour.getArrowTipProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

TourArrowTip.displayName = 'TourArrowTip'
