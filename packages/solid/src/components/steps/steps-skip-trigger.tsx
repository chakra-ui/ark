import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useStepsContext } from './use-steps-context.ts'

export interface StepsSkipTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface StepsSkipTriggerProps extends HTMLProps<'button'>, StepsSkipTriggerBaseProps {}

export const StepsSkipTrigger = (props: StepsSkipTriggerProps) => {
  const steps = useStepsContext()
  const mergedProps = mergeProps(() => steps().getSkipTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
