'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

export interface NumberInputScrubberBaseProps extends PolymorphicProps {}
export interface NumberInputScrubberProps extends HTMLProps<'div'>, NumberInputScrubberBaseProps {}

export const NumberInputScrubber = ({ ref, ...props }: NumberInputScrubberProps) => {
  const numberInput = useNumberInputContext()
  const mergedProps = mergeProps(numberInput.getScrubberProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
}

NumberInputScrubber.displayName = 'NumberInputScrubber'
