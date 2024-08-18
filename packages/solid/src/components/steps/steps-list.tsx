import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useStepsContext } from './use-steps-context'

export interface StepsListBaseProps extends PolymorphicProps<'ol'> {}
export interface StepsListProps extends HTMLProps<'ol'>, StepsListBaseProps {}

export const StepsList = (props: StepsListProps) => {
  const steps = useStepsContext()
  const mergedProps = mergeProps(() => steps().getListProps(), props)

  return <ark.ol {...mergedProps} />
}
