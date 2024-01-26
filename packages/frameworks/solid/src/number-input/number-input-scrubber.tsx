import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export interface NumberInputScrubberProps extends HTMLArkProps<'div'> {}

export const NumberInputScrubber: ArkComponent<'div'> = (props: NumberInputScrubberProps) => {
  const api = useNumberInputContext()
  const mergedProps = mergeProps(() => api().scrubberProps, props)

  return <ark.div {...mergedProps} />
}
