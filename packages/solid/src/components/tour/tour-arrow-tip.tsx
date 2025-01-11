import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTourContext } from './use-tour-context'

export interface TourArrowTipBaseProps extends PolymorphicProps<'div'> {}
export interface TourArrowTipProps extends HTMLProps<'div'>, TourArrowTipBaseProps {}

export const TourArrowTip = (props: TourArrowTipProps) => {
  const tour = useTourContext()
  const mergedProps = mergeProps(() => tour().getArrowTipProps(), props)

  return <ark.div {...mergedProps} />
}
