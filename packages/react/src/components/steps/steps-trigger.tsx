'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useStepsContext } from './use-steps-context'
import { useStepsItemPropsContext } from './use-steps-item-props-context'

export interface StepsTriggerBaseProps extends PolymorphicProps {}
export interface StepsTriggerProps extends HTMLProps<'button'>, StepsTriggerBaseProps {}

export const StepsTrigger = ({ ref, ...props }: StepsTriggerProps) => {
  const steps = useStepsContext()
  const itemProps = useStepsItemPropsContext()
  const mergedProps = mergeProps(steps.getTriggerProps(itemProps), props)

  return <ark.button {...mergedProps} ref={ref} />
}

StepsTrigger.displayName = 'StepsTrigger'
