import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useStepsContext } from './use-steps-context'

export interface StepsProgressBaseProps extends PolymorphicProps {}
export interface StepsProgressProps extends HTMLProps<'div'>, StepsProgressBaseProps {}

export const StepsProgress = forwardRef<HTMLDivElement, StepsProgressProps>((props, ref) => {
  const steps = useStepsContext()
  const mergedProps = mergeProps(steps.getProgressProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

StepsProgress.displayName = 'StepsProgress'
