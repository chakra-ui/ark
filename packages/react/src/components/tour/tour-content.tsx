'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { useComposedRefs } from '../../utils/compose-refs.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { PresenceGate } from '../presence/presence-gate.tsx'
import { usePresenceContext } from '../presence/index.ts'
import { useTourContext } from './use-tour-context.ts'
import type { ContentState } from '@zag-js/tour'

export interface TourContentState extends ContentState {}

export interface TourContentBaseProps extends PolymorphicProps<TourContentState> {}
export interface TourContentProps extends HTMLProps<'div'>, TourContentBaseProps {}

export const TourContent = forwardRef<HTMLDivElement, TourContentProps>((props, ref) => {
  const tour = useTourContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(tour.getContentProps(), presence.getPresenceProps(), props)
  const composedRefs = useComposedRefs(presence.ref, ref)

  return (
    <PresenceGate presence={presence}>
      <ark.div {...mergedProps} ref={composedRefs} state={tour.getContentState()} />
    </PresenceGate>
  )
})

TourContent.displayName = 'TourContent'
