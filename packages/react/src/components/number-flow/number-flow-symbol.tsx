'use client'

import type { SymbolProps } from '@zag-js/number-flow'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useNumberFlowContext } from './use-number-flow-context.ts'

export interface NumberFlowSymbolBaseProps extends SymbolProps, PolymorphicProps {}
export interface NumberFlowSymbolProps extends HTMLProps<'span'>, NumberFlowSymbolBaseProps {}

const splitSymbolProps = createSplitProps<SymbolProps>()

export const NumberFlowSymbol = forwardRef<HTMLSpanElement, NumberFlowSymbolProps>((props, ref) => {
  const [symbolProps, localProps] = splitSymbolProps(props, ['segment'])
  const numberFlow = useNumberFlowContext()
  const mergedProps = mergeProps(numberFlow.getSymbolProps(symbolProps), localProps)

  return (
    <ark.span {...mergedProps} ref={ref}>
      {localProps.children ?? symbolProps.segment.value}
    </ark.span>
  )
})

NumberFlowSymbol.displayName = 'NumberFlowSymbol'
