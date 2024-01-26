import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useRadioGroupContext } from './radio-group-context'

export interface RadioGroupIndicatorProps extends HTMLArkProps<'div'> {}

export const RadioGroupIndicator: ArkComponent<'div'> = (props: RadioGroupIndicatorProps) => {
  const api = useRadioGroupContext()
  const mergedProps = mergeProps(() => api().indicatorProps, props)

  return <ark.div {...mergedProps} />
}
