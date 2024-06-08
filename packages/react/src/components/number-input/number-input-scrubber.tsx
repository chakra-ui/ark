import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

export interface NumberInputScrubberProps extends HTMLArkProps<'div'> {}

export const NumberInputScrubber = forwardRef<HTMLDivElement, NumberInputScrubberProps>(
  (props, ref) => {
    const numberInput = useNumberInputContext()
    const mergedProps = mergeProps(numberInput.getScrubberProps(), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

NumberInputScrubber.displayName = 'NumberInputScrubber'
