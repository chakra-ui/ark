'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTourContext } from './use-tour-context'

export interface TourCloseTriggerBaseProps extends PolymorphicProps {}
export interface TourCloseTriggerProps extends HTMLProps<'button'>, TourCloseTriggerBaseProps {}

export const TourCloseTrigger = ({ ref, ...props }: TourCloseTriggerProps) => {
  const tour = useTourContext()
  const mergedProps = mergeProps(tour.getCloseTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
}

TourCloseTrigger.displayName = 'TourCloseTrigger'
