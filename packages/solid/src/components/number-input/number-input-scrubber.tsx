import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

export interface NumberInputScrubberBaseProps extends PolymorphicProps<'div'> {}
export interface NumberInputScrubberProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    NumberInputScrubberBaseProps {}

export const NumberInputScrubber = (props: NumberInputScrubberProps) => {
  const api = useNumberInputContext()
  const mergedProps = mergeProps(() => api().getScrubberProps(), props)

  return <ark.div {...mergedProps} />
}
