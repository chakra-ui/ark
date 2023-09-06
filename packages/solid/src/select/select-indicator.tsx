import type { ItemProps } from '@zag-js/select'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

export type SelectIndicatorProps = HTMLArkProps<'div'> & ItemProps

export const SelectIndicator = (props: SelectIndicatorProps) => {
  const [indicatorProps, localProps] = createSplitProps<ItemProps>()(props, ['item'])
  const api = useSelectContext()
  const mergedProps = mergeProps(() => api().getItemIndicatorProps(indicatorProps), localProps)

  return <ark.div {...mergedProps} />
}
