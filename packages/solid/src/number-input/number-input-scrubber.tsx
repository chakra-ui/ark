import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export type NumberInputScrubberProps = HTMLArkProps<'div'>

export const NumberInputScrubber = (props: NumberInputScrubberProps) => {
  const api = useNumberInputContext()
  const scrubberProps = mergeProps(() => api().scrubberProps, props)
  return <ark.div {...scrubberProps} />
}
