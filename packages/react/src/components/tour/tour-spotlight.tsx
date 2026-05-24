'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { composeRefs } from '../../utils/compose-refs.ts'
import { useRenderStrategyPropsContext } from '../../utils/render-strategy.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { usePresence } from '../presence/index.ts'
import { useTourContext } from './use-tour-context.ts'

export interface TourSpotlightBaseProps extends PolymorphicProps {}
export interface TourSpotlightProps extends HTMLProps<'div'>, TourSpotlightBaseProps {}

export const TourSpotlight = forwardRef<HTMLDivElement, TourSpotlightProps>((props, ref) => {
  const tour = useTourContext()
  const renderStrategyProps = useRenderStrategyPropsContext()
  const presence = usePresence({
    ...renderStrategyProps,
    present: tour.open,
  })
  const mergedProps = mergeProps(tour.getSpotlightProps(), presence.getPresenceProps(), props)
  const hidden = !tour.open || !tour.step?.target?.()

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} ref={composeRefs(presence.ref, ref)} hidden={hidden} />
})

TourSpotlight.displayName = 'TourSpotlight'
