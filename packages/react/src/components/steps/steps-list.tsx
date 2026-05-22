'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useStepsContext } from './use-steps-context'

export interface StepsListBaseProps extends PolymorphicProps {}
export interface StepsListProps extends HTMLProps<'div'>, StepsListBaseProps {}

export const StepsList = ({ ref, ...props }: StepsListProps) => {
  const steps = useStepsContext()
  const mergedProps = mergeProps(steps.getListProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
}

StepsList.displayName = 'StepsList'
