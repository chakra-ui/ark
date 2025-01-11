import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTourContext } from './use-tour-context'

export interface TourDescriptionBaseProps extends PolymorphicProps {}
export interface TourDescriptionProps extends HTMLProps<'div'>, TourDescriptionBaseProps {}

export const TourDescription = forwardRef<HTMLDivElement, TourDescriptionProps>((props, ref) => {
  const tour = useTourContext()
  const mergedProps = mergeProps(tour.getDescriptionProps(), props)

  return (
    <ark.div {...mergedProps} ref={ref}>
      {mergedProps.children || tour.step?.description}
    </ark.div>
  )
})

TourDescription.displayName = 'TourDescription'
