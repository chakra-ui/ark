import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useTourContext } from './use-tour-context.ts'

export interface TourArrowTipBaseProps extends PolymorphicProps<'div'> {}
export interface TourArrowTipProps extends HTMLProps<'div'>, TourArrowTipBaseProps {}

export const TourArrowTip = (props: TourArrowTipProps) => {
  const tour = useTourContext()
  const mergedProps = mergeProps(() => tour().getArrowTipProps(), props)

  return <ark.div {...mergedProps} />
}
