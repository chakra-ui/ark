'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useTourContext } from './use-tour-context.ts'

export interface TourCloseTriggerBaseProps extends PolymorphicProps {}
export interface TourCloseTriggerProps extends HTMLProps<'button'>, TourCloseTriggerBaseProps {}

export const TourCloseTrigger = forwardRef<HTMLButtonElement, TourCloseTriggerProps>((props, ref) => {
  const tour = useTourContext()
  const mergedProps = mergeProps(tour.getCloseTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
})

TourCloseTrigger.displayName = 'TourCloseTrigger'
