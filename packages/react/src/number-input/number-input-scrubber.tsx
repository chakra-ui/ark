import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export type NumberInputScrubberProps = HtmlArkProps<'div'>

export const NumberInputScrubber = forwardRef<HTMLDivElement, NumberInputScrubberProps>(
  (props, ref) => {
    const { scrubberProps } = useNumberInputContext()
    const mergedProps = mergeProps(scrubberProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

NumberInputScrubber.displayName = 'NumberInputScrubber'
