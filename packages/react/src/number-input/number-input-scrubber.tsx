import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useNumberInputContext } from './number-input-context'

export type NumberInputScrubberProps = HTMLArkProps<'div'>

export const NumberInputScrubber = forwardRef<'div'>((props, ref) => {
  const { scrubberProps } = useNumberInputContext()
  const mergedProps = mergeProps(scrubberProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
