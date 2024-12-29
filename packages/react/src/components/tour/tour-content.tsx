import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTourContext } from './use-tour-context'

export interface TourContentBaseProps extends PolymorphicProps {}
export interface TourContentProps extends HTMLProps<'div'>, TourContentBaseProps {}

export const TourContent = forwardRef<HTMLDivElement, TourContentProps>((props, ref) => {
  const tour = useTourContext()
  const mergedProps = mergeProps(tour.getContentProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

TourContent.displayName = 'TourContent'
