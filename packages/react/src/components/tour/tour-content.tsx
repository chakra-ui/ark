'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { useComposedRefs } from '../../utils/compose-refs.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { usePresenceContext } from '../presence/index.ts'
import { useTourContext } from './use-tour-context.ts'

export interface TourContentBaseProps extends PolymorphicProps {}
export interface TourContentProps extends HTMLProps<'div'>, TourContentBaseProps {}

export const TourContent = forwardRef<HTMLDivElement, TourContentProps>((props, ref) => {
  const tour = useTourContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(tour.getContentProps(), presence.getPresenceProps(), props)
  const composedRefs = useComposedRefs(presence.ref, ref)

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} ref={composedRefs} />
})

TourContent.displayName = 'TourContent'
