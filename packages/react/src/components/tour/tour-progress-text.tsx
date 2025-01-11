import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTourContext } from './use-tour-context'

export interface TourProgressTextBaseProps extends PolymorphicProps {}
export interface TourProgressTextProps extends HTMLProps<'div'>, TourProgressTextBaseProps {}

export const TourProgressText = forwardRef<HTMLDivElement, TourProgressTextProps>((props, ref) => {
  const tour = useTourContext()
  const mergedProps = mergeProps(tour.getProgressTextProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

TourProgressText.displayName = 'TourProgressText'
