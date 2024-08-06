import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useStepsContext } from './use-steps-context'

export interface StepsPrevTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface StepsPrevTriggerProps extends HTMLProps<'button'>, StepsPrevTriggerBaseProps {}

export const StepsPrevTrigger = (props: StepsPrevTriggerProps) => {
  const steps = useStepsContext()
  const mergedProps = mergeProps(() => steps().getPrevTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
