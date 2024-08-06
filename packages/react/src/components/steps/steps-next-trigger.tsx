import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useStepsContext } from './use-steps-context'

export interface StepsNextTriggerBaseProps extends PolymorphicProps {}
export interface StepsNextTriggerProps extends HTMLProps<'button'>, StepsNextTriggerBaseProps {}

export const StepsNextTrigger = forwardRef<HTMLButtonElement, StepsNextTriggerProps>(
  (props, ref) => {
    const steps = useStepsContext()
    const mergedProps = mergeProps(steps.getNextTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

StepsNextTrigger.displayName = 'StepsNextTrigger'
