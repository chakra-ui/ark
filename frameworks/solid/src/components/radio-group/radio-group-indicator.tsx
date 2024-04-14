import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useRadioGroupContext } from './use-radio-group-context'

export interface RadioGroupIndicatorProps extends HTMLArkProps<'div'> {}

export const RadioGroupIndicator = (props: RadioGroupIndicatorProps) => {
  const api = useRadioGroupContext()
  const mergedProps = mergeProps(() => api().indicatorProps, props)

  return <ark.div {...mergedProps} />
}
