'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useStepsContext } from './use-steps-context.ts'
import { useStepsItemPropsContext } from './use-steps-item-props-context.ts'

export interface StepsIndicatorBaseProps extends PolymorphicProps {}
export interface StepsIndicatorProps extends HTMLProps<'span'>, StepsIndicatorBaseProps {}

export const StepsIndicator = forwardRef<HTMLSpanElement, StepsIndicatorProps>((props, ref) => {
  const steps = useStepsContext()
  const itemProps = useStepsItemPropsContext()
  const mergedProps = mergeProps(steps.getIndicatorProps(itemProps), props)

  return <ark.span {...mergedProps} ref={ref} />
})

StepsIndicator.displayName = 'StepsIndicator'
