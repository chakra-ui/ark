import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useTourContext } from './use-tour-context.ts'

export interface TourCloseTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface TourCloseTriggerProps extends HTMLProps<'button'>, TourCloseTriggerBaseProps {}

export const TourCloseTrigger = (props: TourCloseTriggerProps) => {
  const tour = useTourContext()
  const mergedProps = mergeProps(() => tour().getCloseTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
