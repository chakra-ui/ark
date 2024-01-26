import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

export interface SelectLabelProps extends HTMLArkProps<'label'> {}

export const SelectLabel: ArkComponent<'label'> = (props) => {
  const api = useSelectContext()
  const mergedProps = mergeProps(() => api().labelProps, props)

  return <ark.label {...mergedProps} />
}
