import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './use-select-context'
import { useSelectItemPropsContext } from './use-select-item-context'

export interface SelectItemIndicatorProps extends HTMLArkProps<'div'> {}

export const SelectItemIndicator = (props: SelectItemIndicatorProps) => {
  const api = useSelectContext()
  const itemProps = useSelectItemPropsContext()
  const mergedProps = mergeProps(() => api().getItemIndicatorProps(itemProps), props)

  return <ark.div {...mergedProps} />
}
