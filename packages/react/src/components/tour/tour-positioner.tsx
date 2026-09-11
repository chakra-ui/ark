'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { usePresenceContext } from '../presence/index.ts'
import { useTourContext } from './use-tour-context.ts'
import type { PositionerState } from '@zag-js/tour'

export interface TourPositionerState extends PositionerState {}

export interface TourPositionerBaseProps extends PolymorphicProps<TourPositionerState> {}
export interface TourPositionerProps extends HTMLProps<'div'>, TourPositionerBaseProps {}

export const TourPositioner = forwardRef<HTMLDivElement, TourPositionerProps>((props, ref) => {
  const tour = useTourContext()
  const mergedProps = mergeProps(tour.getPositionerProps(), props)
  const presence = usePresenceContext()

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} ref={ref} state={tour.getPositionerState()} />
})

TourPositioner.displayName = 'TourPositioner'
