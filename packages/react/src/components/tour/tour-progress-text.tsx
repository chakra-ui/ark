'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTourContext } from './use-tour-context'

export interface TourProgressTextBaseProps extends PolymorphicProps {}
export interface TourProgressTextProps extends HTMLProps<'div'>, TourProgressTextBaseProps {}

export const TourProgressText = ({ ref, ...props }: TourProgressTextProps) => {
  const tour = useTourContext()
  const mergedProps = mergeProps(tour.getProgressTextProps(), props)

  return (
    <ark.div {...mergedProps} ref={ref}>
      {mergedProps.children || tour.getProgressText()}
    </ark.div>
  )
}

TourProgressText.displayName = 'TourProgressText'
