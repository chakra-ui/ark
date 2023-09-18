import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useRadioGroupContext } from './radio-group-context'

export type RadioGroupLabelProps = HTMLArkProps<'label'>

export const RadioGroupLabel = (props: RadioGroupLabelProps) => {
  const api = useRadioGroupContext()
  const labelProps = mergeProps(() => api().labelProps, props)
  return <ark.label {...labelProps} />
}
