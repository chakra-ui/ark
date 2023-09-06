import type { ItemProps } from '@zag-js/select'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

export type SelectItemIndicatorProps = HTMLArkProps<'div'> & ItemProps

export const SelectItemIndicator = (props: SelectItemIndicatorProps) => {
  const [indicatorProps, localProps] = createSplitProps<ItemProps>()(props, ['item'])
  const api = useSelectContext()
  const mergedProps = mergeProps(() => api().getItemIndicatorProps(indicatorProps), localProps)

  return <ark.div {...mergedProps} />
}
