'use client'

import type { DigitCellProps } from '@zag-js/number-flow'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useNumberFlowContext } from './use-number-flow-context.ts'

export interface NumberFlowDigitCellBaseProps extends DigitCellProps, PolymorphicProps {}
export interface NumberFlowDigitCellProps extends HTMLProps<'span'>, NumberFlowDigitCellBaseProps {}

const splitDigitCellProps = createSplitProps<DigitCellProps>()

export const NumberFlowDigitCell = forwardRef<HTMLSpanElement, NumberFlowDigitCellProps>((props, ref) => {
  const [digitCellProps, localProps] = splitDigitCellProps(props, ['cell', 'segment'])
  const numberFlow = useNumberFlowContext()
  const mergedProps = mergeProps(numberFlow.getDigitCellProps(digitCellProps), localProps)

  return (
    <ark.span {...mergedProps} ref={ref}>
      {localProps.children ?? digitCellProps.cell.glyph}
    </ark.span>
  )
})

NumberFlowDigitCell.displayName = 'NumberFlowDigitCell'
