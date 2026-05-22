'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useStepsContext } from './use-steps-context'

export interface StepsProgressBaseProps extends PolymorphicProps {}
export interface StepsProgressProps extends HTMLProps<'div'>, StepsProgressBaseProps {}

export const StepsProgress = ({ ref, ...props }: StepsProgressProps) => {
  const steps = useStepsContext()
  const mergedProps = mergeProps(steps.getProgressProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
}

StepsProgress.displayName = 'StepsProgress'
