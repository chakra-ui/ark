'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { type UseNumberFlowProps, useNumberFlow } from './use-number-flow.ts'
import { NumberFlowProvider } from './use-number-flow-context.ts'

export interface NumberFlowRootBaseProps extends UseNumberFlowProps, PolymorphicProps {}
export interface NumberFlowRootProps extends Assign<HTMLProps<'span'>, NumberFlowRootBaseProps> {}

const splitRootProps = createSplitProps<UseNumberFlowProps>()

export const NumberFlowRoot = forwardRef<HTMLSpanElement, NumberFlowRootProps>((props, ref) => {
  const [useNumberFlowProps, localProps] = splitRootProps(props, [
    'continuous',
    'defaultValue',
    'formatOptions',
    'id',
    'ids',
    'live',
    'locale',
    'onAnimationComplete',
    'onAnimationStart',
    'onValueChange',
    'prefix',
    'respectMotionPreference',
    'spinTiming',
    'stagger',
    'suffix',
    'transformTiming',
    'trend',
    'value',
  ])

  const numberFlow = useNumberFlow(useNumberFlowProps)
  const mergedProps = mergeProps(numberFlow.getRootProps(), localProps)

  return (
    <NumberFlowProvider value={numberFlow}>
      <ark.span {...mergedProps} ref={ref} />
    </NumberFlowProvider>
  )
})

NumberFlowRoot.displayName = 'NumberFlowRoot'
