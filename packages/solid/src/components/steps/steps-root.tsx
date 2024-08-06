import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseStepsProps, useSteps } from './use-steps'
import { StepsProvider } from './use-steps-context'

export interface StepsRootBaseProps extends UseStepsProps, PolymorphicProps<'div'> {}
export interface StepsRootProps extends HTMLProps<'div'>, StepsRootBaseProps {}

export const StepsRoot = (props: StepsRootProps) => {
  const [useStepsProps, localProps] = createSplitProps<UseStepsProps>()(props, [
    'defaultStep',
    'id',
    'ids',
    'count',
    'linear',
    'onStepChange',
    'onStepComplete',
    'orientation',
    'step',
  ])

  const steps = useSteps(useStepsProps)
  const mergedProps = mergeProps(() => steps().getRootProps(), localProps)

  return (
    <StepsProvider value={steps}>
      <ark.div {...mergedProps} />
    </StepsProvider>
  )
}
