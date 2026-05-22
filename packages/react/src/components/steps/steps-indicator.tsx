'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useStepsContext } from './use-steps-context'
import { useStepsItemPropsContext } from './use-steps-item-props-context'

export interface StepsIndicatorBaseProps extends PolymorphicProps {}
export interface StepsIndicatorProps extends HTMLProps<'div'>, StepsIndicatorBaseProps {}

export const StepsIndicator = ({ ref, ...props }: StepsIndicatorProps) => {
  const steps = useStepsContext()
  const itemProps = useStepsItemPropsContext()
  const mergedProps = mergeProps(steps.getIndicatorProps(itemProps), props)

  return <ark.div {...mergedProps} ref={ref} />
}

StepsIndicator.displayName = 'StepsIndicator'
