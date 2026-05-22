'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useStepsContext } from './use-steps-context'

export interface StepsPrevTriggerBaseProps extends PolymorphicProps {}
export interface StepsPrevTriggerProps extends HTMLProps<'button'>, StepsPrevTriggerBaseProps {}

export const StepsPrevTrigger = ({ ref, ...props }: StepsPrevTriggerProps) => {
  const steps = useStepsContext()
  const mergedProps = mergeProps(steps.getPrevTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
}

StepsPrevTrigger.displayName = 'StepsPrevTrigger'
