import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useStepsContext } from './use-steps-context'

export interface StepsProgressBaseProps extends PolymorphicProps<'div'> {}
export interface StepsProgressProps extends HTMLProps<'div'>, StepsProgressBaseProps {}

export const StepsProgress = (props: StepsProgressProps) => {
  const steps = useStepsContext()
  const mergedProps = mergeProps(() => steps().getProgressProps(), props)

  return <ark.div {...mergedProps} />
}
