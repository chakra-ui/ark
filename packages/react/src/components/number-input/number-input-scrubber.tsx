'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useNumberInputContext } from './use-number-input-context.ts'

export interface NumberInputScrubberBaseProps extends PolymorphicProps {}
export interface NumberInputScrubberProps extends HTMLProps<'span'>, NumberInputScrubberBaseProps {}

export const NumberInputScrubber = forwardRef<HTMLSpanElement, NumberInputScrubberProps>((props, ref) => {
  const numberInput = useNumberInputContext()
  const mergedProps = mergeProps(numberInput.getScrubberProps(), props)

  return <ark.span {...mergedProps} ref={ref} />
})

NumberInputScrubber.displayName = 'NumberInputScrubber'
