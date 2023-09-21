import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export interface NumberInputScrubberProps extends HTMLArkProps<'div'> {}

export const NumberInputScrubber = forwardRef<HTMLDivElement, NumberInputScrubberProps>(
  (props, ref) => {
    const api = useNumberInputContext()
    const mergedProps = mergeProps(api.scrubberProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

NumberInputScrubber.displayName = 'NumberInputScrubber'
