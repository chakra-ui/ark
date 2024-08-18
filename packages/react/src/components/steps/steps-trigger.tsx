import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useStepsContext } from './use-steps-context'
import { useStepsItemPropsContext } from './use-steps-item-props-context'

export interface StepsTriggerBaseProps extends PolymorphicProps {}
export interface StepsTriggerProps extends HTMLProps<'button'>, StepsTriggerBaseProps {}

export const StepsTrigger = forwardRef<HTMLButtonElement, StepsTriggerProps>((props, ref) => {
  const steps = useStepsContext()
  const itemProps = useStepsItemPropsContext()
  const mergedProps = mergeProps(steps.getTriggerProps(itemProps), props)

  return <ark.button {...mergedProps} ref={ref} />
})

StepsTrigger.displayName = 'StepsTrigger'
