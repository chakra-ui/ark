import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { type UseStepsProps, useSteps } from './use-steps.ts'
import { StepsProvider } from './use-steps-context.ts'

export interface StepsRootBaseProps extends UseStepsProps, PolymorphicProps<'div'> {}
export interface StepsRootProps extends HTMLProps<'div'>, StepsRootBaseProps {}

export const StepsRoot = (props: StepsRootProps) => {
  const [useStepsProps, localProps] = createSplitProps<UseStepsProps>()(props, [
    'completedValues',
    'defaultCompletedValues',
    'defaultValue',
    'id',
    'ids',
    'items',
    'linear',
    'onComplete',
    'onCompletedChange',
    'onNavigationBlocked',
    'onValueChange',
    'orientation',
    'translations',
    'value',
  ])

  const steps = useSteps(useStepsProps)
  const mergedProps = mergeProps(() => steps().getRootProps(), localProps)

  return (
    <StepsProvider value={steps}>
      <ark.div {...mergedProps} />
    </StepsProvider>
  )
}
