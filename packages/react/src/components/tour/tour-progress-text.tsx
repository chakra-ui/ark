import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { composeRefs } from '../../utils/compose-refs'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useTourContext } from './use-tour-context'

export interface TourProgressTextBaseProps extends PolymorphicProps {}
export interface TourProgressTextProps extends HTMLProps<'div'>, TourProgressTextBaseProps {}

export const TourProgressText = forwardRef<HTMLDivElement, TourProgressTextProps>((props, ref) => {
  const tour = useTourContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(tour.getProgressTextProps(), presence.getPresenceProps(), props)

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} ref={composeRefs(presence.ref, ref)} />
})

TourProgressText.displayName = 'TourProgressText'
