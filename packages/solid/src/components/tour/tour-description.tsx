import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTourContext } from './use-tour-context'

export interface TourDescriptionBaseProps extends PolymorphicProps<'div'> {}
export interface TourDescriptionProps extends HTMLProps<'div'>, TourDescriptionBaseProps {}

export const TourDescription = (props: TourDescriptionProps) => {
  const tour = useTourContext()
  const mergedProps = mergeProps(() => tour().getDescriptionProps(), props)

  return <ark.div {...mergedProps}>{mergedProps.children || tour().step?.description}</ark.div>
}
