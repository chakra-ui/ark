'use client'

import type { DigitTrackProps } from '@zag-js/number-flow'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { NumberFlowDigitCell } from './number-flow-digit-cell.tsx'
import { useNumberFlowContext } from './use-number-flow-context.ts'

export interface NumberFlowDigitTrackBaseProps extends DigitTrackProps, PolymorphicProps {}
export interface NumberFlowDigitTrackProps extends HTMLProps<'span'>, NumberFlowDigitTrackBaseProps {}

const splitDigitTrackProps = createSplitProps<DigitTrackProps>()

export const NumberFlowDigitTrack = forwardRef<HTMLSpanElement, NumberFlowDigitTrackProps>((props, ref) => {
  const [digitTrackProps, localProps] = splitDigitTrackProps(props, ['segment'])
  const numberFlow = useNumberFlowContext()
  const mergedProps = mergeProps(numberFlow.getDigitTrackProps(digitTrackProps), localProps)

  return (
    <ark.span {...mergedProps} ref={ref}>
      {localProps.children ??
        numberFlow.digitCells.map((cell) => (
          <NumberFlowDigitCell key={cell.index} segment={digitTrackProps.segment} cell={cell} />
        ))}
    </ark.span>
  )
})

NumberFlowDigitTrack.displayName = 'NumberFlowDigitTrack'
