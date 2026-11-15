'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useStepsContext } from './use-steps-context.ts'

export interface StepsSkipTriggerBaseProps extends PolymorphicProps {}
export interface StepsSkipTriggerProps extends HTMLProps<'button'>, StepsSkipTriggerBaseProps {}

export const StepsSkipTrigger = forwardRef<HTMLButtonElement, StepsSkipTriggerProps>((props, ref) => {
  const steps = useStepsContext()
  const mergedProps = mergeProps(steps.getSkipTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
})

StepsSkipTrigger.displayName = 'StepsSkipTrigger'
