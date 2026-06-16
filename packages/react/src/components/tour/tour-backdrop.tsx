'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { useComposedRefs } from '../../utils/compose-refs.ts'
import { useRenderStrategyPropsContext } from '../../utils/render-strategy.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { usePresence } from '../presence/index.ts'
import { useTourContext } from './use-tour-context.ts'

export interface TourBackdropBaseProps extends PolymorphicProps {}
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

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} ref={composedRefs} hidden={!tour.step?.backdrop} />
})

TourBackdrop.displayName = 'TourBackdrop'
