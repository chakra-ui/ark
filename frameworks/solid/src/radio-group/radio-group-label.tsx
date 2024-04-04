import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useRadioGroupContext } from './use-radio-group-context'

export interface RadioGroupLabelProps extends HTMLArkProps<'label'> {}

export const RadioGroupLabel = (props: RadioGroupLabelProps) => {
  const api = useRadioGroupContext()
  const mergedProps = mergeProps(() => api().labelProps, props)

  return <ark.label {...mergedProps()} />
}
