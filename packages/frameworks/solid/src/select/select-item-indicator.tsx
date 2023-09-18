import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'
import { useSelectItemContext } from './select-item-context'

export type SelectItemIndicatorProps = HTMLArkProps<'div'>

export const SelectItemIndicator = (props: SelectItemIndicatorProps) => {
  const api = useSelectContext()
  const itemProps = useSelectItemContext()
  const mergedProps = mergeProps(() => api().getItemIndicatorProps(itemProps), props)

  return <ark.div {...mergedProps} />
}
