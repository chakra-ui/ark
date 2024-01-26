import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'
import { useSelectItemContext } from './select-item-context'

export interface SelectItemTextProps extends HTMLArkProps<'span'> {}

export const SelectItemText: ArkComponent<'span'> = (props) => {
  const api = useSelectContext()
  const itemProps = useSelectItemContext()
  const mergedProps = mergeProps(() => api().getItemTextProps(itemProps), props)

  return <ark.span {...mergedProps} />
}
