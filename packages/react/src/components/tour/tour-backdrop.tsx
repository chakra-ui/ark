'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { useComposedRefs } from '../../utils/compose-refs.ts'
import { useRenderStrategyPropsContext } from '../../utils/render-strategy.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { PresenceGate } from '../presence/presence-gate.tsx'
import { usePresence } from '../presence/index.ts'
import { useTourContext } from './use-tour-context.ts'
import type { BackdropState } from '@zag-js/tour'

export interface TourBackdropState extends BackdropState {}

export interface TourBackdropBaseProps extends PolymorphicProps<TourBackdropState> {}
export interface TourBackdropProps extends HTMLProps<'div'>, TourBackdropBaseProps {}

export const TourBackdrop = forwardRef<HTMLDivElement, TourBackdropProps>((props, ref) => {
  const tour = useTourContext()
  const renderStrategyProps = useRenderStrategyPropsContext()
  const presence = usePresence({
    ...renderStrategyProps,
    present: tour.open,
  })
  const mergedProps = mergeProps(tour.getBackdropProps(), presence.getPresenceProps(), props)
  const composedRefs = useComposedRefs(presence.ref, ref)

  return (
    <PresenceGate presence={presence}>
      <ark.div {...mergedProps} ref={composedRefs} hidden={!tour.step?.backdrop} state={tour.getBackdropState()} />
    </PresenceGate>
  )
})

TourBackdrop.displayName = 'TourBackdrop'
