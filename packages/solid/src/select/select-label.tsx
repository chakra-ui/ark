import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

export type SelectLabelProps = HTMLArkProps<'label'>

export const SelectLabel = (props: SelectLabelProps) => {
  const api = useSelectContext()
  const labelProps = mergeProps(() => api().labelProps, props)
  return <ark.label {...labelProps} />
}
