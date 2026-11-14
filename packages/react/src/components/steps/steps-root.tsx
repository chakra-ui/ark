'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { type UseStepsProps, useSteps } from './use-steps.ts'
import { StepsProvider } from './use-steps-context.ts'

export interface StepsRootBaseProps extends UseStepsProps, PolymorphicProps {}
export interface StepsRootProps extends Assign<HTMLProps<'div'>, StepsRootBaseProps> {}

const splitRootProps = createSplitProps<UseStepsProps>()

export const StepsRoot = forwardRef<HTMLDivElement, StepsRootProps>((props, ref) => {
  const [useStepsProps, localProps] = splitRootProps(props, [
    'completedValues',
    'defaultCompletedValues',
    'defaultValue',
    'id',
    'ids',
    'items',
    'linear',
    'onComplete',
    'onCompletedChange',
    'onNavigationBlocked',
    'onValueChange',
    'orientation',
    'translations',
    'value',
  ])

  const steps = useSteps(useStepsProps)
  const mergedProps = mergeProps(steps.getRootProps(), localProps)

  return (
    <StepsProvider value={steps}>
      <ark.div {...mergedProps} ref={ref} />
    </StepsProvider>
  )
})

StepsRoot.displayName = 'StepsRoot'
