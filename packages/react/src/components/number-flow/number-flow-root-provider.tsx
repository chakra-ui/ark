'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { UseNumberFlowReturn } from './use-number-flow.ts'
import { NumberFlowProvider } from './use-number-flow-context.ts'

interface RootProviderProps {
  value: UseNumberFlowReturn
}

export interface NumberFlowRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface NumberFlowRootProviderProps extends HTMLProps<'span'>, NumberFlowRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const NumberFlowRootProvider = forwardRef<HTMLSpanElement, NumberFlowRootProviderProps>((props, ref) => {
  const [{ value: numberFlow }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(numberFlow.getRootProps(), localProps)

  return (
    <NumberFlowProvider value={numberFlow}>
      <ark.span {...mergedProps} ref={ref} />
    </NumberFlowProvider>
  )
})

NumberFlowRootProvider.displayName = 'NumberFlowRootProvider'
