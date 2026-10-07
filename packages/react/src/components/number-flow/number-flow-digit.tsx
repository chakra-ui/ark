'use client'

import type { DigitProps } from '@zag-js/number-flow'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { NumberFlowDigitTrack } from './number-flow-digit-track.tsx'
import { useNumberFlowContext } from './use-number-flow-context.ts'

export interface NumberFlowDigitBaseProps extends DigitProps, PolymorphicProps {}
export interface NumberFlowDigitProps extends HTMLProps<'span'>, NumberFlowDigitBaseProps {}

const splitDigitProps = createSplitProps<DigitProps>()

export const NumberFlowDigit = forwardRef<HTMLSpanElement, NumberFlowDigitProps>((props, ref) => {
  const [digitProps, localProps] = splitDigitProps(props, ['segment'])
  const numberFlow = useNumberFlowContext()
  const mergedProps = mergeProps(numberFlow.getDigitProps(digitProps), localProps)

  return (
    <ark.span {...mergedProps} ref={ref}>
      {localProps.children ?? <NumberFlowDigitTrack segment={digitProps.segment} />}
    </ark.span>
  )
})

NumberFlowDigit.displayName = 'NumberFlowDigit'
