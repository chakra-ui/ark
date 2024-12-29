import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTourContext } from './use-tour-context'

export interface TourContentBaseProps extends PolymorphicProps<'div'> {}
export interface TourContentProps extends HTMLProps<'div'>, TourContentBaseProps {}

export const TourContent = (props: TourContentProps) => {
  const tour = useTourContext()
  const mergedProps = mergeProps(() => tour().getContentProps(), props)

  return <ark.div {...mergedProps} />
}
