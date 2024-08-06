import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useStepsContext } from './use-steps-context'

export interface StepsListBaseProps extends PolymorphicProps {}
export interface StepsListProps extends HTMLProps<'ol'>, StepsListBaseProps {}

export const StepsList = forwardRef<HTMLOListElement, StepsListProps>((props, ref) => {
  const steps = useStepsContext()
  const mergedProps = mergeProps(steps.getListProps(), props)

  return <ark.ol {...mergedProps} ref={ref} />
})

StepsList.displayName = 'StepsList'
