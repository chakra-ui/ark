import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { composeRefs } from '../../utils/compose-refs'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useTourContext } from './use-tour-context'

export interface TourContentBaseProps extends PolymorphicProps {}
export interface TourContentProps extends HTMLProps<'div'>, TourContentBaseProps {}

export const TourContent = forwardRef<HTMLDivElement, TourContentProps>((props, ref) => {
  const tour = useTourContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(tour.getContentProps(), presence.getPresenceProps(), props)

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} ref={composeRefs(presence.ref, ref)} />
})

TourContent.displayName = 'TourContent'
