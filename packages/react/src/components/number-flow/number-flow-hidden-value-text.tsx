'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useNumberFlowContext } from './use-number-flow-context.ts'

export interface NumberFlowHiddenValueTextBaseProps extends PolymorphicProps {}
export interface NumberFlowHiddenValueTextProps extends HTMLProps<'span'>, NumberFlowHiddenValueTextBaseProps {}

export const NumberFlowHiddenValueText = forwardRef<HTMLSpanElement, NumberFlowHiddenValueTextProps>((props, ref) => {
  const numberFlow = useNumberFlowContext()
  const mergedProps = mergeProps(numberFlow.getValueTextProps(), props)

  return (
    <ark.span {...mergedProps} ref={ref}>
      {props.children ?? numberFlow.announcedValueText}
    </ark.span>
  )
})

NumberFlowHiddenValueText.displayName = 'NumberFlowHiddenValueText'
