import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useTourContext } from './use-tour-context'

export interface TourPositionerBaseProps extends PolymorphicProps {}
export interface TourPositionerProps extends HTMLProps<'div'>, TourPositionerBaseProps {}

export const TourPositioner = forwardRef<HTMLDivElement, TourPositionerProps>((props, ref) => {
  const tour = useTourContext()
  const mergedProps = mergeProps(tour.getPositionerProps(), props)
  const presence = usePresenceContext()

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} ref={ref} />
})

TourPositioner.displayName = 'TourPositioner'
