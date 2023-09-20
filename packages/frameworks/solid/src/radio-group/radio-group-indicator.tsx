import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useRadioGroupContext } from './radio-group-context'

export type RadioGroupIndicatorProps = HTMLArkProps<'div'>

export const RadioGroupIndicator = (props: RadioGroupIndicatorProps) => {
  const api = useRadioGroupContext()
  const mergedProps = mergeProps(() => api().indicatorProps, props)

  return <ark.div {...mergedProps} />
}
