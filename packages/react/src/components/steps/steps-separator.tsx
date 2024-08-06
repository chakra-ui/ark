import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useStepsContext } from './use-steps-context'
import { useStepsItemPropsContext } from './use-steps-item-props-context'

export interface StepsSeparatorBaseProps extends PolymorphicProps {}
export interface StepsSeparatorProps extends HTMLProps<'div'>, StepsSeparatorBaseProps {}

export const StepsSeparator = forwardRef<HTMLDivElement, StepsSeparatorProps>((props, ref) => {
  const steps = useStepsContext()
  const itemProps = useStepsItemPropsContext()
  const mergedProps = mergeProps(steps.getSeparatorProps(itemProps), props)

  return <ark.div {...mergedProps} ref={ref} />
})

StepsSeparator.displayName = 'StepsSeparator'
