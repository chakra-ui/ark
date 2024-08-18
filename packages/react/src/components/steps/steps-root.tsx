import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseStepsProps, useSteps } from './use-steps'
import { StepsProvider } from './use-steps-context'

export interface StepsRootBaseProps extends UseStepsProps, PolymorphicProps {}
export interface StepsRootProps extends HTMLProps<'div'>, StepsRootBaseProps {}

export const StepsRoot = forwardRef<HTMLDivElement, StepsRootProps>((props, ref) => {
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
  const mergedProps = mergeProps(steps.getRootProps(), localProps)

  return (
    <StepsProvider value={steps}>
      <ark.div {...mergedProps} ref={ref} />
    </StepsProvider>
  )
})

StepsRoot.displayName = 'StepsRoot'
