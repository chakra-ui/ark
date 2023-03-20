import { ark, type HTMLArkProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export type NumberInputScrubberProps = HTMLArkProps<'div'>

export const NumberInputScrubber = (props: NumberInputScrubberProps) => {
  const numberInput = useNumberInputContext()

  return <ark.div {...numberInput().scrubberProps} {...props} />
}
