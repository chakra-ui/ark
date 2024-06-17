import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

export interface NumberInputScrubberBaseProps extends PolymorphicProps {}
export interface NumberInputScrubberProps
  extends HTMLAttributes<HTMLDivElement>,
    NumberInputScrubberBaseProps {}

export const NumberInputScrubber = forwardRef<HTMLDivElement, NumberInputScrubberProps>(
  (props, ref) => {
    const numberInput = useNumberInputContext()
    const mergedProps = mergeProps(numberInput.getScrubberProps(), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

NumberInputScrubber.displayName = 'NumberInputScrubber'
