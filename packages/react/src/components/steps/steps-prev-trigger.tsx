import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useStepsContext } from './use-steps-context'

export interface StepsPrevTriggerBaseProps extends PolymorphicProps {}
export interface StepsPrevTriggerProps extends HTMLProps<'button'>, StepsPrevTriggerBaseProps {}

export const StepsPrevTrigger = forwardRef<HTMLButtonElement, StepsPrevTriggerProps>(
  (props, ref) => {
    const steps = useStepsContext()
    const mergedProps = mergeProps(steps.getPrevTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

StepsPrevTrigger.displayName = 'StepsPrevTrigger'
