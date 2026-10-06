import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useNumberInputContext } from './use-number-input-context.ts'

export interface NumberInputScrubberBaseProps extends PolymorphicProps<'span'> {}
export interface NumberInputScrubberProps extends HTMLProps<'span'>, NumberInputScrubberBaseProps {}

export const NumberInputScrubber = (props: NumberInputScrubberProps) => {
  const api = useNumberInputContext()
  const mergedProps = mergeProps(() => api().getScrubberProps(), props)

  return <ark.span {...mergedProps} />
}
